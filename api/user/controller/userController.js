const User = require("../model/User");

// Register a user
exports.registerNewUser = async (req, res) => {
    // Check if email is already registered
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "User already registered" });
    }

    // Create a new user
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        let data = await user.save();
        const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
        res.status(201).json({ data, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
};