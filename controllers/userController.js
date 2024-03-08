const User = require('../models/User');


module.exports.delete = async (req, res)=> {
    try {
        const uid = req.params.id

        //user exist or not
        const userExits = await User.findById({ _id: uid });
        if(!userExits) return res.send({ message: "user not found" });

        // delete user
        const data = await User.deleteOne({ _id: uid });
        res.json({ message: "user deleted successfully"})
    } catch(err) {
        res.status(400).json({ error: err });
    }
}

module.exports.update_profile = async (req, res)=> {
    try {
        const uid = req.params.id;

        //user exist or not
        const userExits = await User.findById({ _id: uid });
        if(!userExits) return res.send({ message: "user not found" });

        //update user
        const data = await User.updateOne( 
            { _id: uid},
            {
                $set: req.body
            }
        );
        if(!data.acknowledged) return res.json({ message: "user not updated"})
        res.json({ message: "user updated successfully"});
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports.get_user = async (req, res)=> {
    try {
        const uid = req.params.id;
        const data = await User.findById({ _id: uid })
        res.json({ username: data.username, email: data.email });
    } catch(err) {
        console.log(err)
    }
}

module.exports.forgot_password = async (req, res)=> {
    try {
        
    } catch(err) {
        console.log(err)
    }
}