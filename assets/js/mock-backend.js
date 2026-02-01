const DB_KEY = 'musicpro_users'; 
const SESSION_KEY = 'musicpro_current_user'; 

const MockBackend = {
    // REGISTER
    register: async (newUser) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                if (users.find(u => u.email === newUser.email)) {
                    reject("Email is already in use!");
                    return;
                }

                newUser.avatar = null; 
                users.push(newUser);
                localStorage.setItem(DB_KEY, JSON.stringify(users));
                
                const initialData = { favorites: [], playlists: [] };
                localStorage.setItem(`musicpro_data_${newUser.id}`, JSON.stringify(initialData));

                resolve({ message: "Account created successfully!" });
            }, 800); 
        });
    },

    // LOGIN
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    const { password, ...userWithoutPass } = user;
                    localStorage.setItem(SESSION_KEY, JSON.stringify(userWithoutPass));
                    resolve({ message: "Login successful!", user: userWithoutPass });
                } else {
                    reject("Incorrect email or password.");
                }
            }, 500);
        });
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(SESSION_KEY));
    },

    logout: () => {
        localStorage.removeItem(SESSION_KEY);
    },

    // GET USER DATA
    getUserData: async () => {
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!currentUser) return { favorites: [], playlists: [] };

        const dataKey = `musicpro_data_${currentUser.id}`;
        return JSON.parse(localStorage.getItem(dataKey)) || { favorites: [], playlists: [] };
    },

    // UPDATE USER DATA
    updateUserData: async (favorites, playlists) => {
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!currentUser) return;

        const dataKey = `musicpro_data_${currentUser.id}`;
        const newData = { favorites: favorites || [], playlists: playlists || [] };
        localStorage.setItem(dataKey, JSON.stringify(newData));
    },

    // UPDATE PROFILE INFO 
    updateUserProfile: async (updatedInfo) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                
                const userIndex = users.findIndex(u => u.id === updatedInfo.id);
                if (userIndex !== -1) {
                    users[userIndex] = { ...users[userIndex], ...updatedInfo };
                    localStorage.setItem(DB_KEY, JSON.stringify(users));
                }

                localStorage.setItem(SESSION_KEY, JSON.stringify(updatedInfo));

                resolve({ message: "Profile updated successfully!", user: updatedInfo });
            }, 800);
        });
    }
};