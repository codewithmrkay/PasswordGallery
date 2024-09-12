// Elements
// document.addEventListener('DOMContentLoaded', () => {
    const signupSection = document.getElementById("signup-section");
    const loginSection = document.getElementById("login-section");
    const welcomeSection = document.getElementById("welcome-section");
    
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    
    // Check if user is already signed up
    document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.getItem("userPassword")) {
            showLogin();
        } else {
            showSignup(); // If no user password, show signup
        }
    });
    
    // Sign Up Process
    signupBtn.addEventListener("click", function () {
        const luckyNumber = document.getElementById("luckyNumber").value;
        const favColor = document.getElementById("favColor").value.toUpperCase();
        const favLetter = document.getElementById("favLetter").value.toUpperCase();
    
        if (luckyNumber && favColor && favLetter) {
            const password = `${luckyNumber}-${favColor}-${favLetter}`;
            localStorage.setItem("userPassword", password);
            showLogin();
        } else {
            alert("Please fill all the fields to sign up!");
        }
    });
    
    // Login Process
    loginBtn.addEventListener("click", function () {
        const loginNumber = document.getElementById("loginNumber").value;
        const loginColor = document.getElementById("loginColor").value.toUpperCase();
        const loginLetter = document.getElementById("loginLetter").value.toUpperCase();
    
        const enteredPassword = `${loginNumber}-${loginColor}-${loginLetter}`;
        const savedPassword = localStorage.getItem("userPassword");
    
        if (enteredPassword === savedPassword) {
            showWelcome();
        } else {
            alert("Incorrect details. Please try again!");
        }
    });
    
    // Logout Process
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("userPassword"); // Remove saved password
        showSignup(); // Go back to sign-up screen when logged out
    });
    
    // Show Signup Screen
    function showSignup() {
        signupSection.style.display = "flex";
        loginSection.style.display = "none";
        welcomeSection.style.display = "none";
    }
    
    // Show Login Screen
    function showLogin() {
        signupSection.style.display = "none";
        loginSection.style.display = "block";
        welcomeSection.style.display = "none";
    }
    
    // Show Welcome Screen
    function showWelcome() {
        signupSection.style.display = "none";
        loginSection.style.display = "none";
        welcomeSection.style.display = "block";
    }
    // todo-------------------------------------------------after log in 
        const submitBtn = document.getElementById('submitBtn');
        const passwordList = document.getElementById('passwordList');
    
        // Add new topic and password
        submitBtn.addEventListener('click', () => {
            const newTopic = document.getElementById('newTopic').value.toUpperCase();
            const newPassword = document.getElementById('newPassword').value;
    
            if (newTopic && newPassword) {
                addNewEntry(newTopic, newPassword);
                savePassword(newTopic, newPassword);  // Save to localStorage
                document.getElementById('newTopic').value = '';  // Clear input
                document.getElementById('newPassword').value = '';  // Clear input
            } else {
                alert('Please fill both fields');
            }
        });
    
        // Function to add a new entry
        function addNewEntry(topic, password) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'password-item';
            
            // Add topic and password display
            const content = document.createElement('div');
            content.innerHTML = `<strong>Topic:</strong> ${topic} | <strong>Password:</strong> <span class="password">${password}</span>`;
            itemDiv.appendChild(content);
            
            // Add action buttons (Copy, Edit, Remove)
            const actions = document.createElement('div');
            actions.className = 'actions';
    
            // Copy button
            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy';
            copyBtn.addEventListener('click', () => copyPassword(password));
            actions.appendChild(copyBtn);
    
            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit');
            editBtn.addEventListener('click', () => editPassword(itemDiv, topic));
            actions.appendChild(editBtn);
    
            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove');
            removeBtn.addEventListener('click', () => removePassword(itemDiv, topic));
            actions.appendChild(removeBtn);
    
            itemDiv.appendChild(actions);
            passwordList.appendChild(itemDiv);
        }
    
        // Copy password to clipboard
        function copyPassword(password) {
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy: ', err);
            });
        }
    
        // Edit password
        function editPassword(itemDiv, topic) {
            const passwordSpan = itemDiv.querySelector('.password');
            const newPassword = prompt('Enter new password:', passwordSpan.textContent);
            if (newPassword) {
                passwordSpan.textContent = newPassword;
                updatePasswordInStorage(topic, newPassword);  // Update in localStorage
            }
        }
    
        // Remove password
        function removePassword(itemDiv, topic) {
            itemDiv.remove();
            removePasswordFromStorage(topic);  // Remove from localStorage
        }
    
        // Save passwords to localStorage
        function savePassword(topic, password) {
            let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            passwords.push({ topic, password });
            localStorage.setItem('passwords', JSON.stringify(passwords));
        }
    
        // Update password in localStorage
        function updatePasswordInStorage(topic, newPassword) {
            let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            passwords = passwords.map(entry => entry.topic === topic ? { topic, password: newPassword } : entry);
            localStorage.setItem('passwords', JSON.stringify(passwords));
        }
    
        // Remove password from localStorage
        function removePasswordFromStorage(topic) {
            let passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            passwords = passwords.filter(entry => entry.topic !== topic);
            localStorage.setItem('passwords', JSON.stringify(passwords));
        }
    
        // Load saved passwords on login
        function loadSavedPasswords() {
            const passwords = JSON.parse(localStorage.getItem('passwords')) || [];
            passwords.forEach(entry => addNewEntry(entry.topic, entry.password));
        }
    
        // Simulate login check and load passwords
        function checkLogin() {
            // Assume user is logged in (replace this with actual login check logic)
            const isLoggedIn = true;
            if (isLoggedIn) {
                loadSavedPasswords();  // Load passwords on successful login
            }
        }
    
        // Call login check function when the page loads
        checkLogin();
    