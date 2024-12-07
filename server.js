require('isomorphic-fetch');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1024,
                messages: [{
                    role: 'user',
                    content: req.body.message
                }]
            })
        };

        const response = await fetch('https://api.anthropic.com/v1/messages', requestOptions);
        
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (!response.ok) {
            throw new Error(`API request failed: Status ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        res.json({ response: data.content[0].text });
    } catch (error) {
        console.error('Full error:', error);
        res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY);
});