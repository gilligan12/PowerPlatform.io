// Get elements from the page
const chatMessages = document.querySelector('.chat-messages');
const textArea = document.querySelector('textarea');
const sendButton = document.querySelector('button');
const loadingIndicator = document.querySelector('.loading-indicator');

function setLoading(isLoading) {
    // Remove the loading indicator if it exists
    const existingIndicator = chatMessages.querySelector('.loading-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (isLoading) {
        // Create and append loading indicator at the bottom
        chatMessages.appendChild(loadingIndicator);
        loadingIndicator.classList.remove('hidden');
    }
    
    sendButton.disabled = isLoading;
    textArea.disabled = isLoading;
}

function addMessage(text, isUser = true) {
    const existingIndicator = chatMessages.querySelector('.loading-indicator');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    const messageContainer = document.createElement('div');
    messageContainer.className = isUser ? 'message user-message' : 'message assistant-message';
    
    const messageText = document.createElement('div');
    messageText.textContent = text;
    messageContainer.appendChild(messageText);
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeDiv.textContent = time;
    messageContainer.appendChild(timeDiv);
    
    chatMessages.appendChild(messageContainer);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessageToServer(message) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('Server request failed');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, there was an error processing your request.';
    }
}

sendButton.addEventListener('click', async () => {
    const message = textArea.value.trim();
    if (message) {
        addMessage(message);
        textArea.value = '';
        
        setLoading(true);
        const response = await sendMessageToServer(message);
        setLoading(false);
        addMessage(response, false);
    }
});

textArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendButton.click();
    }
});