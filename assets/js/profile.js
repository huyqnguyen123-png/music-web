document.addEventListener('DOMContentLoaded', () => {
    
    // SETUP TOAST NOTIFICATION
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span class="toast-msg">${message}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            toast.addEventListener('animationend', () => toast.remove());
        }, 3000);

        toast.addEventListener('click', () => toast.remove());
    }

    // CHECK LOGIN
    const currentUser = MockBackend.getCurrentUser();
    if (!currentUser) {
        showToast("Please login to edit profile!", "error");
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }

    // DOM ELEMENTS
    const avatarPreview = document.getElementById('profile-avatar-preview');
    const avatarInput = document.getElementById('avatar-input');
    const fullNameEl = document.getElementById('profile-fullname');
    
    const inpFirst = document.getElementById('p-firstname');
    const inpLast = document.getElementById('p-lastname');
    const inpEmail = document.getElementById('p-email');
    const inpPhone = document.getElementById('p-phone');
    const inpCountry = document.getElementById('p-country');
    const form = document.getElementById('profile-form');

    // LOAD DATA TO UI
    function loadData() {
        inpFirst.value = currentUser.firstName || '';
        inpLast.value = currentUser.lastName || '';
        inpEmail.value = currentUser.email || '';
        inpPhone.value = currentUser.phone || '';
        inpCountry.value = currentUser.country || '';
        fullNameEl.innerText = `${currentUser.firstName} ${currentUser.lastName}`;

        // Load Avatar
        if (currentUser.avatar) {
            avatarPreview.src = currentUser.avatar;
        } else {
            avatarPreview.src = `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}&background=random&color=fff&size=256`;
        }
    }
    loadData();

    // HANDLE AVATAR UPLOAD
    let newAvatarBase64 = null;

    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showToast("Image is too large! Please choose under 2MB.", "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                avatarPreview.src = event.target.result;
                newAvatarBase64 = event.target.result;   
            };
            reader.readAsDataURL(file);
        }
    });

    // SAVE CHANGES
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "Saving...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        const updatedUser = {
            ...currentUser,
            firstName: inpFirst.value.trim(),
            lastName: inpLast.value.trim(),
            phone: inpPhone.value.trim(),
            country: inpCountry.value.trim(),
            avatar: newAvatarBase64 || currentUser.avatar 
        };

        try {
            await MockBackend.updateUserProfile(updatedUser);

            showToast("Profile updated successfully!", "success");
            
            fullNameEl.innerText = `${updatedUser.firstName} ${updatedUser.lastName}`;

        } catch (error) {
            showToast("Error updating profile: " + error, "error");
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
});