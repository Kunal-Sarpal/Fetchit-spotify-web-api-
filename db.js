const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://your_username:your_pass@cluster1.pc6dcst.mongodb.net/spotify_artist")
// Define the artist schema
const artistSchema = new mongoose.Schema({
  externalUrls: {
    spotify: { type: String, required: true }
  },
  followers: {
    href: { type: String },
    total: { type: Number }
  },
  genres: [{ type: String }],
  href: { type: String, required: true },
  spotifyId: { type: String, required: true, unique: true },
  images: [{
    height: { type: Number },
    url: { type: String },
    width: { type: Number }
  }],
  name: { type: String, required: true },
  popularity: { type: Number },
  type: { type: String },
  uri: { type: String }
});

// Define the Artist model
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
