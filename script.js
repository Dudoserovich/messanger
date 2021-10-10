document.querySelector('#send').onclick = send;
document.querySelector('#delete').onclick = clear;
document.getElementsByName('radio')[0].onchange = show;
document.getElementsByName('radio')[1].onchange = show;
document.getElementsByName('radio')[2].onchange = show;

let history = [];
history.push('');
history.push('');
history.push('');

document.getElementsByName('message-text')[0].addEventListener('keyup', function (data) {
    if (data.key === 'Enter') {
        send();
    }
})

function send() {
    let message = document.querySelector('#content');
    let link = document.createElement('div');
    link.innerHTML = document.querySelector('#message-text').value;
    document.getElementById('message-text').focus();
    let flag = false;
    for (let i = 0; i < link.innerHTML.length; i++) {
        if (link.innerHTML[i] !== ' ') flag = true;
    }

    if (link.innerHTML !== '' && flag) {
        for(let i = 0; i < document.getElementsByName('radio').length; i++) {
            if (document.getElementsByName('radio')[i].checked) {
                history[i] += document.querySelector('#message-text').value + " -";
                localStorage.setItem('User' + (i + 1), history[i]);
            }
        }
        message.appendChild(link);
        message.scrollTop = message.scrollHeight;
        document.querySelector('#message-text').value = "";
    }
}

function sendMessage(sm) {
    let message = document.querySelector('#content');
    let link = document.createElement('div');
    link.innerHTML = sm;
    message.appendChild(link);
    document.querySelector('#message-text').value = "";
}

function messageCount(historyCount) {
    let count = 0;
    for (let i = 0; i < historyCount.length; i++) {
        if (historyCount[i] === '-') count++;
    }
    return count;
}

function clear() {
    while (document.querySelector('#content').hasChildNodes()) {
        let content = document.querySelector('#content').lastChild;
        content.parentNode.removeChild(content);
    }

    for(let i = 0; i < document.getElementsByName('radio').length; i++) {
        if (document.getElementsByName('radio')[i].checked) {
            history[i] = "";
            localStorage.removeItem('User' + (i + 1));
        }
    }
}

function clearMess() {
    while (document.querySelector('#content').hasChildNodes()) {
        let content = document.querySelector('#content').lastChild;
        content.parentNode.removeChild(content);
    }
}

function show() {
    clearMess();
    document.getElementById('message-text').focus();
    for(let i = 0; i < document.getElementsByName('radio').length; i++) {
        if (document.getElementsByName('radio')[i].checked && localStorage.getItem('User' + (i + 1)) !== null) {
            let ptr = localStorage.getItem('User' + (i + 1));
            let omg = messageCount(ptr);
            for (let j = 0; j < omg; j++) {
                sendMessage(ptr.slice(0, ptr.indexOf('-')));
                ptr = ptr.slice(ptr.indexOf('-') + 1, ptr.length);
            }
        }
    }
    let message = document.querySelector('#content');
    message.scrollTop = message.scrollHeight;
}