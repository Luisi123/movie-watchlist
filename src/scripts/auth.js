// Auth handling
export async function handleSignup(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:5002/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        if (response.ok) {
            alert('Registration successful! Please sign in.');
            const container = document.getElementById('container');
            if (container) {
                container.classList.remove('right-panel-active');
            }
        } else {
            const error = await response.text();
            alert('Registration failed: ' + error);
        }
    } catch (error) {
        alert('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
    }
}

export async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch('http://localhost:5002/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password')
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data
            const userData = {
                name: data.name,
                email: data.email
            };
            localStorage.setItem('user', JSON.stringify(userData));
            // Force a page reload to update the UI
            window.location.replace('/');
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
    }
} 