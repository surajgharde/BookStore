document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('form');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Get error message elements for password fields
    const passwordError = passwordInput.nextElementSibling;
    const confirmPasswordError = confirmPasswordInput.nextElementSibling;
    
    // Create error message elements for other fields
    const firstNameError = createErrorMessageElement(firstNameInput);
    const lastNameError = createErrorMessageElement(lastNameInput);
    const emailError = createErrorMessageElement(emailInput);
    const phoneError = createErrorMessageElement(phoneInput);
    
    // Function to create and append error message element
    function createErrorMessageElement(inputElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        inputElement.parentNode.appendChild(errorDiv);
        return errorDiv;
    }
    
    // Function to show error message
    function showError(element, message) {
        element.style.display = 'block';
        element.textContent = message;
        element.previousElementSibling.style.borderColor = '#d32f2f';
    }
    
    // Function to hide error message
    function hideError(element) {
        element.style.display = 'none';
        element.previousElementSibling.style.borderColor = '#ddd';
    }
    
    // Validate name - should contain only alphabets and be at least 6 characters
    function validateName(input, errorElement) {
        const name = input.value.trim();
        const nameRegex = /^[A-Za-z\s]{6,}$/;
        
        if (!nameRegex.test(name)) {
            showError(errorElement, 'Name should contain only alphabets and be at least 6 characters long.');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    // Validate email - should follow standard pattern
    function validateEmail(input, errorElement) {
        const email = input.value.trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!emailRegex.test(email)) {
            showError(errorElement, 'Please enter a valid email address (name@domain.com).');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    // Validate password - should be at least 6 characters
    function validatePassword(input, errorElement) {
        const password = input.value;
        
        if (password.length < 6) {
            showError(errorElement, 'Password must be at least 6 characters long.');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    // Validate confirm password - should match password
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (password !== confirmPassword) {
            showError(confirmPasswordError, 'Passwords do not match.');
            return false;
        } else {
            hideError(confirmPasswordError);
            return true;
        }
    }
    
    // Validate phone number - should contain 10 digits only
    function validatePhone(input, errorElement) {
        const phone = input.value.trim();
        
        // Skip validation if the field is empty (since it's optional)
        if (phone === '') {
            hideError(errorElement);
            return true;
        }
        
        const phoneRegex = /^\d{10}$/;
        
        if (!phoneRegex.test(phone)) {
            showError(errorElement, 'Phone number should contain exactly 10 digits.');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    // Add input event listeners to provide real-time validation feedback
    firstNameInput.addEventListener('input', function() {
        validateName(firstNameInput, firstNameError);
    });
    
    lastNameInput.addEventListener('input', function() {
        validateName(lastNameInput, lastNameError);
    });
    
    emailInput.addEventListener('input', function() {
        validateEmail(emailInput, emailError);
    });
    
    phoneInput.addEventListener('input', function() {
        validatePhone(phoneInput, phoneError);
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword(passwordInput, passwordError);
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword();
        }
    });
    
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    // Form submission validation
    form.addEventListener('submit', function(event) {
        // Validate all fields
        const isFirstNameValid = validateName(firstNameInput, firstNameError);
        const isLastNameValid = validateName(lastNameInput, lastNameError);
        const isEmailValid = validateEmail(emailInput, emailError);
        const isPhoneValid = validatePhone(phoneInput, phoneError);
        const isPasswordValid = validatePassword(passwordInput, passwordError);
        const isConfirmPasswordValid = validateConfirmPassword();
        
        // Prevent form submission if any validation fails
        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid || 
            !isPasswordValid || !isConfirmPasswordValid) {
            event.preventDefault();
        }
    });
});