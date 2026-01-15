var chatWindow = document.getElementById('chat-window');
var userInput = document.getElementById('user-input');
var sendBtn = document.getElementById('send-btn');

// 1. The Knowledge Base (The "Brain")
var knowledge = [
    { pattern: /hi|hello|hey/i, responses: ["Hello there!", "Hi! I'm OldHelper.", "Greetings!"] },
    { pattern: /how are you/i, responses: ["I'm doing great for an old phone!", "System check: 100% functional."] },
    { pattern: /name/i, responses: ["My name is OldHelper.", "You can call me OldHelper."] },
    { pattern: /iphone 6|old/i, responses: ["I love this hardware! It's a classic.", "Vintage is better, don't you think?"] },
    { pattern: /weather/i, responses: ["I can't see outside, but it feels like 72°F in this circuit board."] },
    { pattern: /bye|goodbye/i, responses: ["Goodbye! Come back soon.", "Ending session... just kidding, bye!"] }
];

// 2. The Logic
function getResponse(text) {
    // Look through the knowledge base for a match
    for (var i = 0; i < knowledge.length; i++) {
        if (knowledge[i].pattern.test(text)) {
            var possibleResponses = knowledge[i].responses;
            // Pick a random response from the list
            return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
        }
    }
    // Fallback if the bot doesn't understand
    return "That's interesting! Tell me more about that.";
}

// 3. UI Functions
function addMessage(text, sender) {
    var div = document.createElement('div');
    div.className = 'message ' + sender;
    div.innerText = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendBtn.onclick = function() {
    var text = userInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    userInput.value = '';
    
    // Simulate "thinking" delay
    setTimeout(function() {
        var reply = getResponse(text);
        addMessage(reply, 'helper');
    }, 500);
};
