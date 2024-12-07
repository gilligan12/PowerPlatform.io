// Get elements from the page
const chatMessages = document.querySelector('.chat-messages');
const textArea = document.querySelector('textarea');
const sendButton = document.querySelector('button');
const loadingIndicator = document.querySelector('.loading-indicator');


// Function to add a message to the chat
function addMessage(text, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-message' : 'message assistant-message';
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle send button click
sendButton.addEventListener('click', () => {
    const message = textArea.value.trim();
    if (message) {
        addMessage(message);
        textArea.value = '';
        // Here we'll later add the API call
        addMessage('Thanks for your message! API integration coming soon...', false);
    }
});

// Allow Enter key to send message (Shift+Enter for new line)
sendButton.addEventListener('click', async () => {
    const message = textArea.value.trim();
    if (message) {
        addMessage(message);
        textArea.value = '';
        
        // Show loading state
        setLoading(true);
        
        // Simulate API delay (we'll replace this with real API call later)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        addMessage('Thanks for your message! API integration coming soon...', false);
        
        // Hide loading state
        setLoading(false);
    }
});


// Function to show/hide loading state
function setLoading(isLoading) {
    loadingIndicator.classList.toggle('hidden', !isLoading);
    sendButton.disabled = isLoading;
    textArea.disabled = isLoading;
}
