import { e as createComponent, r as renderTemplate, n as renderHead } from '../chunks/astro/server_ojrlXbxq.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-sgjovbj7> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sign Up - Movie Watchlist</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">', `</head> <body data-astro-cid-sgjovbj7> <h2 data-astro-cid-sgjovbj7>Movie Watchlist</h2> <div class="container" id="container" data-astro-cid-sgjovbj7> <div class="form-container sign-up-container" data-astro-cid-sgjovbj7> <form id="signupForm" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Create Account</h1> <span data-astro-cid-sgjovbj7>or use your email for registration</span> <input type="text" name="name" placeholder="Name" required data-astro-cid-sgjovbj7> <input type="email" name="email" placeholder="Email" required data-astro-cid-sgjovbj7> <input type="password" name="password" placeholder="Password" required data-astro-cid-sgjovbj7> <button type="submit" data-astro-cid-sgjovbj7>Sign Up</button> <div id="signupError" class="error-message" style="display: none;" data-astro-cid-sgjovbj7></div> </form> </div> <div class="form-container sign-in-container" data-astro-cid-sgjovbj7> <form id="signinForm" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Sign in</h1> <span data-astro-cid-sgjovbj7>or use your account</span> <input type="email" name="email" placeholder="Email" required data-astro-cid-sgjovbj7> <input type="password" name="password" placeholder="Password" required data-astro-cid-sgjovbj7> <a href="#" data-astro-cid-sgjovbj7>Forgot your password?</a> <button type="submit" data-astro-cid-sgjovbj7>Sign In</button> <div id="signinError" class="error-message" style="display: none;" data-astro-cid-sgjovbj7></div> </form> </div> <div class="overlay-container" data-astro-cid-sgjovbj7> <div class="overlay" data-astro-cid-sgjovbj7> <div class="overlay-panel overlay-left" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Welcome Back!</h1> <p data-astro-cid-sgjovbj7>To keep connected with us please login with your personal info</p> <button class="ghost" id="signIn" data-astro-cid-sgjovbj7>Sign In</button> </div> <div class="overlay-panel overlay-right" data-astro-cid-sgjovbj7> <h1 data-astro-cid-sgjovbj7>Hello, Friend!</h1> <p data-astro-cid-sgjovbj7>Enter your personal details and start your movie journey with us</p> <button class="ghost" id="signUp" data-astro-cid-sgjovbj7>Sign Up</button> </div> </div> </div> </div>  <script type="module">
    import { register, login } from '/src/services/auth.js';

    document.addEventListener('DOMContentLoaded', () => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        const signupForm = document.getElementById('signupForm');
        const signinForm = document.getElementById('signinForm');
        const signupError = document.getElementById('signupError');
        const signinError = document.getElementById('signinError');

        console.log('DOM Content Loaded');

        if (!signUpButton || !signInButton || !container || !signupForm || !signinForm) {
            console.error('Required elements not found');
            return;
        }
        console.log('Required elements found');

        signUpButton.addEventListener('click', () => {
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });

        // Handle signup form submission
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Signup form submit event triggered');
            const formData = new FormData(signupForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            console.log('Form data collected:', { name, email, password });

            try {
                console.log('Calling register function...');
                const submitButton = signupForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Signing up...';

                await register(name, email, password);
                
                console.log('Register function succeeded');
                if (signupError) signupError.style.display = 'none';
                alert('Registration successful! Please sign in.');
                container.classList.remove('right-panel-active');
                signupForm.reset();
            } catch (error) {
                console.error('Registration error:', error);
                if (signupError) {
                    signupError.textContent = error instanceof Error ? error.message : 'Registration failed';
                    signupError.style.display = 'block';
                }
            } finally {
                console.log('Signup submission process finished');
                const submitButton = signupForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Sign Up';
            }
        });

        // Handle signin form submission
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Signin form submit event triggered');
            const formData = new FormData(signinForm);
            const email = formData.get('email');
            const password = formData.get('password');
            console.log('Form data collected:', { email, password });

            try {
                console.log('Calling login function...');
                const submitButton = signinForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Signing in...';

                await login(email, password);
                
                console.log('Login function succeeded');
                if (signinError) signinError.style.display = 'none';
                window.location.href = '/';
            } catch (error) {
                console.error('Login error:', error);
                if (signinError) {
                    signinError.textContent = error instanceof Error ? error.message : 'Login failed';
                    signinError.style.display = 'block';
                }
            } finally {
                console.log('Signin submission process finished');
                const submitButton = signinForm.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Sign In';
            }
        });
    });
<\/script></body></html>`])), renderHead());
}, "C:/Users/USER/movie-watchlist/src/pages/signup.astro", void 0);

const $$file = "C:/Users/USER/movie-watchlist/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Signup,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
