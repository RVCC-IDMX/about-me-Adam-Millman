document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const icons = [
        'vscode.svg',
        'github.svg',
        'blender.svg',
        'adobe cloud.svg',
        'sketchup.svg',
        'html.svg',
        'css.svg',
        'python.svg',
        'cpp.svg',
        'java.svg',
        'unity.svg',
        'arduino.svg'
    ];

    // Create floating icons container if it doesn't exist
    let floatingContainer = document.querySelector('.floating-icons');
    if (!floatingContainer) {
        floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-icons';
        heroSection.insertBefore(floatingContainer, heroSection.firstChild);
    }

    // Function to update icon positions
    function updateIconPosition(iconElement) {
        const heroWidth = heroSection.offsetWidth;
        const heroHeight = heroSection.offsetHeight;
        const iconSize = 40; // Size of the icon
        
        // Random starting position within bounds
        let x = Math.random() * (heroWidth - iconSize);
        let y = Math.random() * (heroHeight - iconSize);
        
        // Slower random velocity (speed and direction)
        let vx = (Math.random() - 0.5) * 0.5; // Reduced from 4 to 0.5
        let vy = (Math.random() - 0.5) * 0.5; // Reduced from 4 to 0.5
        
        // Ensure minimum velocity
        if (Math.abs(vx) < 0.1) vx = vx < 0 ? -0.1 : 0.1;
        if (Math.abs(vy) < 0.1) vy = vy < 0 ? -0.1 : 0.1;
        
        // Rotation variables
        let rotation = 0;
        const rotationSpeed = (Math.random() - 0.5) * 0.5; // Random rotation speed
        
        function animate() {
            // Update position
            x += vx;
            y += vy;
            
            // Update rotation
            rotation += rotationSpeed;
            
            // Bounce off edges
            if (x <= 0 || x >= heroWidth - iconSize) {
                vx = -vx;
                x = x <= 0 ? 0 : heroWidth - iconSize;
            }
            if (y <= 0 || y >= heroHeight - iconSize) {
                vy = -vy;
                y = y <= 0 ? 0 : heroHeight - iconSize;
            }
            
            // Update position and rotation
            iconElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            
            // Continue animation
            requestAnimationFrame(animate);
        }
        
        // Start animation
        animate();
    }

    // Create and position icons
    icons.forEach(icon => {
        const iconElement = document.createElement('div');
        iconElement.className = 'floating-icon';
        
        const img = document.createElement('img');
        img.src = `img/icons/${icon}`;
        img.alt = icon.replace('.svg', '');
        iconElement.appendChild(img);

        // Set initial position and start animation
        updateIconPosition(iconElement);
        
        floatingContainer.appendChild(iconElement);
    });
}); 