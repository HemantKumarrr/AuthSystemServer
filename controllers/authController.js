const User = require('../models/User');
const jwt = require('jsonwebtoken');

// creating jwt function
const createToken = (id)=> {
    const token = jwt.sign({ id }, process.env.SECRECT_KEY, { expiresIn: '1d' });
    return token;
}

// validation error handling
const handleError = (err)=> {
    const error = { email: '', password: '' }
    // Unique email validation
    if(err.code === 11000) {
        error.email = 'email already registered'
        return error
    }

    // email and password validation
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties})=> {
            error[properties.path] = properties.message
        })
    }
    return error
}

module.exports.signup = async (req, res)=> {
    try {
        const { username, email, password } = req.body;
        const data = await User.create({ username, email, password });
        const token = createToken(data._id)
        res.json({ uid: data._id, authToken: token });
    } catch(err) {
        const isError = handleError(err);
        res.status(400).json(isError);
    }
}

module.exports.login = async (req, res)=> {
    try {
        const { email, password } = req.body;
        const data = await User.login(email, password);
        const token = createToken(data._id)
        res.json({ uid: data._id, authToken: token });
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}
