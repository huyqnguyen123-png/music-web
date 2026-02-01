/* SESSION CHECK & USER PROFILE LOGIC */
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. SELECT DOM ELEMENTS
    const menuBtn = document.getElementById('user-menu-btn');
    const guestDropdown = document.getElementById('guest-dropdown');
    const userDropdown = document.getElementById('user-dropdown');
    const menuUserName = document.getElementById('menu-user-name');
    const btnLogout = document.getElementById('menu-btn-logout');

    // 2. CHECK LOGIN SESSION
    const currentUser = MockBackend.getCurrentUser();

    function closeAllDropdowns() {
        if(guestDropdown) guestDropdown.classList.add('hidden');
        if(userDropdown) userDropdown.classList.add('hidden');
    }

    if (currentUser) {
        console.log("Session Active:", currentUser.email);

        let avatarUrl = '';
        if (currentUser.avatar) {
            avatarUrl = currentUser.avatar; 
        } else {
            avatarUrl = `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=random&color=fff&size=128`;
        }

        menuBtn.innerHTML = `<img src="${avatarUrl}" alt="Avatar">`;
        
        if(menuUserName) menuUserName.innerText = `${currentUser.firstName} ${currentUser.lastName}`;

        const profileLink = userDropdown.querySelector('a .fa-user-circle')?.closest('a');
        if (profileLink) {
            profileLink.href = "profile.html"; 
        }

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = userDropdown.classList.contains('hidden');
            closeAllDropdowns(); 
            if (isHidden) userDropdown.classList.remove('hidden');
        });

        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                MockBackend.logout();
                window.location.reload(); 
            });
        }

    } else {
        console.log("Session Status: Guest");
        
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = guestDropdown.classList.contains('hidden');
            closeAllDropdowns(); 
            if (isHidden) guestDropdown.classList.remove('hidden');
        });
    }

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && 
            !guestDropdown.contains(e.target) && 
            !userDropdown.contains(e.target)) {
            closeAllDropdowns();
        }
    });
});