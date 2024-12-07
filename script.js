// Add this near the top of your script.js
const API_KEY = ''; // We'll handle this securely later

async function callClaudeAPI(userMessage) {
    try {
        // This will be replaced with real API call
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: userMessage
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        console.error('Error:', error);
        return 'Sorry, there was an error processing your request.';
    }
}




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
sendButton.addEventListener('click', async () => {
    const message = textArea.value.trim();
    if (message) {
        addMessage(message);
        textArea.value = '';
        
        setLoading(true);
        
        // Call the API and get response
        const response = await callClaudeAPI(message);
        addMessage(response, false);
        
        setLoading(false);
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
