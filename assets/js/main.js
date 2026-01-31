/* SESSION CHECK & USER PROFILE LOGIC */
document.addEventListener('DOMContentLoaded', async () => {

    /* DOM ELEMENTS SELECTION */
    const btnLogin = document.getElementById('btn-login-link');
    const btnLogout = document.getElementById('btn-logout');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    const playlistContainer = document.getElementById('my-playlists'); 


    /* INITIAL CLEANUP */
    if (playlistContainer) playlistContainer.innerHTML = '';
    
    document.querySelectorAll('.btn-heart.active').forEach(btn => {
        btn.classList.remove('active');
    });


    /* SESSION STATE HANDLING */
    const currentUser = MockBackend.getCurrentUser();

    if (currentUser) {
        console.log("Session Status: Active | User:", currentUser.email);

        if (btnLogin) btnLogin.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';

        if (userName) userName.innerText = currentUser.firstName;
        if (userAvatar) userAvatar.src = `https://ui-avatars.com/api/?name=${currentUser.firstName}&background=random`;

        const userData = await MockBackend.getUserData();

        if (playlistContainer && userData.playlists) {
            userData.playlists.forEach(pl => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#">${pl.name}</a>`;
                playlistContainer.appendChild(li);
            });
        }

        if (userData.favorites) {
            userData.favorites.forEach(song => {
                const btn = document.querySelector(`.btn-heart[data-id="${song.id}"]`);
                if (btn) btn.classList.add('active');
            });
        }

    } else {
        console.log("Session Status: Guest");
        if (btnLogin) btnLogin.style.display = 'block';
        if (userProfile) userProfile.style.display = 'none';
    }


    /* EVENT LISTENERS */
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            MockBackend.logout();
            window.location.reload();
        });
    }

});