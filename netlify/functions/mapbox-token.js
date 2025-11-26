// netlify/functions/mapbox-token.js
// Esta función serverless protege tu token de Mapbox

exports.handler = async (event, context) => {
  // El token se lee de las variables de entorno de Netlify
  const token = process.env.MAPBOX_TOKEN;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      // Permite solo tu dominio de Netlify
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ token })
  };
};