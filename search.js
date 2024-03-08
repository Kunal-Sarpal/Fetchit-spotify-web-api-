const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;
const accessToken = 'BQAZT5Vq025HFu-DYKV8_FeCHE7ZITrkdzG5jwd4gECTzFV-33Ea5-REsPc0uECvrRO3-7YLMAUaJBnOALlXYqoUUEpmlwo6mjvImT6_xQa9ewR1XeI';
// const artistId = '4PULA4EFzYTrxYvOVlwpiQ';

const Artist = require('./db');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.get('/', (req, res) => {
    res.render('artist')
})
app.get('/artist', async (req, res) => {
    const artistId = req.query.artistId
  try { 
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch artist data');
    }

    const data = await response.json();
    const artistData = {
      externalUrls: { spotify: data.external_urls.spotify },
      followers: { href: data.followers.href, total: data.followers.total },
      genres: data.genres,
      href: data.href,
      spotifyId: data.id,
      images: data.images,
      name: data.name,
      popularity: data.popularity,
      type: data.type,
      uri: data.uri
    };
    const prsent = await db.find({
        name: data.name
    })
    if(!prsent){

        await db.create({
            externalUrls: { spotify: data.external_urls.spotify },
            followers: { href: data.followers.href, total: data.followers.total },
            genres: data.genres,
            href: data.href,
            spotifyId: data.id,
            images: data.images,
            name: data.name,
            popularity: data.popularity,
            type: data.type,
            uri: data.uri
        })
         
    }
  

        const artist = await Artist.findOneAndUpdate({ spotifyId: artistData.spotifyId }, artistData, { upsert: true, new: true });
        res.render('dataG', {artist}); // Render the EJS file with artist data
    

    // Create or update artist document

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
