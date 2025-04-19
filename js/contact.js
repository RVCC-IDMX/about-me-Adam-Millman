document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create a message to display
    const formMessage = document.createElement('div');
    formMessage.className = 'form-message';
    
    // For now, we'll just show a success message
    // In a real implementation, you would send this data to a server
    formMessage.textContent = `Thank you for your message, ${name}! I'll get back to you soon.`;
    formMessage.classList.add('success');
    
    // Clear the form
    this.reset();
    
    // Add the message to the form
    this.appendChild(formMessage);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        formMessage.remove();
    }, 5000);
}); 