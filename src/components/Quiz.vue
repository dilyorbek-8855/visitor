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

        <!-- Company Image Placeholder -->
        <div class="company-image">
          <div class="image-placeholder">Image</div>
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
          <div class="completion-modal">
            <h2>{{ translations[currentLang].completionTitle }}</h2>
            <p>{{ translations[currentLang].completionMessage }}</p>
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
  data() {
    return {
      currentLang: 'uz',
      currentQuestion: 1,
      totalQuestions: 10,
      answers: Array(10).fill(null),
      quizCompleted: false,
      
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
          restart: 'Qayta boshlash'
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
          restart: 'Начать заново'
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
          restart: 'Restart'
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
        this.quizCompleted = true
      }
    },
    restartQuiz() {
      this.currentQuestion = 1
      this.answers = Array(10).fill(null)
      this.quizCompleted = false
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

.image-placeholder {
  width: 100%;
  height: 80px;
  background: #f0f0f0;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 0.9rem;
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
  max-width: 400px;
  margin: 1rem;
}

.completion-modal h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.completion-modal p {
  margin-bottom: 1rem;
  line-height: 1.4;
}

.restart-btn {
  background: white;
  color: #4285f4;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
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