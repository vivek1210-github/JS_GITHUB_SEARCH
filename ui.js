class UI {

    constructor() {
        this.profile = document.querySelector('#profile');
    }

    // Show User profile UI
    showUserProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${user.avatar_url}" alt="" class="img-fluid mb-2" />
                        <a href="${user.html_url}" target="_blank" class="btn btn-light text-dark mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge bg-primary">
                                Public Repos: ${user.public_repos}
                        </span>
                        <span class="badge bg-secondary">
                            Public Repos: ${user.public_gists}
                        </span>
                        <span class="badge bg-success">
                            Followers: ${user.followers}
                        </span>
                        <span class="badge bg-dark">
                            Following: ${user.following}
                        </span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">
                                Company: ${user.company}
                            </li>
                            <li class="list-group-item">
                                Blog: ${user.blog}
                            </li>
                            <li class="list-group-item">
                                Location: ${user.location}
                            </li>
                            <li class="list-group-item">
                                Created At: ${user.created_at}
                            </li>
                        </ul>
                    </div>
                </div>
                <h3 class="page-heading mb-3">Latest Repos</h3>
                <div id="repos"></div>
            </div>        
        `;
    }


    // Show repos
    showRepos(repos) {
        let output = '';
        console.log(repos);
        if (repos.length > 0) {
            repos.forEach((repo) => {
                output += `
                    <div class="card card-body mb-2">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            </div>
                            <div class="col-md-6">
                                <span class="badge bg-success">
                                    Stars: ${repo.stargazers_count}
                                </span>
                                <span class="badge bg-dark">
                                    Watchers: ${repo.watchers_count}
                                </span>
                                <span class="badge bg-danger">
                                    Forks: ${repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>            
                `;
            });
        } else {
            output += `<div class="newdata alert alert-danger">No Repos Found</div>`
        }


        document.getElementById('repos').innerHTML = output;
    }

    // Show Alert
    showAlert(message, className) {
        // Clear alert first
        this.clearAlert();
        // create div
        const div = document.createElement('div');
        // add class
        div.className = className;
        // append text
        div.appendChild(document.createTextNode(message));
        // Get parent container
        const container = document.querySelector('.search-container');
        // Get search box
        const searchBox = container.querySelector('.search');
        // insert before searchBox in conatiner
        container.insertBefore(div, searchBox);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);

    }

    // Clear Alert
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear Profile
    clearProfile() {
        this.profile.innerHTML = '';
    }

}