/* Server & Database Simulation */
const DB_KEY = 'musicpro_users'; 
const SESSION_KEY = 'musicpro_current_user'; 
const MockBackend = {
    register: async (newUser) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem(DB_KEY) || '[]');

                const existingUser = users.find(u => u.email === newUser.email);
                if (existingUser) {
                    reject("Email này đã được sử dụng!");
                    return;
                }

                users.push(newUser);
                localStorage.setItem(DB_KEY, JSON.stringify(users));

                resolve({ message: "Tạo tài khoản thành công!" });
            }, 1000); 
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
                    
                    resolve({ 
                        message: "Đăng nhập thành công!",
                        user: userWithoutPass
                    });
                } else {
                    reject("Email hoặc mật khẩu không chính xác.");
                }
            }, 800);
        });
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(SESSION_KEY));
    },

    logout: () => {
        localStorage.removeItem(SESSION_KEY);
    }
};