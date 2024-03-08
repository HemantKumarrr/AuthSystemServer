const User = require('../models/User');
const jwt = require('jsonwebtoken');

// creating jwt function
const createToken = (id)=> {
    const token = jwt.sign({ id }, process.env.SECRECT_KEY, { expiresIn: '1d' });
    return token;
}

// validation error handling
const handleError = (err)=> {
    console.log(err)
}

module.exports.signup = async (req, res)=> {
    try {
        const { username, email, password } = req.body;
        const data = await User.create({ username, email, password });
        const token = createToken(data._id)
        res.json({ uid: data._id, authToken: token });
    } catch(err) {
        res.send(handleError)
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
