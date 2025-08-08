// Welcome Page JavaScript
let currentLanguage = 'uz';
let directorImage = 'images/director.png';

// Director names for different languages
const directorNames = {
    uz: 'Yanush Kovach',
    ru: 'Janos Kovacs',
    en: 'Janos Kovacs'
};

// Initialize the welcome page
document.addEventListener('DOMContentLoaded', function() {
    initializeWelcomePage();
});

function initializeWelcomePage() {
    // Set up language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
    });

    // Set up form submission
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', handleFormSubmission);

    // Initialize
    updateLanguage();
}

function getDirectorName() {
    return directorNames[currentLanguage];
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update director info
    document.getElementById('directorName').textContent = getDirectorName();
    document.getElementById('directorTitle').textContent = lang.directorTitle;
    document.getElementById('directorSignature').textContent = getDirectorName();
    
    // Update welcome messages
    document.getElementById('welcomeMessage').textContent = lang.welcomeMessage;
    document.getElementById('requestMessage').textContent = lang.requestMessage;
    document.getElementById('thankYouMessage').textContent = lang.thankYouMessage;
    document.getElementById('sincerely').textContent = lang.sincerely;
    
    // Update form labels
    document.getElementById('lastNameLabel').textContent = lang.lastName + ' *';
    document.getElementById('firstNameLabel').textContent = lang.firstName + ' *';
    document.getElementById('middleNameLabel').textContent = lang.middleName;
    document.getElementById('submitBtn').textContent = lang.enterTest;
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        lastName: document.getElementById('lastName').value.trim(),
        firstName: document.getElementById('firstName').value.trim(),
        middleName: document.getElementById('middleName').value.trim(),
        language: currentLanguage
    };
    
    // Validate required fields
    if (!formData.lastName || !formData.firstName) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Store visitor data in localStorage
    localStorage.setItem('visitorData', JSON.stringify(formData));
    
    // Navigate to quiz page
    window.location.href = 'quiz.html';
}

function handleImageError(img) {
    // If image fails to load, replace with placeholder
    img.style.display = 'none';
    const initials = currentLanguage === 'uz' ? 'YK' : 'JK';
    img.parentElement.innerHTML = `
        <div class="profile-pic-placeholder">
            <span class="profile-initials">${initials}</span>
        </div>
    `;
}

// Add CSS for placeholder
const style = document.createElement('style');
style.textContent = `
    .profile-pic-placeholder {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid rgba(255, 255, 255, 0.3);
        margin: 0 auto;
    }
    
    .profile-initials {
        font-size: 36px;
        font-weight: bold;
        color: white;
    }
`;
document.head.appendChild(style); 