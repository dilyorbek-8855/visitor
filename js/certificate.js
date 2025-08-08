// Certificate Page JavaScript
let certificateData = null;
let currentLanguage = 'uz';

// Director names for different languages
const directorNames = {
    uz: 'Yanush Kovach',
    ru: 'Janos Kovacs',
    en: 'Janos Kovacs'
};

// Initialize the certificate page
document.addEventListener('DOMContentLoaded', function() {
    initializeCertificatePage();
});

function initializeCertificatePage() {
    // Load certificate data from localStorage
    const storedData = localStorage.getItem('certificateData');
    if (storedData) {
        certificateData = JSON.parse(storedData);
        currentLanguage = certificateData.language || 'uz';
    } else {
        // Redirect to index if no certificate data
        window.location.href = 'index.html';
        return;
    }

    // Initialize
    updateLanguage();
    loadCertificateData();
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update button texts
    document.getElementById('printCertificateText').textContent = lang.printCertificate;
    document.getElementById('backToQuizText').textContent = lang.backToQuiz;
    document.getElementById('startOverText').textContent = lang.startOver;
}

function loadCertificateData() {
    if (!certificateData) return;

    // Load visitor name
    const firstName = certificateData.visitorData?.firstName || '';
    const lastName = certificateData.visitorData?.lastName || '';
    const visitorName = `${firstName} ${lastName}`.trim().toUpperCase() || 'VISITOR';
    document.getElementById('recipientName').textContent = visitorName;

    // Load score data
    const score = certificateData.score || 0;
    const totalQuestions = certificateData.totalQuestions || 10;
    const scorePercentage = Math.round((score / totalQuestions) * 100);
    document.getElementById('scoreBadge').textContent = `Natija: ${score}/${totalQuestions} (${scorePercentage}%)`;

    // Load certificate number
    const certificateNumber = certificateData.certificateNumber || generateCertificateNumber();
    const currentYear = new Date().getFullYear();
    document.getElementById('certificateNumber').textContent = `${currentYear} yil Berildi: R&D Center: № ${certificateNumber}`;

    // Load director name
    const directorName = directorNames[currentLanguage];
    document.getElementById('directorName').textContent = directorName;

    // Load current date
    const currentDate = certificateData.date || new Date().toLocaleDateString();
    document.getElementById('currentDate').textContent = currentDate;
}

function generateCertificateNumber() {
    return String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0');
}

function handleLogoError(img) {
    // Replace with placeholder if logo fails to load
    img.style.display = 'none';
    const placeholder = img.parentElement.querySelector('.logo-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

function printCertificate() {
    window.print();
}

function backToQuiz() {
    // Navigate back to quiz page
    window.location.href = 'quiz.html';
}

function startOver() {
    // Clear all data and start over
    localStorage.removeItem('visitorData');
    localStorage.removeItem('certificateData');
    window.location.href = 'index.html';
} 