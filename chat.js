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
    try {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + CONFIG.API_KEY
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: [{role: "user", content: prompt}]
            })
        });
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        return "Error: Could not connect to OldHelper.";
    }
}

sendBtn.onclick = async () => {
    const text = userInput.value;
    if (!text) return;
    
    addMessage(text, 'user');
    userInput.value = '';
    
    const aiText = await getAIResponse(text);
    addMessage(aiText, 'helper');
};
