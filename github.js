class Github {

    constructor() {
        this.clientId = 'dfc833a41fa93ff45595';
        this.clientSecret = '6d40a54fa02decbc5a916ee0e6fab7248d7c5ea2';
        this.reposPerPage = 5;
        this.reposSortBy = 'created: asc';
        this.apiUrl = 'https://api.github.com';
    }


    async getUser(user) {
        // ?per_page=${this.perPage}&client_id=${this.clientId}&client_secret=${this.clientSecret}
        // Get user profile
        const profileUrl = `${this.apiUrl}/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`;
        const profileResponse = await fetch(profileUrl);
        // Get user repos
        const reposUrl = `${this.apiUrl}/users/${user}/repos?per_page=${this.reposPerPage}&sort=${this.reposSortBy}&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
        const reposResponse = await fetch(reposUrl);

        // get profile json
        const profile = await profileResponse.json();
        // get repos json
        const repos = await reposResponse.json();

        return {
            profile,
            repos
        };
    }

}