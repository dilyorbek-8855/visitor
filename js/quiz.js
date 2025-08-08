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

// Correct answers (0-based index)
const correctAnswers = [3, 2, 1, 2, 1, 2, 1, 1, 2, 3];

// Quiz questions in all languages (exact from Vue.js template)
const questions = {
    uz: [
        {
            question: '"UzAutoMotors" AJ korxonasi (avvalgi nomi GM Uzbekistan) qachon tashkil topgan?',
            options: ['1995-yil 18-iyun', '1996-yil 19-iyun', '1996-yil 19-iyul', '1995-yil 19-iyul']
        },
        {
            question: 'Uz-DaewooAuto kompaniyasi qaysi mamlakat bilan hamkorlikda tashkil etildi?',
            options: ['Qozog\'iston', 'Rossiya', 'Koreya', 'O\'zbekiston']
        },
        {
            question: 'UzAuto Motors qaysi yilda yangi strategiyani qabul qildi?',
            options: ['2018-yil', '2019-yil', '2020-yil', '2021-yil']
        },
        {
            question: 'Kompaniyaning asosiy missiyasi nima?',
            options: ['Foyda olish', 'Avtomobil ishlab chiqarish', 'Mijozlarni qondirish', 'Eksport qilish']
        },
        {
            question: 'UzAuto Academy nechta o\'quv dasturiga ega?',
            options: ['5 ta', '7 ta', '10 ta', '12 ta']
        },
        {
            question: 'Kompaniyaning yillik ishlab chiqarish quvvati necha dona?',
            options: ['50,000 dona', '75,000 dona', '100,000 dona', '125,000 dona']
        },
        {
            question: 'UzAuto Motors nechta mamlakatga eksport qiladi?',
            options: ['15 ta', '20 ta', '25 ta', '30 ta']
        },
        {
            question: 'Kompaniyaning eng mashhur modeli qaysi?',
            options: ['Chevrolet Spark', 'Chevrolet Cobalt', 'Chevrolet Malibu', 'Chevrolet Tracker']
        },
        {
            question: 'UzAuto Motors nechta xodimga ish beradi?',
            options: ['5,000 ta', '7,500 ta', '10,000 ta', '12,500 ta']
        },
        {
            question: 'Kompaniyaning kelajakdagi rejasi nima?',
            options: ['Yangi zavod qurish', 'Elektr avtomobillari', 'Yangi modellar', 'Barchasi']
        }
    ],
    ru: [
        {
            question: 'Когда было создано СП "UzAutoMotors" (бывшее GM Uzbekistan)?',
            options: ['18 июня 1995', '19 июня 1996', '19 июля 1996', '19 июля 1995']
        },
        {
            question: 'С какой страной создана компания Uz-DaewooAuto?',
            options: ['Казахстан', 'Россия', 'Корея', 'Узбекистан']
        },
        {
            question: 'В каком году UzAuto Motors приняла новую стратегию?',
            options: ['2018 год', '2019 год', '2020 год', '2021 год']
        },
        {
            question: 'Какова основная миссия компании?',
            options: ['Получение прибыли', 'Производство автомобилей', 'Удовлетворение клиентов', 'Экспорт']
        },
        {
            question: 'Сколько учебных программ имеет UzAuto Academy?',
            options: ['5', '7', '10', '12']
        },
        {
            question: 'Какова годовая производственная мощность компании?',
            options: ['50,000 единиц', '75,000 единиц', '100,000 единиц', '125,000 единиц']
        },
        {
            question: 'В сколько стран экспортирует UzAuto Motors?',
            options: ['15 стран', '20 стран', '25 стран', '30 стран']
        },
        {
            question: 'Какая самая популярная модель компании?',
            options: ['Chevrolet Spark', 'Chevrolet Cobalt', 'Chevrolet Malibu', 'Chevrolet Tracker']
        },
        {
            question: 'Сколько сотрудников работает в UzAuto Motors?',
            options: ['5,000', '7,500', '10,000', '12,500']
        },
        {
            question: 'Каковы планы компании на будущее?',
            options: ['Строительство нового завода', 'Электромобили', 'Новые модели', 'Все перечисленное']
        }
    ],
    en: [
        {
            question: 'When was "UzAutoMotors" JV (formerly GM Uzbekistan) established?',
            options: ['June 18, 1995', 'June 19, 1996', 'July 19, 1996', 'July 19, 1995']
        },
        {
            question: 'With which country was Uz-DaewooAuto company established?',
            options: ['Kazakhstan', 'Russia', 'Korea', 'Uzbekistan']
        },
        {
            question: 'In which year did UzAuto Motors adopt a new strategy?',
            options: ['2018', '2019', '2020', '2021']
        },
        {
            question: 'What is the main mission of the company?',
            options: ['Profit making', 'Car manufacturing', 'Customer satisfaction', 'Export']
        },
        {
            question: 'How many training programs does UzAuto Academy have?',
            options: ['5', '7', '10', '12']
        },
        {
            question: 'What is the annual production capacity of the company?',
            options: ['50,000 units', '75,000 units', '100,000 units', '125,000 units']
        },
        {
            question: 'To how many countries does UzAuto Motors export?',
            options: ['15 countries', '20 countries', '25 countries', '30 countries']
        },
        {
            question: 'What is the most popular model of the company?',
            options: ['Chevrolet Spark', 'Chevrolet Cobalt', 'Chevrolet Malibu', 'Chevrolet Tracker']
        },
        {
            question: 'How many employees work at UzAuto Motors?',
            options: ['5,000', '7,500', '10,000', '12,500']
        },
        {
            question: 'What are the company\'s future plans?',
            options: ['Building new factory', 'Electric vehicles', 'New models', 'All of the above']
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