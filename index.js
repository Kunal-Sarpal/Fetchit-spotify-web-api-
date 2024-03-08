// const fetch = require('node-fetch');

const clientId = 'b7ad10e006874e5b9a8583ca84035a8a';
const clientSecret = 'f53e1d4566d44131817d46dab2d7ea2f';

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
