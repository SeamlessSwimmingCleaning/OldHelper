var chatWindow = document.getElementById('chat-window');
var userInput = document.getElementById('user-input');
var corpusInput = document.getElementById('corpus');
var brain = {};

// The AI Logic: Markov Chain
function trainAI(text) {
    var words = text.split(/\s+/);
    for (var i = 0; i < words.length - 1; i++) {
        var currentWord = words[i].toLowerCase();
        var nextWord = words[i + 1].toLowerCase();
        if (!brain[currentWord]) brain[currentWord] = [];
        brain[currentWord].push(nextWord);
    }
    addMessage("Brain trained! I now know " + words.length + " words.", "helper");
}

function generateResponse(seed) {
    var words = seed.toLowerCase().split(/\s+/);
    var currentWord = words[words.length - 1];
    var response = [];
    
    // Generate up to 15 words based on probability
    for (var i = 0; i < 15; i++) {
        var possibilities = brain[currentWord];
        if (!possibilities) break;
        currentWord = possibilities[Math.floor(Math.random() * possibilities.length)];
        response.push(currentWord);
    }
    
    return response.length > 0 ? response.join(" ") : "I don't know enough yet. Teach me more!";
}

// UI Handling
function addMessage(text, sender) {
    var div = document.createElement('div');
    div.className = 'message ' + sender;
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

document.getElementById('train-btn').onclick = function() {
    trainAI(corpusInput.value);
    corpusInput.value = "";
};

document.getElementById('send-btn').onclick = function() {
    var msg = userInput.value;
    if(!msg) return;
    addMessage(msg, "user");
    userInput.value = "";
    
    setTimeout(function() {
        var reply = generateResponse(msg);
        addMessage(reply, "helper");
    }, 400);
};
