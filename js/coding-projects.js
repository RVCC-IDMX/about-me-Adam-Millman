// Configuration - Add the names of coding repositories you want to display
const CODING_PROJECTS = [ 
    'Discord-bot',             
    'API-Based-App',
    'Final-Project'
];

// Project media configuration
const PROJECT_MEDIA = {
    'API-Based-App': {
        type: 'apod',
        title: 'NASA Astronomy Picture of the Day',
        fallbackImage: 'img/fallback-apod.jpg'
    },
    'Discord-bot': {
        type: 'image',
        src: 'img/icons/discord.svg',
        title: 'Discord Bot Project'
    },
    'final-project': {
        type: 'image',
        src: 'img/escape room.jpg',
        title: 'Escape Room Project'
    }
};

// Function to fetch NASA APOD
async function fetchAPOD() {
    try {
        const response = await fetch('/.netlify/functions/apod');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching APOD:', error);
        return {
            url: 'img/fallback-apod.jpg',
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
            const imageUrl = apodData?.url || 'https://apod.nasa.gov/apod/image/2404/STScI-01.jpg';
            const imageTitle = apodData?.title || title;
            mediaHtml = `
                <div class="project-image">
                    <img src="${imageUrl}" alt="${imageTitle}" style="${mediaConfig.style || ''}">
                    <div class="image-overlay">
                        <p>${imageTitle}</p>
                    </div>
                </div>`;
            break;
        case 'image':
            mediaHtml = `
                <div class="project-image">
                    <img src="${mediaConfig.src}" alt="${title}" style="${mediaConfig.style || ''}">
                    <div class="image-overlay">
                        <p>${title}</p>
                    </div>
                </div>`;
            break;
    }

    return mediaHtml;
}

// Function to fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        console.log('Fetching repositories...');
        const userResponse = await fetch('https://api.github.com/users/Adam-Millman/repos?sort=updated&direction=desc');
        const userRepos = await userResponse.json();
        
        console.log('All repositories:', userRepos.map(repo => repo.name));
        console.log('Looking for:', CODING_PROJECTS);
        
        // Filter repositories based on the configuration
        const filteredRepos = userRepos.filter(repo => 
            CODING_PROJECTS.includes(repo.name)
        );
        
        console.log('Filtered repositories:', filteredRepos.map(repo => repo.name));
        
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        if (filteredRepos.length === 0) {
            console.log('No matching repositories found');
            projectsContainer.innerHTML = `
                <p class="error-message">
                    No projects found. Please check your repository configuration.
                </p>
            `;
            return;
        }

        // Fetch APOD data if API-Based-App is in the list
        let apodData = null;
        if (filteredRepos.some(repo => repo.name === 'API-Based-App')) {
            apodData = await fetchAPOD();
        }

        filteredRepos.forEach(project => {
            console.log('Creating card for:', project.name);
            const projectCard = document.createElement('a');
            projectCard.className = 'project-card';
            projectCard.href = project.html_url;
            projectCard.target = '_blank';
            projectCard.rel = 'noopener noreferrer';
            
            const languageColor = project.language ? getLanguageColor(project.language) : '#5865F2';
            const mediaHtml = createMediaElement(PROJECT_MEDIA[project.name], apodData);

            projectCard.innerHTML = `
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description || 'No description available'}</p>
                    <div class="project-meta">
                        <span class="project-language" style="background-color: ${languageColor}">
                            ${project.language || 'Unknown'}
                        </span>
                    </div>
                    ${project.homepage ? `
                        <div class="project-links">
                            <a href="${project.homepage}" class="project-link" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                                View Project
                            </a>
                        </div>
                    ` : ''}
                </div>
                ${mediaHtml}
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
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
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);