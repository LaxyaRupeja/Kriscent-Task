const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/UserModel');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "glamconnect18@gmail.com",
        pass: "fbjryezlklsmqnpo",
    },
});
const UserController = {

    home: (req, res) => res.send('This is the Home Route of the User'),

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {

            // Checking if user  already exists in database
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Here I'm Checking if password is correct use bcrypt.compare() method
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token for user 
            const token = jwt.sign({ email: user.email, id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7h' });
            res.status(200).json({ user, token });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
    },

    registerUser: async (req, res) => {
        const { email, password, name, isAdmin } = req.body;


        try {
            // Here i'm Checking if user already exists in database
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create new user
            const newUser = new User({ email, password: hashedPassword, name, isAdmin });

            // Saving new user to database
            await newUser.save();

            // Generate JWT token for new user so that user can login immediately after registration
            const token = jwt.sign({ email: newUser.email, id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7h' });

            res.status(201).json({ user: newUser, token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
    sendOtp: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const otp = Math.floor(100000 + Math.random() * 900000);
            const mailOptions = {
                from: 'glamconnect18@gmail.com',
                to: email,
                subject: 'Your OTP for authentication',
                text: `Your OTP is: ${otp}`,
            };

            // Send the email
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
            } catch (error) {
                console.error('Error sending email:', error);
            }

            res.status(200).json({ message: 'OTP sent successfully' });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong' });
        }
    },
};

module.exports = UserController;
