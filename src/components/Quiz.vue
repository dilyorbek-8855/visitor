<template>
  <div class="quiz-page">
    <div class="layout">
      <!-- Left Blue Panel -->
      <div class="left-panel">
        <div class="building-image">
          <img src="/building.jpg" alt="UzAuto Academy" class="building-pic">
        </div>
        
        <h2 class="quiz-title">{{ translations[currentLang].testTitle }}</h2>
        <p class="quiz-description">{{ translations[currentLang].testDescription }}</p>
        <p class="quiz-instructions">{{ translations[currentLang].testInstructions }}</p>
        <p class="quiz-encouragement">{{ translations[currentLang].encouragement }}</p>
        
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-text">{{ Math.round(((currentQuestion - 1) / totalQuestions) * 100) }} %</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: ((currentQuestion - 1) / totalQuestions) * 100 + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Right White Panel -->
      <div class="right-panel">
        <!-- Language Selector -->
        <div class="language-selector">
          <select v-model="currentLang" class="lang-select">
            <option value="uz">O'z</option>
            <option value="ru">Ру</option>
            <option value="en">En</option>
          </select>
        </div>

        <!-- Company Logo -->
        <div class="company-image">
          <img src="/logo.png" alt="Company Logo" class="company-logo">
        </div>

        <!-- Quiz Content -->
        <div class="quiz-content" v-if="!quizCompleted">
          <!-- Question -->
          <div class="question-container">
            <h3 class="question-number">{{ currentQuestion }}. </h3>
            <h3 class="question-text">{{ getCurrentQuestion().question }}</h3>
          </div>

          <!-- Answer Options -->
          <div class="answers-container">
            <div 
              v-for="(option, index) in getCurrentQuestion().options" 
              :key="index"
              class="answer-option"
            >
              <input 
                type="radio" 
                :id="`q${currentQuestion}_${index}`"
                :name="`question_${currentQuestion}`"
                :value="index"
                v-model="answers[currentQuestion - 1]"
                class="answer-input"
              >
              <label :for="`q${currentQuestion}_${index}`" class="answer-label">
                {{ option }}
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="navigation-buttons">
            <button 
              @click="previousQuestion" 
              :disabled="currentQuestion === 1"
              class="nav-btn prev-btn"
            >
              {{ translations[currentLang].previous }}
            </button>
            
            <button 
              @click="nextQuestion" 
              v-if="currentQuestion < totalQuestions"
              :disabled="answers[currentQuestion - 1] === null"
              class="nav-btn next-btn"
            >
              {{ translations[currentLang].next }}
            </button>
            
            <button 
              @click="finishQuiz" 
              v-if="currentQuestion === totalQuestions"
              :disabled="answers[currentQuestion - 1] === null"
              class="nav-btn finish-btn"
            >
              {{ translations[currentLang].finish }}
            </button>
          </div>
        </div>

        <!-- Quiz Completion -->
        <div class="quiz-completion" v-if="quizCompleted">
          <!-- Certificate Modal (for passing score) -->
          <div v-if="showCertificate" class="completion-modal certificate-modal">
            <h2>🎉 {{ translations[currentLang].certificateTitle }}</h2>
            <p>{{ translations[currentLang].certificateMessage }}</p>
            <div class="score-display">
              <p><strong>{{ translations[currentLang].certificateScore }}</strong> {{ userScore }}/{{ totalQuestions }}</p>
            </div>
            <p class="certificate-text">🏆 {{ translations[currentLang].certificateAwarded }}</p>
            <div class="modal-buttons">
              <button @click="viewCertificate" class="view-btn">
                📜 {{ translations[currentLang].viewCertificate }}
              </button>
              <button @click="restartQuiz" class="restart-btn">
                {{ translations[currentLang].restart }}
              </button>
            </div>
          </div>
          
          <!-- Regular Completion Modal (for failing score) -->
          <div v-else class="completion-modal">
            <h2>{{ translations[currentLang].completionTitle }}</h2>
            <p>{{ translations[currentLang].completionMessage }}</p>
            <div class="score-display">
              <p><strong>{{ translations[currentLang].certificateScore }}</strong> {{ userScore }}/{{ totalQuestions }}</p>
            </div>
            <p>{{ translations[currentLang].thankYou }}</p>
            <button @click="restartQuiz" class="restart-btn">
              {{ translations[currentLang].restart }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quiz',
  props: {
    visitorData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentLang: 'uz',
      currentQuestion: 1,
      totalQuestions: 10,
      answers: Array(10).fill(null),
      quizCompleted: false,
      userScore: 0,
      passingScore: 8,
      showCertificate: false,
      
      // Correct answers (0-based index)
      correctAnswers: [3, 2, 1, 2, 1, 2, 1, 1, 2, 3],
      
      questions: {
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
      },
      
      translations: {
        uz: {
          testTitle: 'Test jarayoni to\'g\'risida',
          testDescription: 'Test jarayoni sakkizta savol va savol javoblaridan iborat.',
          testInstructions: 'Har biz test savoli 5 ballik reytingda baholanadi. Test jarayonidan muvaffaqiyatli o\'tgan ishtirokchi sertifikat bilan taqdirlandi.',
          encouragement: 'Sizning fikringiz biz uchun muhim!',
          previous: 'orqaga',
          next: 'keyingi',
          finish: 'Yakunlash',
          completionTitle: 'Uzauto Academy',
          completionMessage: 'Uzauto Academiyasi tomonidan korxona va platformamizga tashrifingiz uchun minnatdorlik bildiramiz!',
          thankYou: 'Sizning natijangiz salbiy.',
          restart: 'Qayta boshlash',
          certificateTitle: 'Tabriklaymiz!',
          certificateMessage: 'Siz testdan muvaffaqiyatli o\'tdingiz!',
          certificateScore: 'Sizning natijangiz:',
          certificateAwarded: 'Sizga sertifikat berildi!',
          viewCertificate: 'Sertifikatni ko\'rish'
        },
        ru: {
          testTitle: 'О процессе тестирования',
          testDescription: 'Процесс тестирования состоит из восьми вопросов и ответов.',
          testInstructions: 'Каждый тестовый вопрос оценивается по 5-балльной шкале. Участник, успешно прошедший тест, награждается сертификатом.',
          encouragement: 'Ваше мнение важно для нас!',
          previous: 'назад',
          next: 'следующий',
          finish: 'Завершить',
          completionTitle: 'Uzauto Academy',
          completionMessage: 'Uzauto Academy благодарит вас за посещение нашего предприятия и платформы!',
          thankYou: 'Ваш результат отрицательный.',
          restart: 'Начать заново',
          certificateTitle: 'Поздравляем!',
          certificateMessage: 'Вы успешно прошли тест!',
          certificateScore: 'Ваш результат:',
          certificateAwarded: 'Вам присуждается сертификат!',
          viewCertificate: 'Посмотреть сертификат'
        },
        en: {
          testTitle: 'About the test process',
          testDescription: 'The test process consists of eight questions and answers.',
          testInstructions: 'Each test question is rated on a 5-point scale. A participant who successfully passes the test is awarded a certificate.',
          encouragement: 'Your opinion is important to us!',
          previous: 'back',
          next: 'next',
          finish: 'Finish',
          completionTitle: 'Uzauto Academy',
          completionMessage: 'Uzauto Academy thanks you for visiting our enterprise and platform!',
          thankYou: 'Your result is negative.',
          restart: 'Restart',
          certificateTitle: 'Congratulations!',
          certificateMessage: 'You have successfully passed the test!',
          certificateScore: 'Your score:',
          certificateAwarded: 'You are awarded a certificate!',
          viewCertificate: 'View Certificate'
        }
      }
    }
  },
  methods: {
    getCurrentQuestion() {
      return this.questions[this.currentLang][this.currentQuestion - 1]
    },
    nextQuestion() {
      if (this.currentQuestion < this.totalQuestions && this.answers[this.currentQuestion - 1] !== null) {
        this.currentQuestion++
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 1) {
        this.currentQuestion--
      }
    },
    finishQuiz() {
      if (this.answers[this.currentQuestion - 1] !== null) {
        this.calculateScore()
        this.quizCompleted = true
        this.showCertificate = this.userScore >= this.passingScore
      }
    },
    viewCertificate() {
      // Navigate to certificate page
      this.$emit('view-certificate', {
        visitorData: this.visitorData,
        score: this.userScore,
        totalQuestions: this.totalQuestions,
        language: this.currentLang
      })
    },
    calculateScore() {
      this.userScore = 0
      for (let i = 0; i < this.totalQuestions; i++) {
        if (this.answers[i] === this.correctAnswers[i]) {
          this.userScore++
        }
      }
    },
    restartQuiz() {
      this.currentQuestion = 1
      this.answers = Array(10).fill(null)
      this.quizCompleted = false
      this.userScore = 0
      this.showCertificate = false
    },
    printCertificate() {
      // Create a printable certificate
      const currentDate = new Date().toLocaleDateString()
      const currentTime = new Date().toLocaleTimeString()
      const visitorName = `${this.visitorData.firstName || ''} ${this.visitorData.lastName || ''}`.trim() || 'Visitor'
      
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>R&D Center Certificate</title>
          <style>
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: #000;
            }
            .certificate {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background: linear-gradient(135deg, #2c5aa0 0%, #4a80c4 50%, #87ceeb 100%);
              position: relative;
              overflow: hidden;
            }
            .diagonal-lines {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 200px;
              background: linear-gradient(45deg, 
                transparent 30%, 
                rgba(255,255,255,0.1) 35%, 
                rgba(255,255,255,0.2) 40%, 
                transparent 45%,
                transparent 55%,
                rgba(255,255,255,0.1) 60%,
                rgba(255,255,255,0.2) 65%,
                transparent 70%);
            }
            .header {
              background: #1e3c72;
              color: white;
              padding: 15px 30px;
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .logo-section {
              display: flex;
              align-items: center;
              gap: 15px;
            }
            .logo-placeholder {
              width: 60px;
              height: 60px;
              background: white;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #1e3c72;
              font-weight: bold;
              font-size: 14px;
            }
            .header-text {
              color: white;
              font-size: 14px;
            }
            .main-content {
              background: white;
              padding: 40px;
              margin: 0 20px;
              position: relative;
              z-index: 2;
            }
            .certificate-title {
              font-size: 48px;
              font-weight: bold;
              color: #1e3c72;
              text-align: center;
              margin-bottom: 30px;
              letter-spacing: 2px;
            }
            .subtitle {
              background: #1e3c72;
              color: white;
              padding: 15px;
              text-align: center;
              font-size: 14px;
              margin-bottom: 30px;
            }
            .course-title {
              color: #4a80c4;
              font-size: 20px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 30px;
            }
            .recipient-name {
              font-size: 32px;
              font-weight: bold;
              color: #1e3c72;
              text-align: center;
              margin: 30px 0;
              text-transform: uppercase;
            }
            .certificate-number {
              background: #1e3c72;
              color: white;
              padding: 8px 15px;
              font-size: 12px;
              position: absolute;
              bottom: 120px;
              left: 20px;
              clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 0 100%);
            }
            .footer-section {
              padding: 20px 40px;
              background: white;
              margin: 0 20px 20px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .signature-area {
              text-align: left;
              color: #1e3c72;
              font-size: 12px;
            }
            .date-area {
              text-align: right;
              color: #1e3c72;
              font-size: 12px;
            }
            .bottom-bar {
              background: #1e3c72;
              color: white;
              padding: 15px 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 14px;
            }
            .social-handles {
              display: flex;
              gap: 30px;
            }
            .score-badge {
              background: #28a745;
              color: white;
              padding: 10px 20px;
              border-radius: 25px;
              font-weight: bold;
              font-size: 16px;
              text-align: center;
              margin: 20px auto;
              display: inline-block;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="diagonal-lines"></div>
            
            <div class="header">
              <div class="logo-section">
                <div class="logo-placeholder">LOGO</div>
                <div class="header-text">Research & Development<br>Center</div>
              </div>
            </div>
            
            <div class="main-content">
              <div class="certificate-title">SERTIFIKAT</div>
              
              <div class="subtitle">
                "Research & Development Center" boshqarmasida<br>
                ELEKTROGAZPAYVANDLASH<br>
                kursidan ijobiy natija olganligi uchun
              </div>
              
              <div class="course-title">3-PAYVANDLASH SEXI XODIMI</div>
              
              <div class="recipient-name">${visitorName.toUpperCase()}</div>
              
              <div class="score-badge">
                Natija: ${this.userScore}/${this.totalQuestions} (${Math.round((this.userScore/this.totalQuestions)*100)}%)
              </div>
              
              <div class="certificate-number">
                ${new Date().getFullYear()} yil Berildi: R&D Center: № ${String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')}
              </div>
            </div>
            
            <div class="footer-section">
              <div class="signature-area">
                Texnik rivojlantirish direksiyasi direktori: ${this.getDirectorName ? this.getDirectorName() : 'Director'}<br>
                <div style="margin-top: 10px;">___________________ M.O'.</div>
                <div style="font-size: 10px; margin-top: 5px;">(Imzo)</div>
              </div>
              <div class="date-area">
                ${currentDate}
              </div>
            </div>
            
            <div class="bottom-bar">
              <div class="social-handles">
                <span>📱 @uzauto_rd_center</span>
                <span>📷 @uzauto_rd_center</span>
              </div>
            </div>
          </div>
          
          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; background: #1e3c72; color: white; border: none; border-radius: 4px;">Print Certificate</button>
            <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; margin-left: 10px; background: #6c757d; color: white; border: none; border-radius: 4px;">Close</button>
          </div>
        </body>
        </html>
      `
      
      // Open print window
      const printWindow = window.open('', '_blank', 'width=800,height=600')
      printWindow.document.open()
      printWindow.document.write(certificateHTML)
      printWindow.document.close()
      
      // Auto-print after window loads
      printWindow.onload = function() {
        setTimeout(() => {
          printWindow.print()
        }, 500)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

.quiz-page {
  min-height: 100vh;
}

.layout {
  display: flex;
  min-height: 100vh;
}

/* Left Blue Panel */
.left-panel {
  flex: 0 0 45%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.building-image {
  margin-bottom: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  overflow: hidden;
}

.building-pic {
  width: 250px;
  height: 150px;
  object-fit: cover;
  display: block;
}

.quiz-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.quiz-description,
.quiz-instructions {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  max-width: 300px;
}

.quiz-encouragement {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.progress-container {
  width: 100%;
  max-width: 300px;
}

.progress-text {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 10px;
  transition: width 0.3s ease;
}

/* Right White Panel */
.right-panel {
  flex: 0 0 55%;
  background: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.language-selector {
  align-self: flex-end;
  margin-bottom: 1.5rem;
}

.lang-select {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.85rem;
  min-width: 60px;
}

.company-image {
  margin-bottom: 2rem;
  align-self: center;
  width: 33.33%;
}

.company-logo {
  width: 100%;
  height: 80px;
  object-fit: contain;
  background: transparent;
  border-radius: 6px;
}

.quiz-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.question-container {
  margin-bottom: 2rem;
}

.question-number {
  display: inline;
  font-size: 1.2rem;
  color: #2a5298;
  font-weight: 600;
}

.question-text {
  display: inline;
  font-size: 1.2rem;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
}

.answers-container {
  margin-bottom: 2rem;
}

.answer-option {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
}

.answer-input {
  margin-right: 0.8rem;
  margin-top: 0.2rem;
  transform: scale(1.2);
}

.answer-label {
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  line-height: 1.4;
}

.navigation-buttons {
  display: flex;
  gap: 1rem;
  margin-top: auto;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.prev-btn {
  background: #dc3545;
  color: white;
}

.next-btn {
  background: #28a745;
  color: white;
}

.finish-btn {
  background: #007bff;
  color: white;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn:not(:disabled):hover {
  transform: translateY(-1px);
}

.quiz-completion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.completion-modal {
  background: #4285f4;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 450px;
  margin: 1rem;
}

.certificate-modal {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.completion-modal h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.completion-modal p {
  margin-bottom: 1rem;
  line-height: 1.4;
}

.score-display {
  background: rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
}

.score-display p {
  margin: 0;
  font-size: 1.1rem;
}

.certificate-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.view-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.view-btn:hover {
  transform: translateY(-2px);
}

.restart-btn {
  background: white;
  color: #4285f4;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.restart-btn:hover {
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  
  .left-panel {
    flex: none;
    padding: 1.5rem;
  }
  
  .right-panel {
    flex: none;
    padding: 1.5rem;
  }
  
  .building-pic {
    width: 200px;
    height: 120px;
  }
  
  .company-image {
    width: 50%;
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
}
</style>