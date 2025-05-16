const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

console.log("JS Loaded");  

signUpButton.addEventListener('click', () => {
    console.log("Sign Up clicked");  
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    console.log("Sign In clicked");
    container.classList.remove("right-panel-active");
});