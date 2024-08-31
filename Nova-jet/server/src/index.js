const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const { connectToDatabase } = require('./database/novajet');
const User = require('./database/user');

app.use(cors());
app.use(express.json());

connectToDatabase();

app.post('/register', async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  try {
      const user = new User({ email, firstName, lastName, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});