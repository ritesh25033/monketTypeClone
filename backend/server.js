const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes will be added here

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
