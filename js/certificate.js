// Certificate Page JavaScript
let certificateData = null;
let currentLanguage = 'uz';
const directorNames = { uz: 'S.A.Mamadaliyev', ru: 'S.A.Mamadaliyev', en: 'S.A.Mamadaliyev' };

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
        // Redirect if no data
        window.location.href = 'index.html';
        return;
    }

    updateLanguage();
    loadCertificateData();
    generateQRCode();
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
    
    // Update recipient name
    const fullName = `${certificateData.visitorData.lastName} ${certificateData.visitorData.firstName}`;
    if (certificateData.visitorData.middleName) {
        fullName += ` ${certificateData.visitorData.middleName}`;
    }
    document.getElementById('recipientName').textContent = fullName;
    
    // Update director signature
    document.getElementById('directorSignature').textContent = directorNames[currentLanguage];
}

function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrCode');
    
    // Create verification URL with certificate data
    const verificationUrl = `${window.location.origin}${window.location.pathname.replace('certificate.html', 'verify.html')}?id=${certificateData?.certificateNumber || 'CERT-0000'}`;
    
    // Create QR code data - this will link to the verification page
    const verificationData = {
        certificateId: certificateData?.certificateNumber || 'CERT-0000',
        visitorName: certificateData?.visitorData?.lastName + ' ' + certificateData?.visitorData?.firstName,
        date: certificateData?.date || new Date().toLocaleDateString(),
        score: certificateData?.score || 0,
        totalQuestions: certificateData?.totalQuestions || 10,
        verificationUrl: verificationUrl
    };
    
    // For now, create a simple QR code representation
    // In production, you would use a QR code library like qrcode.js
    const qrCodeData = JSON.stringify(verificationData);
    
    // Create a simple visual representation of QR code
    qrCodeContainer.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                #000,
                #000 2px,
                transparent 2px,
                transparent 4px
            ),
            repeating-linear-gradient(
                90deg,
                #000,
                #000 2px,
                transparent 2px,
                transparent 4px
            );
            background-size: 8px 8px;
            border-radius: 4px;
            cursor: pointer;
            position: relative;
        " title="Scan to verify certificate">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2px;
                border-radius: 2px;
                font-size: 6px;
                color: #000;
                text-align: center;
                line-height: 1;
            ">QR</div>
        </div>
    `;
    
    // Add click functionality to simulate QR code scanning
    qrCodeContainer.addEventListener('click', function() {
        // For demo purposes, open verification page in new tab
        window.open(verificationUrl, '_blank');
    });
    
    // Store QR code data for verification
    localStorage.setItem('qrCodeData', qrCodeData);
    
    // Also store the verification URL for easy access
    localStorage.setItem('verificationUrl', verificationUrl);
}

function printCertificate() {
    // When printing, show QR code instead of signature
    const signatureArea = document.querySelector('.signature-area');
    const qrCode = document.getElementById('qrCode');
    
    // Hide signature and show QR code prominently
    signatureArea.style.display = 'none';
    qrCode.style.width = '120px';
    qrCode.style.height = '120px';
    qrCode.style.margin = '0 auto';
    qrCode.style.display = 'block';
    
    // Add print-specific styling
    qrCode.style.background = '#000';
    qrCode.style.border = '2px solid #000';
    
    // Trigger print
    window.print();
    
    // Restore original state after print
    setTimeout(() => {
        signatureArea.style.display = 'flex';
        qrCode.style.width = '80px';
        qrCode.style.height = '80px';
        qrCode.style.margin = '0';
        qrCode.style.background = '#f0f0f0';
        qrCode.style.border = '2px solid #ddd';
    }, 1000);
}

function backToQuiz() {
    window.location.href = 'quiz.html';
}

function startOver() {
    // Clear all stored data
    localStorage.removeItem('visitorData');
    localStorage.removeItem('certificateData');
    localStorage.removeItem('qrCodeData');
    
    // Redirect to start
    window.location.href = 'index.html';
}

function handleLogoError(img) {
    img.style.display = 'none';
    img.nextElementSibling.style.display = 'flex';
} 