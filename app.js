// searchUser field
const searchBtn = document.querySelector('#searchBtn');

// Github Class instance
const github = new Github;

// UI Class instance
const ui = new UI;

// add keyup event listener
searchBtn.addEventListener('click', async (e) => {

    const searchInput = document.querySelector('#searchUser').value;

    if (searchInput !== '') {
        // Get user profile
        const { profile, repos } = await github.getUser(searchInput);
        console.log(profile);
        if (profile && profile.message === 'Not Found') {
            // clear console
            // console.clear();
            console.log(profile.message);
            // set alert
            ui.showAlert('User not found', 'alert alert-danger')
        } else if (profile.message && profile.message.includes('rate')) {
            ui.showAlert(profile.message, 'alert alert-danger')
        } else {
            // profile
            ui.showUserProfile(profile);
            // repos
            ui.showRepos(repos);
        }
    } else {
        // clear profile if search blank
        ui.clearProfile();
    }

});