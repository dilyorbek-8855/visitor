// Quiz Page JavaScript
let currentLanguage = 'uz';
let currentQuestion = 1;
let totalQuestions = 10;
let answers = Array(10).fill(null);
let visitorData = null;
let quizCompleted = false;
let userScore = 0;
let passingScore = 8;
let showCertificate = false;

// Correct answers (0-based index) - Updated for new R&D center questions
const correctAnswers = [2, 3, 0, 1, 1, 3, 2, 2, 1, 3];

// Quiz questions in all languages (Updated R&D center questions)
const questions = {
    uz: [
        {
            question: 'R&D markazining hozirdagi rahbari kim?',
            options: ['Bahtiyor Uraymov', 'Timur Hamrayev', 'Saidbek Mamadaliyev', 'Fahriddin Otaxonov']
        },
        {
            question: 'R&D center nechanchi yilda tashkil etilgan?',
            options: ['2024-yil', '2022-yil', '2023-yil', '2025-yil']
        },
        {
            question: 'R&D center nechta yo\'nalish bo\'yicha faoliyat olib boradi?',
            options: ['4', '2', '3', '5']
        },
        {
            question: 'R&D centerda faoliyat olib bormaydigan yo\'nalishni belgilang',
            options: ['Sanoat tizimlari muhandisligi', 'Texnologik qo\'llab-quvvatlash muhandisligi', 'Qadoqalsh muhandisligi', 'Qolipsozlik muhandisligi']
        },
        {
            question: 'Markazda nechta muhandis va rahbarlar faoliyat olib boradi?',
            options: ['127', '120', '95', '125']
        },
        {
            question: 'Markazning O\'zbek modelini ishlab chiqarish rejasi nechanchi yilgacha maqsad qlib olingan?',
            options: ['2026-yil', '2027-yil', '2029-yil', '2030-yil']
        },
        {
            question: 'Markaz qaysi horiiy kompaniyalar bilan hamkorlikni yo\'lga qo\'ygan?',
            options: ['Alfa', 'Betta', 'Gamma', 'Delta']
        },
        {
            question: 'Qolipsozlik muhandisligi bo\'limi asosan qaysi davlat mutahassislari bilan tajrib almashadi?',
            options: ['Qozoqiston', 'Turkiya', 'Italiya', 'Rossiya']
        },
        {
            question: 'Xorijiy va mahalliy narxlarni solishtirish orqali Korxonaga foyda keltiruvchi bo\'lim qaysi?',
            options: ['Qolipsozlik bo\'limi', 'Benchmarking bo\'limi', 'Cost engenireng bo\'limi', 'Taqqoslov va Taxlil bo\'limi']
        },
        {
            question: 'Intellektual boshqaruv texnologiyalari bo\'linmasi qaysi boshqarma tarkibiga kiradi?',
            options: ['Tizimlarni rivojlantirish', 'Benchmarking', 'Ilmiy-texnik tadqiqotlar', 'Sanoat tizimlari muhandisligi']
        }
    ],
    ru: [
        {
            question: 'Кто является нынешним руководителем R&D центра?',
            options: ['Бахтиёр Ураймов', 'Тимур Хамраев', 'Саидбек Мамадалиев', 'Фахриддин Отахонов']
        },
        {
            question: 'В каком году был создан R&D центр?',
            options: ['2024 год', '2022 год', '2023 год', '2025 год']
        },
        {
            question: 'По скольким направлениям работает R&D центр?',
            options: ['4', '2', '3', '5']
        },
        {
            question: 'Укажите направление, по которому R&D центр не ведет деятельность',
            options: ['Инженерия промышленных систем', 'Инженерия технологической поддержки', 'Инженерия упаковки', 'Инженерия литейного производства']
        },
        {
            question: 'Сколько инженеров и руководителей работает в центре?',
            options: ['127', '120', '95', '125']
        },
        {
            question: 'К какому году планируется производство узбекской модели в центре?',
            options: ['2026 год', '2027 год', '2029 год', '2030 год']
        },
        {
            question: 'С какими зарубежными компаниями центр наладил сотрудничество?',
            options: ['Альфа', 'Бетта', 'Гамма', 'Дельта']
        },
        {
            question: 'Специалистами какой страны в основном обменивается отдел инженерии литейного производства?',
            options: ['Казахстан', 'Турция', 'Италия', 'Россия']
        },
        {
            question: 'Какой отдел приносит прибыль предприятию путем сравнения зарубежных и местных цен?',
            options: ['Отдел литейного производства', 'Отдел бенчмаркинга', 'Отдел cost engineering', 'Отдел анализа и оценки']
        },
        {
            question: 'В состав какого управления входит отдел интеллектуальных технологий управления?',
            options: ['Развитие систем', 'Бенчмаркинг', 'Научно-технические исследования', 'Инженерия промышленных систем']
        }
    ],
    en: [
        {
            question: 'Who is the current head of the R&D center?',
            options: ['Bahtiyor Uraymov', 'Timur Hamrayev', 'Saidbek Mamadaliyev', 'Fahriddin Otaxonov']
        },
        {
            question: 'In which year was the R&D center established?',
            options: ['2024', '2022', '2023', '2025']
        },
        {
            question: 'How many directions does the R&D center operate in?',
            options: ['4', '2', '3', '5']
        },
        {
            question: 'Identify the direction in which the R&D center does not operate',
            options: ['Industrial Systems Engineering', 'Technological Support Engineering', 'Packaging Engineering', 'Foundry Engineering']
        },
        {
            question: 'How many engineers and managers work in the center?',
            options: ['127', '120', '95', '125']
        },
        {
            question: 'By which year is the production of the Uzbek model planned in the center?',
            options: ['2026', '2027', '2029', '2030']
        },
        {
            question: 'With which foreign companies has the center established cooperation?',
            options: ['Alpha', 'Beta', 'Gamma', 'Delta']
        },
        {
            question: 'With specialists from which country does the Foundry Engineering department mainly exchange experience?',
            options: ['Kazakhstan', 'Turkey', 'Italy', 'Russia']
        },
        {
            question: 'Which department brings profit to the enterprise by comparing foreign and local prices?',
            options: ['Foundry Department', 'Benchmarking Department', 'Cost Engineering Department', 'Analysis and Assessment Department']
        },
        {
            question: 'Which management does the Intelligent Control Technologies division belong to?',
            options: ['Systems Development', 'Benchmarking', 'Scientific and Technical Research', 'Industrial Systems Engineering']
        }
    ]
};

// Initialize the quiz page
document.addEventListener('DOMContentLoaded', function() {
    initializeQuizPage();
});

function initializeQuizPage() {
    // Load visitor data from localStorage
    const storedData = localStorage.getItem('visitorData');
    if (storedData) {
        visitorData = JSON.parse(storedData);
        currentLanguage = visitorData.language || 'uz';
    }

    // Set up language selector
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateLanguage();
        loadQuestion();
    });

    // Set up navigation buttons
    document.getElementById('prevBtn').addEventListener('click', previousQuestion);
    document.getElementById('nextBtn').addEventListener('click', nextQuestion);
    document.getElementById('finishBtn').addEventListener('click', finishQuiz);

    // Set up modal buttons
    document.getElementById('viewCertificateBtn').addEventListener('click', viewCertificate);
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    document.getElementById('restartBtn2').addEventListener('click', restartQuiz);

    // Initialize
    updateLanguage();
    loadQuestion();
}

function updateLanguage() {
    const lang = translations[currentLanguage];
    
    // Update test info on left panel
    document.getElementById('testTitle').textContent = lang.testTitle;
    document.getElementById('testDescription').textContent = lang.testDescription;
    document.getElementById('testInstructions').textContent = lang.testInstructions;
    document.getElementById('encouragement').textContent = lang.encouragement;
    
    // Update navigation buttons
    document.getElementById('prevBtn').textContent = lang.previous;
    document.getElementById('nextBtn').textContent = lang.next;
    document.getElementById('finishBtn').textContent = lang.finish;
    
    // Update modal content
    document.getElementById('completionTitle').textContent = lang.completionTitle;
    document.getElementById('completionMessage').textContent = lang.completionMessage;
    document.getElementById('scoreLabel').textContent = lang.certificateScore;
    document.getElementById('thankYouMessage').textContent = lang.thankYou;
    document.getElementById('restartText').textContent = lang.restart;
    document.getElementById('restartText2').textContent = lang.restart;
    document.getElementById('viewCertificateText').textContent = lang.viewCertificate;
    document.getElementById('certificateTitle').textContent = lang.certificateTitle;
    document.getElementById('certificateMessage').textContent = lang.certificateMessage;
    document.getElementById('certificateScoreLabel').textContent = lang.certificateScore;
    document.getElementById('certificateAwarded').textContent = lang.certificateAwarded;
}

function getCurrentQuestion() {
    return questions[currentLanguage][currentQuestion - 1];
}

function loadQuestion() {
    const question = getCurrentQuestion();
    
    // Update progress
    updateProgress();
    
    // Update question number and text
    document.getElementById('questionNumber').textContent = currentQuestion + '. ';
    document.getElementById('questionText').textContent = question.question;
    
    // Load answer options with radio buttons
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = question.options.map((option, index) => `
        <div class="answer-option">
            <input 
                type="radio" 
                id="q${currentQuestion}_${index}"
                name="question_${currentQuestion}"
                value="${index}"
                ${answers[currentQuestion - 1] === index ? 'checked' : ''}
                class="answer-input"
            >
            <label for="q${currentQuestion}_${index}" class="answer-label">
                ${option}
            </label>
        </div>
    `).join('');
    
    // Add event listeners to radio buttons
    const radioButtons = answersContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            answers[currentQuestion - 1] = parseInt(this.value);
            updateNavigationButtons();
        });
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function updateProgress() {
    const progress = ((currentQuestion - 1) / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressText').textContent = Math.round(progress) + ' %';
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    // Show/hide previous button - always enabled, navigates to index on first question
    prevBtn.disabled = false;
    
    // Show/hide next/finish button
    if (currentQuestion === totalQuestions) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'block';
        finishBtn.disabled = answers[currentQuestion - 1] === null;
    } else {
        nextBtn.style.display = 'block';
        finishBtn.style.display = 'none';
        nextBtn.disabled = answers[currentQuestion - 1] === null;
    }
}

function previousQuestion() {
    if (currentQuestion === 1) {
        // Navigate back to index page
        window.location.href = 'index.html';
    } else {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions && answers[currentQuestion - 1] !== null) {
        currentQuestion++;
        loadQuestion();
    }
}

function finishQuiz() {
    if (answers[currentQuestion - 1] !== null) {
        calculateScore();
        quizCompleted = true;
        showCertificate = userScore >= passingScore;
        showResults();
    }
}

function calculateScore() {
    userScore = 0;
    for (let i = 0; i < totalQuestions; i++) {
        if (answers[i] === correctAnswers[i]) {
            userScore++;
        }
    }
}

function showResults() {
    const quizContent = document.getElementById('quizContent');
    const quizCompletion = document.getElementById('quizCompletion');
    const certificateModal = document.getElementById('certificateModal');
    const regularModal = document.getElementById('regularModal');
    
    // Hide quiz content and show completion
    quizContent.style.display = 'none';
    quizCompletion.style.display = 'flex';
    
    if (showCertificate) {
        // Show certificate modal
        certificateModal.style.display = 'block';
        regularModal.style.display = 'none';
        document.getElementById('certificateScoreValue').textContent = `${userScore}/${totalQuestions}`;
        
        // Store certificate data
        const certificateData = {
            visitorData: visitorData,
            score: userScore,
            totalQuestions: totalQuestions,
            language: currentLanguage,
            certificateNumber: generateCertificateNumber(),
            date: new Date().toLocaleDateString()
        };
        localStorage.setItem('certificateData', JSON.stringify(certificateData));
    } else {
        // Show regular completion modal
        certificateModal.style.display = 'none';
        regularModal.style.display = 'block';
        document.getElementById('scoreValue').textContent = `${userScore}/${totalQuestions}`;
    }
}

function generateCertificateNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CERT-${year}${month}${day}-${random}`;
}

function viewCertificate() {
    window.location.href = 'certificate.html';
}

function restartQuiz() {
    // Reset quiz state
    currentQuestion = 1;
    answers = Array(10).fill(null);
    quizCompleted = false;
    userScore = 0;
    showCertificate = false;
    
    // Show quiz content and hide completion
    document.getElementById('quizContent').style.display = 'flex';
    document.getElementById('quizCompletion').style.display = 'none';
    
    // Reload first question
    loadQuestion();
} 