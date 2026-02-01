const DB_KEY = 'musicpro_users'; 
const SESSION_KEY = 'musicpro_current_user'; 

const MockBackend = {
    register: async (newUser) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');
                if (users.find(u => u.email === newUser.email)) {
                    reject("This email is already in use!");
                    return;
                }
                users.push(newUser);
                localStorage.setItem(DB_KEY, JSON.stringify(users));
                
                const initialData = { favorites: [], playlists: [] };
                localStorage.setItem(`musicpro_data_${newUser.id}`, JSON.stringify(initialData));

                resolve({ message: "Account created successfully!" });
            }, 800); 
        });
    },

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

    getUserData: async () => {
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!currentUser) return { favorites: [], playlists: [] }; 

        const dataKey = `musicpro_data_${currentUser.id}`; 
        return JSON.parse(localStorage.getItem(dataKey)) || { favorites: [], playlists: [] };
    },

    updateUserData: async (favorites, playlists) => {
        const currentUser = JSON.parse(localStorage.getItem(SESSION_KEY));
        if (!currentUser) return;

        const dataKey = `musicpro_data_${currentUser.id}`;
        const newData = {
            favorites: favorites || [],
            playlists: playlists || []
        };
        
        localStorage.setItem(dataKey, JSON.stringify(newData));
        console.log(`Data has been saved for User ID: ${currentUser.id}`);
    }
};