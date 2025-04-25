const express = require('express');
const app = express();
app.use(express.json()); // to parse JSON bodies

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate the input fields
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(400).json({ error: "Email or Password cannot be empty" });
    }

    // Proceed with further logic (e.g., check user credentials, etc.)
    // For example:
    // const user = await User.findOne({ email });
    // if (user && user.password === password) {
    //    res.status(200).json({ message: "Login successful" });
    // } else {
    //    res.status(401).json({ error: "Invalid email or password" });
    // }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
