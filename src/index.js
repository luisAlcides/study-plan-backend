const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Conectar a MongoDB Atlas
const mongoURI = '';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Definir un esquema y modelo para los perfiles
const profileSchema = new mongoose.Schema({
  name: String,
  progress: Object,
});

const Profile = mongoose.model('Profile', profileSchema);

// Rutas CRUD
app.post('/profiles', async (req, res) => {
  const newProfile = new Profile(req.body);
  await newProfile.save();
  res.json(newProfile);
});

app.get('/profiles', async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

app.put('/profiles/:id', async (req, res) => {
  const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProfile);
});

app.delete('/profiles/:id', async (req, res) => {
  await Profile.findByIdAndDelete(req.params.id);
  res.json({ message: 'Profile deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
