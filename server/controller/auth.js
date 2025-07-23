import Auth from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export const signUp = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        // Check if user already exists
        const existingUser = await Auth.find({ username });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Create new user
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const role = (username === 'pradeepa') ? 'admin' : 'user';
        const newUser = new Auth({
            username,
            password: hashedPassword,
            role: role,
            authProvider: 'local', // Default to local authentication
            createdAt: new Date(),
        });
        await newUser.save();
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );
        res.status(201).json({ message: 'User created successfully', user: { username }, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user exists
        const user = await Auth.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check password 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If password is valid, generate a token
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        // Return user info (excluding password) and token
        const { password: _, ...userInfo } = user.toObject();
        res.status(200).json({ message: 'Login successful', user: userInfo, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}


export const getUser = async (req, res) => {
    try {
        const users = await Auth.find();
        const usersWithoutPassword = users.map(user => {
            const { password, ...userInfo } = user.toObject();
            return userInfo;
        });
        res.status(200).json({ message: 'Users fetched successfully', users: usersWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};


export const updateUsersBulk = async (req, res) => {
    const { users } = req.body;
    try {
        const updatedUsers = await Promise.all(users.map(async (user) => {
            const existingUser = await Auth.findById(user._id);
            if (!existingUser) {
                throw new Error(`User with ID ${user._id} not found`);
            }
            existingUser.role = user.role;
            return existingUser.save();
        }));
        res.status(200).json({ message: 'Users updated successfully', users: updatedUsers });
    } catch (error) {
        res.status(500).json({ message: 'Error updating users', error: error.message });
    }
}