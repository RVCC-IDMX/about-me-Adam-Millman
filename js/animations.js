// Configuration - Add the names of animation/rendering projects
const ANIMATION_PROJECTS = [
    'project-3'
];

// Project media configuration
const PROJECT_MEDIA = {
    'project-3': {
        type: 'video',
        src: 'img/project3-demo.mp4',
        title: 'Project 3 Demo',
        poster: 'img/project3-poster.jpg'
    }
};

// Function to create media element based on type
function createMediaElement(mediaConfig) {
    if (!mediaConfig) return '';

    let mediaHtml = '';
    const title = mediaConfig.title;

    switch (mediaConfig.type) {
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
        case 'image':
            mediaHtml = `
                <div class="project-image">
                    <img src="${mediaConfig.src}" alt="${title}">
                    <div class="image-overlay">
                        <p>${title}</p>
                    </div>
                </div>`;
            break;
    }

    return mediaHtml;
}

// Function to fetch projects
async function fetchProjects() {
    try {
        const userResponse = await fetch('https://api.github.com/users/Adam-Millman/repos?sort=updated&direction=desc');
        const userRepos = await userResponse.json();
        
        // Filter repositories based on the configuration
        const filteredRepos = userRepos.filter(repo => 
            ANIMATION_PROJECTS.includes(repo.name)
        );
        
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        if (filteredRepos.length === 0) {
            projectsContainer.innerHTML = `
                <p class="error-message">
                    No projects found. Please check your repository configuration.
                </p>
            `;
            return;
        }

        filteredRepos.forEach(project => {
            const projectCard = document.createElement('a');
            projectCard.className = 'project-card';
            projectCard.href = project.html_url;
            projectCard.target = '_blank';
            projectCard.rel = 'noopener noreferrer';
            
            const mediaHtml = createMediaElement(PROJECT_MEDIA[project.name]);

            projectCard.innerHTML = `
                <div class="project-info">
                    <h3>${project.name}</h3>
                    <p>${project.description || 'No description available'}</p>
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
        console.error('Error fetching projects:', error);
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = `
            <p class="error-message">
                Unable to load projects. Please try again later.<br>
                Error: ${error.message}
            </p>
        `;
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', fetchProjects); 