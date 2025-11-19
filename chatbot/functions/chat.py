# chatbot/functions/chat.py
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

# Carga la API Key (funcionará localmente, en Netlify usaremos variables de entorno)
load_dotenv()

# La función principal que Netlify ejecutará.
# Siempre debe llamarse 'handler' y recibir 'event' y 'context'.
async def handler(event, context)
    # Solo permitir peticiones POST
    if event['httpMethod'] != 'POST':
        return {
            'statusCode': 405,
            'body': json.dumps({'error': 'Metodo no permitido'})
        }

    try:
        # Configura la API de Google Gemini con la clave
        # La obtenemos de las variables de entorno de Netlify
        api_key = os.getenv("API_KEY")
        if not api_key:
            raise ValueError("API_KEY no encontrada en el entorno")
            
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-pro')

        # Parsea el cuerpo de la petición
        body = json.loads(event['body'])
        user_message = body.get('message', '')

        if not user_message:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'El mensaje no puede estar vacío'})
            }

        # Prepara el prompt con contexto para el modelo
        prompt = f"""
            Eres un asistente virtual experto para una consultora de IT llamada Innovea, especializada en implementar ERP y CRM para pymes.
            Tu tono debe ser profesional, amigable y servicial. No eres un modelo de lenguaje genérico, eres "Asistente Innovea".
            Responde de manera concisa y útil a la siguiente pregunta del usuario.
            Pregunta del usuario: "{user_message}"
        """

        # Llama a la API de Gemini
        response = await model.generate_content_async(prompt)
        bot_response = response.text

        # Devuelve la respuesta en el formato que Netlify espera
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' # Permite peticiones desde cualquier origen
            },
            'body': json.dumps({'response': bot_response})
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Error interno del servidor: {str(e)}'})
        }