// netlify/functions/mapbox-token.js
// Esta función serverless protege tu token de Mapbox

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ token: process.env.MAPBOX_TOKEN }),
  };
};