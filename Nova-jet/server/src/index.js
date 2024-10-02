const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const { connectToDatabase } = require('./database/novajet');
const User = require('./database/user');

const userRoutes = require('./routes/user');
const planeRoutes = require('./routes/flight/plane');
const flightRoutes = require('./routes/flight/flight');

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/user', userRoutes);
app.use('/plane', planeRoutes);
app.use('/flight', flightRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});