// Function to fetch GitHub repositories
async function fetchGitHubProjects() {
    try {
        console.log('Fetching GitHub projects...');
        
        // Fetch user repositories
        const userResponse = await fetch('https://api.github.com/users/Adam-Millman/repos?sort=updated&direction=desc');
        const userRepos = await userResponse.json();
        console.log('User repositories:', userRepos.length);

        // Fetch organizations
        const orgsResponse = await fetch('https://api.github.com/users/Adam-Millman/orgs');
        const orgs = await orgsResponse.json();
        console.log('Organizations:', orgs);

        // Fetch repositories for each organization
        let orgRepos = [];
        for (const org of orgs) {
            try {
                const orgReposResponse = await fetch(`https://api.github.com/orgs/${org.login}/repos?sort=updated&direction=desc`);
                const repos = await orgReposResponse.json();
                console.log(`Repositories for ${org.login}:`, repos.length);
                orgRepos = orgRepos.concat(repos);
            } catch (error) {
                console.error(`Error fetching repos for ${org.login}:`, error);
            }
        }

        // Combine and sort all repositories
        const allRepos = [...userRepos, ...orgRepos]
            .filter(project => !project.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6);

        console.log('Total unique repositories:', allRepos.length);
        
        const projectsContainer = document.querySelector('.projects-container');
        projectsContainer.innerHTML = ''; // Clear existing content

        allRepos.forEach(project => {
            const projectCard = document.createElement('a');
            projectCard.className = 'project-card';
            projectCard.href = project.html_url;
            projectCard.target = '_blank';
            projectCard.rel = 'noopener noreferrer';
            
            // Get the primary language color if available
            const languageColor = project.language ? getLanguageColor(project.language) : '#5865F2';
            
            // Get organization name if it's an org repo
            const orgName = project.owner.type === 'Organization' ? project.owner.login : null;
            
            projectCard.innerHTML = `
                <div class="project-info">
                    <h3>${project.name}</h3>
                    ${orgName ? `<span class="project-org">${orgName}</span>` : ''}
                    <p>${project.description || 'No description available'}</p>
                    <div class="project-meta">
                        <span class="project-language" style="background-color: ${languageColor}">
                            ${project.language || 'Unknown'}
                        </span>
                        <span class="project-stars">
                            <i class="fa fa-star"></i> ${project.stargazers_count}
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