const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const registerUser = async(req,res) =>{
    const {username,password} = req.body
    try {
        const user = new User({username,password})
        await user.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET) 
        res.json({token,userId:user._id})
    } catch (error) {
        res.json({msg:'User registration failed'})
    }
}


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: 'User login failed' });
    }
};

module.exports = {registerUser,loginUser}