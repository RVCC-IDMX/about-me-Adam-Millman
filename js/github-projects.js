// Configuration - Add the names of repositories you want to display
const REPOSITORIES_TO_SHOW = [ 
    'Discord-bot',             
    'API-Based-App',
];

// Project media configuration
const PROJECT_MEDIA = {
    'API-Based-App': {
        type: 'apod',
        title: 'NASA Astronomy Picture of the Day'
    },
    'Discord-bot': {
        type: 'svg',
        src: 'img/icons/discord.svg',
        title: 'Discord Bot Project'
    },
    'Mini Challenge 3': {
        type: 'video',
        src: 'img/Mini Challenge #3.mp4',
        title: 'Mini Challenge 3 Animation',
        poster: 'img/website-contrast.png'
    },
    'Mid-Term Animation': {
        type: 'video',
        src: 'img/Mid-Term Animation.mp4',
        title: 'Mid-Term Animation Project',
        poster: 'img/website-contrast-dark-blue.png'
    },
    'Typing Animation': {
        type: 'video',
        src: 'img/Typing Animation.mp4',
        title: 'Typing Animation Project',
        poster: 'img/website-contrast.png'
    }
};

// Project descriptions and details
const PROJECT_DETAILS = {
    'Discord-bot': {
        description: 'A custom Discord bot with various features and commands.',
        language: 'JavaScript',
        link: 'https://github.com/Adam-Millman/Discord-bot'
    },
    'API-Based-App': {
        description: 'An application that integrates with external APIs to provide dynamic content.',
        language: 'JavaScript',
        link: 'https://github.com/Adam-Millman/API-Based-App'
    },
    'Mini Challenge 3': {
        description: 'A web animation project showcasing interactive elements and transitions.',
        language: 'HTML/CSS',
        link: '#'
    },
    'Mid-Term Animation': {
        description: 'An advanced animation project demonstrating complex motion and effects.',
        language: 'HTML/CSS',
        link: '#'
    },
    'Typing Animation': {
        description: 'A typing animation project featuring smooth text transitions and effects.',
        language: 'HTML/CSS',
        link: '#'
    }
};

// Function to fetch NASA APOD
async function fetchAPOD() {
    try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
        return {
            url: 'img/img-hover-css.png',
            title: 'NASA Astronomy Picture of the Day'
        };
    }
}

// Function to create media element based on type
function createMediaElement(mediaConfig, apodData = null) {
    if (!mediaConfig) return '';

    let mediaHtml = '';
    const title = mediaConfig.title;

    switch (mediaConfig.type) {
        case 'apod':
            if (apodData) {
                mediaHtml = `
                    <div class="project-image">
                        <img src="${apodData.url}" alt="${title}">
                        <div class="image-overlay">
                            <p>${title}</p>
                        </div>
                    </div>`;
            } else {
                mediaHtml = `
                    <div class="project-image">
                        <img src="img/img-hover-css.png" alt="Fallback image">
                        <div class="image-overlay">
                            <p>${title}</p>
                        </div>
                    </div>`;
            }
            break;
        case 'svg':
            mediaHtml = `
                <div class="project-image">
                    <object type="image/svg+xml" data="${mediaConfig.src}" class="svg-content">
                        ${title}
                    </object>
                    <div class="image-overlay">
                        <p>${title}</p>
                    </div>
                </div>`;
            break;
        case 'video':
            mediaHtml = `
                <div class="project-image">
                    <video 
                        src="${mediaConfig.src}" 
                        ${mediaConfig.poster ? `poster="${mediaConfig.poster}"` : ''}
                        loop
                        muted
                        playsinline
                        controls
                    >
                        Your browser does not support the video tag.
                    </video>
                    <div class="image-overlay">
                        <p>${title}</p>
                    </div>
                </div>`;
            break;
    }

    return mediaHtml;
}

// Function to create project cards
async function createProjectCards() {
    try {
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        // Fetch APOD if needed
        const apodData = REPOSITORIES_TO_SHOW.includes('API-Based-App') ? await fetchAPOD() : null;

        // Create project cards
        REPOSITORIES_TO_SHOW.forEach(projectName => {
            const projectCard = document.createElement('a');
            projectCard.className = 'project-card';
            projectCard.href = PROJECT_DETAILS[projectName].link;
            projectCard.target = '_blank';
            projectCard.rel = 'noopener noreferrer';
            
            const projectDetails = PROJECT_DETAILS[projectName];
            const mediaConfig = PROJECT_MEDIA[projectName];
            const mediaHtml = createMediaElement(mediaConfig, apodData);
            
            const languageColor = getLanguageColor(projectDetails.language);
            
            projectCard.innerHTML = `
                <div class="project-info">
                    <h3>${projectName}</h3>
                    <p>${projectDetails.description}</p>
                    <div class="project-meta">
                        <span class="project-language" style="background-color: ${languageColor}">
                            ${projectDetails.language}
                        </span>
                    </div>
                </div>
                ${mediaHtml}
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error creating project cards:', error);
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = `
            <p class="error-message">
                Unable to load projects. Please try again later.<br>
                Error: ${error.message}
            </p>
        `;
    }
}

// Function to get color for programming languages
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'C++': '#f34b7d',
        'C#': '#178600',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'Shell': '#89e051',
        'PowerShell': '#012456',
        'Vue': '#2c3e50',
        'React': '#61dafb',
        'Angular': '#dd0031',
        'Svelte': '#ff3e00'
    };
    
    return colors[language] || '#5865F2'; // Default to Discord blurple if language not found
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', createProjectCards); 