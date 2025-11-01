// Chat Widget Functionality
let chatOpen = false;

function toggleChat() {
  const chatBox = document.getElementById('chatBox');
  const chatWidget = document.getElementById('chat-widget');

  chatOpen = !chatOpen;

  if (chatOpen) {
    chatBox.style.display = 'block';
    chatWidget.classList.add('active');
  } else {
    chatBox.style.display = 'none';
    chatWidget.classList.remove('active');
  }
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.querySelector('.chat-messages');

  if (input.value.trim()) {
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.textContent = input.value;
    messages.appendChild(userMsg);

    // Auto-reply
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';
      botMsg.textContent = 'Thanks for your message! Our team will get back to you soon.';
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 1000);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
}

// Back to top functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide back to top button
window.addEventListener('scroll', () => {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

// Enter key support for chat
document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
});