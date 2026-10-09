// Assignment 5: Blogger — JavaScript, DOM and Event Handling

let postCount = 0;

window.onload = setupFunction;

function setupFunction() {
    // Set the forum title when the page has finished loading.
    document.getElementById("top").innerHTML = "Welcome to the Forum";

    // Connect event handlers in JavaScript instead of using inline onclick.
    document.getElementById("postButton").onclick = postFunction;
    document.getElementById("clearButton").onclick = clearFunction;
    document.getElementById("message").oninput = updateCharCount;
    updateCharCount();
}

function postFunction() {
    const messageBox = document.getElementById("message");
    const message = messageBox.value.trim();
    const status = document.getElementById("status");

    if (message === "") {
        status.textContent = "Please type a message before posting.";
        messageBox.focus();
        return;
    }

    // Use textContent so user-entered text is displayed as text, not HTML.
    if (postCount === 0) {
        setPost("topic", message, "Your first post will appear here.");
    } else if (postCount === 1) {
        setPost("reply1", message, "The first reply will appear here.");
    } else if (postCount === 2) {
        setPost("reply2", message, "The second reply will appear here.");
    } else {
        status.textContent = "The topic and two replies are full. Press Clear to start again.";
        return;
    }

    postCount++;
    messageBox.value = "";
    updateCharCount();
    status.textContent = postCount < 3
        ? "Message posted successfully."
        : "All three messages have been posted.";
    messageBox.focus();
}

function setPost(id, message, placeholder) {
    const element = document.getElementById(id);
    element.textContent = message;
    element.classList.remove("empty-state");
}

function clearFunction() {
    document.getElementById("topic").textContent = "";
    document.getElementById("reply1").textContent = "";
    document.getElementById("reply2").textContent = "";

    document.getElementById("topic").classList.add("empty-state");
    document.getElementById("reply1").classList.add("empty-state");
    document.getElementById("reply2").classList.add("empty-state");

    document.getElementById("message").value = "";
    postCount = 0;
    updateCharCount();
    document.getElementById("status").textContent = "All posts have been cleared.";
}

function updateCharCount() {
    const message = document.getElementById("message").value;
    document.getElementById("charCount").textContent = message.length + " / 1000";
}
