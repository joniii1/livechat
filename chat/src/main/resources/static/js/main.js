
var stompClient = null;
var username = null;

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if (username) {
        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {

    stompClient.subscribe('/topic/public', onMessageReceived);


    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    )

    document.querySelector('.connecting').classList.add('hidden');
    document.querySelector('#username-page').classList.add('hidden');
    document.querySelector('#chat-page').classList.remove('hidden');
}

function onError(error) {
    document.querySelector('.connecting').textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    document.querySelector('.connecting').style.color = 'red';
}

function sendMessage(event) {
    var messageContent = document.querySelector('#message').value.trim();

    if (messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        document.querySelector('#message').value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);

    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    document.querySelector('#messageArea').appendChild(messageElement);
    document.querySelector('#messageArea').scrollTop = document.querySelector('#messageArea').scrollHeight;
}


document.querySelector('#usernameForm').addEventListener('submit', connect, true);
document.querySelector('#messageForm').addEventListener('submit', sendMessage, true);
