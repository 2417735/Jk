// Get references to the DOM elements
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const logoutButton = document.getElementById('logout-button');

/**
 * Toggles the visibility of the login and dashboard views.
 * @param {boolean} showDashboard - True to show the dashboard, false to show the login view.
 */
function toggleViews(showDashboard) {
    if (showDashboard) {
        // Hide the login view
        loginView.classList.add('hidden');
        // Show the dashboard view
        dashboardView.classList.add('visible');
    } else {
        // Show the login view
        loginView.classList.remove('hidden');
        // Hide the dashboard view
        dashboardView.classList.remove('visible');
    }
}

// --- Event Listener for Login Form Submission ---
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission to handle it with JavaScript

        // In a real application, you would send user credentials (email, password)
        // to a backend server for authentication.
        // For this demonstration, we are simulating a successful login after a short delay.
        console.log('Simulating login...');

        // Simulate network request/processing delay
        setTimeout(() => {
            // After successful simulated login, transition to the dashboard view
            toggleViews(true);
            console.log('Login simulated successfully. Dashboard visible.');
        }, 500); // 500 milliseconds delay
    });
} else {
    console.error("Login form element not found!");
}


// --- Event Listener for Logout Button ---
if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        // In a real application, this would involve invalidating the user's session
        // or token on the server-side to truly log them out.
        // For this demonstration, we are simulating a logout and returning to the login view.
        console.log('Simulating logout...');

        // Simulate network request/processing delay for logout
        setTimeout(() => {
            // After successful simulated logout, transition back to the login view
            toggleViews(false);
            // Optionally clear the login form fields for a fresh start
            loginForm.reset();
            console.log('Logout simulated successfully. Login view visible.');
        }, 500); // 500 milliseconds delay
    });
} else {
    console.error("Logout button element not found!");
}


// --- Initial state setup on page load ---
// This ensures that when the page first loads, only the login form is visible.
window.addEventListener('load', () => {
    console.log('Page loaded. Setting initial view to login.');
    toggleViews(false); // Start with the login view
});
