const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please enter username"],
    },
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        validate: [ isEmail , "enter a valid email" ]
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minLength: [6, "minimum length of password is 6 characters"]
    }
}, { timestamps: true })

userSchema.pre( 'save', async function (next) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash( this.password, salt );
    this.password = hashedPassword;
    next();
})

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({ email });
    if(user) {
        const authPassword = await bcrypt.compare( password, user.password);
        if(authPassword) {
            return user;
        } throw Error("incorrect password");
    } throw Error("invalid email")
}


const User = mongoose.model( 'user', userSchema );

module.exports = User;