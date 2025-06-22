// Import Firebase modules (ensure these URLs are correct for the Canvas environment)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Get references to DOM elements
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const loginForm = document.getElementById('loginForm');
const logoutButton = document.getElementById('logout-button');
const userProfileName = document.querySelector('.user-name');
const userProfileFaculty = document.querySelector('.user-faculty');

// --- Firebase Initialization ---
let app;
let auth;

// Check if Firebase config is available from the environment
if (typeof __firebase_config !== 'undefined') {
    const firebaseConfig = JSON.parse(__firebase_config);
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("Firebase initialized.");
} else {
    console.error("Firebase configuration (__firebase_config) not found.");
    // Fallback or display error message to user
    alert("Application error: Firebase not configured. Please contact support.");
}

/**
 * Toggles the visibility of the login and dashboard views.
 * @param {boolean} showDashboard - True to show the dashboard, false to show the login view.
 */
function toggleViews(showDashboard) {
    if (showDashboard) {
        // Hide the login view with transition
        loginView.classList.add('hidden');
        // Show the dashboard view with transition
        dashboardView.classList.add('visible');
        console.log("Switched to Dashboard View.");
    } else {
        // Show the login view with transition
        loginView.classList.remove('hidden');
        // Hide the dashboard view with transition
        dashboardView.classList.remove('visible');
        console.log("Switched to Login View.");
    }
}

// --- Firebase Authentication State Observer ---
// Listen for authentication state changes (e.g., user logs in, logs out, session restores)
if (auth) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in.
            console.log("User is signed in:", user.email || user.uid);
            // You can update the profile name with the user's email if needed
            if (userProfileName) {
                userProfileName.textContent = user.email ? user.email.split('@')[0] : 'Lou'; // Display part of email or default Lou
            }
            // You might fetch additional user data from Firestore here if available
            toggleViews(true); // Show the dashboard
        } else {
            // User is signed out.
            console.log("User is signed out.");
            toggleViews(false); // Show the login form
            // Optionally clear the login form fields
            if (loginForm) {
                loginForm.reset();
            }
        }
    });

    // Attempt to sign in with custom token if available (for Canvas environment)
    // Or sign in anonymously if no token is provided.
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        try {
            await signInWithCustomToken(auth, __initial_auth_token);
            console.log("Signed in with custom token.");
        } catch (error) {
            console.error("Error signing in with custom token:", error);
            // Fallback to anonymous sign-in if custom token fails
            try {
                await signInAnonymously(auth);
                console.log("Signed in anonymously.");
            } catch (anonError) {
                console.error("Error signing in anonymously:", anonError);
                // Display error to user if no authentication method works
                alert("Authentication failed. Please try again later.");
            }
        }
    } else {
        // If no custom token is provided by the environment, try anonymous sign-in
        try {
            await signInAnonymously(auth);
            console.log("Signed in anonymously (no initial token).");
        } catch (error) {
            console.error("Error signing in anonymously:", error);
            alert("Authentication failed. Please try again later.");
        }
    }

} else {
    console.error("Firebase Auth not available. Cannot observe auth state.");
}


// --- Event Listener for Login Form Submission ---
if (loginForm && auth) {
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        // Basic validation (more robust validation should be done)
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            console.log(`Attempting to sign in user: ${email}`);
            // Use Firebase signInWithEmailAndPassword to authenticate
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in successfully with email/password.");
            // onAuthStateChanged will handle UI toggle on successful login
        } catch (error) {
            console.error("Error during sign in:", error.code, error.message);
            let errorMessage = "Sign-in failed. Please check your credentials.";
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = 'Invalid email or password.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'The email address is not valid.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'Your account has been disabled.';
                    break;
                default:
                    errorMessage = `Sign-in error: ${error.message}`;
                    break;
            }
            alert(errorMessage); // Use custom message box in a real app, not alert()
        }
    });
} else {
    console.error("Login form or Firebase Auth not available for submission listener.");
}

// --- Event Listener for Logout Button ---
if (logoutButton && auth) {
    logoutButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Prevent default link behavior

        try {
            console.log("Attempting to sign out user.");
            // Use Firebase signOut to log out the current user
            await signOut(auth);
            console.log("User signed out successfully.");
            // onAuthStateChanged will handle UI toggle on successful logout
        } catch (error) {
            console.error("Error during sign out:", error);
            alert("Logout failed. Please try again."); // Use custom message box
        }
    });
} else {
    console.error("Logout button or Firebase Auth not available for logout listener.");
}

// Initial UI state is managed by onAuthStateChanged.
// The toggleViews(false) at the end of the HTML <script> is removed
// because onAuthStateChanged handles the initial visibility after checking auth state.
