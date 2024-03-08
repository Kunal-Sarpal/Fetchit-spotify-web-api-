// const fetch = require('node-fetch');

const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';

const url = 'https://accounts.spotify.com/api/token';

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', clientId);
data.append('client_secret', clientSecret);
console.log(data)

async function getAccessToken() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const tokenData = await response.json();
        const accessToken = tokenData.access_token;
        return accessToken;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}
async function get(){
    let token = await getAccessToken();
    console.log(token)

}
get()
module.exports = {
    getAccessToken:getAccessToken()
};
