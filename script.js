// Function to generate a password based on the selected algorithm
function generatePassword(algorithm) {
    let password = '';
    switch (algorithm) {
        case 1:
            password = generateAlgorithm1Password();
            break;
        case 2:
            password = generateAlgorithm2Password();
            break;
        case 3:
            password = generateAlgorithm3Password();
            break;
        case 4:
            password = generateAlgorithm4Password();
            break;
        default:
            password = 'Invalid algorithm';
    }
    document.getElementById('generated-password').value = password;
}

// Algorithm 1: Basic alphanumeric password
function generateAlgorithm1Password() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return generateRandomPassword(chars, 12);
}

// Algorithm 2: Alphanumeric with symbols
function generateAlgorithm2Password() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?';
    return generateRandomPassword(chars, 16);
}

// Algorithm 3: Strong password with upper, lower, digits, and symbols
function generateAlgorithm3Password() {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';
    return generateCustomPassword(upper, lower, digits, symbols, 20);
}

// Algorithm 4: Password with a mix of everything and a specific length
function generateAlgorithm4Password() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}<>?';
    return generateRandomPassword(chars, 25);
}

// Function to generate a random password given a set of characters and length
function generateRandomPassword(characters, length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Function to generate a custom password ensuring at least one of each type
function generateCustomPassword(upper, lower, digits, symbols, length) {
    let result = '';
    const allChars = upper + lower + digits + symbols;

    // Ensure at least one from each category
    result += upper.charAt(Math.floor(Math.random() * upper.length));
    result += lower.charAt(Math.floor(Math.random() * lower.length));
    result += digits.charAt(Math.floor(Math.random() * digits.length));
    result += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the rest with random characters
    for (let i = 4; i < length; i++) {
        result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return shufflePassword(result);
}

// Helper function to shuffle the password for randomness
function shufflePassword(password) {
    const array = password.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

// Function to clear the generated password field
function clearGeneratedPassword() {
    document.getElementById('generated-password').value = '';
}

// Function to clear the password checker input and strength display
function clearPassword() {
    document.getElementById('user-password').value = '';
    document.getElementById('password-strength').textContent = 'Password Strength: ';
}

// Function to copy the generated password to the clipboard
function copyToClipboard() {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
    // alert('Password copied to clipboard!');
}

// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById('user-password').value;
    const strength = calculatePasswordStrength(password);
    const strengthDisplay = document.getElementById('password-strength');

    if (strength < 3) {
        strengthDisplay.textContent = 'Password Strength: Weak';
        strengthDisplay.className = 'weak';
    } else if (strength < 5) {
        strengthDisplay.textContent = 'Password Strength: Moderate';
        strengthDisplay.className = 'moderate';
    } else {
        strengthDisplay.textContent = 'Password Strength: Strong';
        strengthDisplay.className = 'strong';
    }
}

// Dummy password strength calculation function
function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length > 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
}
