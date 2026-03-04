document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Build a mailto: link that opens the user's email client
    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Replace this address with the one where you want to receive messages
    const recipient = 'amillman20@gmail.com';

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Show a temporary success message in the UI
    const existingMessage = this.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const formMessage = document.createElement('div');
    formMessage.className = 'form-message success';
    formMessage.textContent = `Thank you for your message, ${name}! Your email client should open so you can send it.`;

    this.appendChild(formMessage);

    // Optionally clear the form
    this.reset();

    // Remove the message after 5 seconds
    setTimeout(() => {
        formMessage.remove();
    }, 5000);
});