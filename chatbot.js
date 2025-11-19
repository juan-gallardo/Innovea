// Este archivo solo controlará el chatbot
document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // Verifica que todos los elementos existan antes de añadir listeners
    if (!chatBubble || !chatWindow || !chatForm || !chatInput || !chatMessages) {
        // Si no estamos en la página principal, simplemente no hace nada.
        return;
    }

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, 'user');
        chatInput.value = '';

        const typingIndicator = addMessage('Escribiendo...', 'bot typing');

        try {
            const response = await fetch('/.chatbot/functions/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                // Captura el error para mostrarlo en la consola del navegador
                const errorData = await response.json();
                throw new Error(errorData.error || 'La respuesta del servidor no fue exitosa.');
            }

            const data = await response.json();
            typingIndicator.remove();
            addMessage(data.response, 'bot');

        } catch (error) {
            console.error('Error al contactar al chatbot:', error);
            typingIndicator.remove();
            addMessage(`Lo siento, hubo un error: ${error.message}`, 'bot');
        }
    });

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        
        // Separa el 'type' por espacios para añadir cada clase individualmente
        const classes = type.split(' ');
        
        // Añade la clase base 'message' y luego las clases del 'type'
        messageElement.classList.add('message', ...classes);
        
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageElement;
    }
});