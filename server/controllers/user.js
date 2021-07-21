import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
const secret = 'test';
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const exisitingUser = await UserModel.findOne({ email });
        if (exisitingUser) return res.status(400).json({ message: 'User already exists' });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't  match" });
        const hashedPassword = await bycript.hash(password, 12);
        const reuslt = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: reuslt.email, id: reuslt._id }, secret, { expiresIn: '1h' });
        res.status(200).json({ reuslt, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }

};


export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exisitingUser = await UserModel.findOne({ email });
        if (!exisitingUser) return res.status(400).json({ message: "User doesn't exist" });
        const isPsswordCorrect = await bycript.compare(password, exisitingUser.password);
        if (!isPsswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ email: exisitingUser.email, id: exisitingUser._id }, secret, { expiresIn: '1h' });
        res.status(201).json({ reuslt: exisitingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
        console.log(error);
    }
};