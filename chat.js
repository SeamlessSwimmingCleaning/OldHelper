const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'message ' + sender;
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getAIResponse(prompt) {
    // We use a CORS Proxy to bypass browser security restrictions
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent(CONFIG.API_URL);

    try {
        const response = await fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // Note: Some proxies require specific formats. 
                // If AllOrigins fails, we may need to switch to a dedicated Worker.
                model: CONFIG.MODEL,
                messages: [{role: "user", content: prompt}],
                apiKey: CONFIG.API_KEY // Sent inside body for the proxy
            })
        });

        // If you still get an error, it might be the Proxy's format.
        // Let's try the direct method with a 'No-CORS' hint if the above fails.
        const data = await response.json();
        const contents = JSON.parse(data.contents);
        return contents.choices[0].message.content;
        
    } catch (error) {
        console.error(error);
        return "Error: OldHelper is having trouble reaching the brain. Check your API Key!";
    }
}

sendBtn.onclick = async () => {
    const text = userInput.value;
    if (!text) return;
    
    addMessage(text, 'user');
    userInput.value = '';
    
    addMessage("...", 'helper'); // Loading indicator
    const aiText = await getAIResponse(text);
    
    // Remove the "..." and add the real response
    chatWindow.lastChild.remove();
    addMessage(aiText, 'helper');
};
