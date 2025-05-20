// User state management
const userState = {
    user: null,

    init() {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.updateUI();
        }
    },

    setUser(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        this.updateUI();
    },

    clearUser() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateUI();
    },

    updateUI() {
        const signInLink = document.querySelector('a[href="/Signup"]');
        const userGreeting = document.querySelector('.user-greeting');
        
        if (this.user) {
            if (signInLink) signInLink.style.display = 'none';
            if (userGreeting) {
                userGreeting.textContent = `Hi, ${this.user.name}`;
                userGreeting.style.display = 'block';
            }
        } else {
            if (signInLink) signInLink.style.display = 'block';
            if (userGreeting) userGreeting.style.display = 'none';
        }
    }
};

export { userState }; 