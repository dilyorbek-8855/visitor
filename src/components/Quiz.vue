<template>
  <div class="quiz-page">
    <div class="layout">
      <!-- Left Blue Panel -->
      <div class="left-panel">
        <!-- Building Image -->
        <div class="building-image">
          <img src="../assets/images/building.jpg" alt="Company Building" class="building-pic">
        </div>
        
        <!-- Test Information -->
        <div class="test-info">
          <h2 class="test-title">{{ translations[currentLanguage].testTitle }}</h2>
          <p class="test-description">{{ translations[currentLanguage].testDescription }}</p>
          <p class="test-instructions">{{ translations[currentLanguage].testInstructions }}</p>
          
          <!-- Progress Section -->
          <div class="progress-section">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <p class="progress-text">{{ progressPercentage.toFixed(0) }}%</p>
          </div>
        </div>
      </div>

      <!-- Right White Panel -->
      <div class="right-panel">
        <!-- Language Selector -->
        <div class="language-selector">
          <select v-model="currentLanguage" class="lang-select">
            <option value="uz">O'z</option>
            <option value="ru">Ру</option>
            <option value="en">En</option>
          </select>
        </div>

        <!-- Question Container -->
        <div class="question-container">
          <div class="question-header">
            <h2 class="question-text">
              <span class="question-counter">{{ currentQuestion }}.</span> 
              {{ currentQuestionData.question }}
            </h2>
          </div>

          <div class="options-container">
            <div 
              v-for="(option, index) in currentQuestionData.options" 
              :key="index"
              class="option-item"
              :class="{ 'selected': answers[currentQuestion - 1] === index }"
            >
              <input 
                type="radio" 
                :id="`option-${index}`"
                :name="`question-${currentQuestion}`"
                :value="index"
                v-model="answers[currentQuestion - 1]"
                class="option-radio"
              >
              <label :for="`option-${index}`" class="option-label">
                {{ option }}
              </label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="navigation-buttons">
            <button 
              @click="previousQuestion" 
              class="nav-btn prev-btn"
            >
              {{ translations[currentLanguage].previous }}
            </button>
            
            <button 
              v-if="currentQuestion < totalQuestions" 
              @click="nextQuestion" 
              class="nav-btn next-btn"
              :disabled="answers[currentQuestion - 1] === null"
            >
              {{ translations[currentLanguage].next }}
            </button>
            
            <button 
              v-if="currentQuestion === totalQuestions" 
              @click="finishQuiz" 
              class="nav-btn finish-btn"
              :disabled="answers[currentQuestion - 1] === null"
            >
              {{ translations[currentLanguage].finish }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz Completion Modal -->
    <div v-if="showFailModal" class="quiz-completion">
      <div class="completion-modal fail-modal">
        <div class="modal-content">
          <h2>Test yakunlandi</h2>
          <p>Test natijalaringiz:</p>
          <div class="score-display">
            <span class="score-label">Natija:</span>
            <span class="score-value">{{ score }}/{{ totalQuestions }}</span>
          </div>
          <p>8 ta yoki undan ko'p savolga to'g'ri javob berish kerak. Qaytadan urinish uchun pastdagi tugmani bosing.</p>
          <button @click="restartQuiz" class="restart-btn">Qaytadan boshlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVisitorStore } from '../stores/visitor.js'
import { translations } from '../stores/translations.js'

export default {
  name: 'Quiz',
  setup() {
    const router = useRouter()
    const visitorStore = useVisitorStore()
    
    const currentLanguage = ref('uz')
    const currentQuestion = ref(1)
    const totalQuestions = 10
    const answers = ref(Array(10).fill(null))
    const score = ref(0)
    const showFailModal = ref(false)
    
    // Quiz questions in all languages
    const questions = {
      uz: [
        {
          question: 'R&D markazining hozirdagi rahbari kim?',
          options: ['S.A.Mamadaliyev', 'A.N.Abdullayev', 'J.Kovach', 'M.Umarov']
        },
        {
          question: 'R&D markazida qanday yo\'nalishlar bo\'yicha ishlar olib boriladi?',
          options: ['Avtomobil ishlab chiqarish', 'Texnik rivojlantirish', 'Marketing va sotuv', 'Barcha yo\'nalishlar']
        },
        {
          question: 'R&D markazida qancha mutaxassis ishlaydi?',
          options: ['50 dan kam', '50-100', '100-200', '200 dan ko\'p']
        },
        {
          question: 'R&D markazida qanday loyihalar amalga oshiriladi?',
          options: ['Faqat avtomobil loyihalari', 'Texnik innovatsiyalar', 'Barcha turdagi loyihalar', 'Faqat tadqiqot']
        },
        {
          question: 'R&D markazida qanday texnologiyalar qo\'llaniladi?',
          options: ['Eski texnologiyalar', 'Zamonaviy texnologiyalar', 'Archaik usullar', 'Hech qanday']
        },
        {
          question: 'R&D markazida qanday hamkorlik amalga oshiriladi?',
          options: ['Faqat ichki hamkorlik', 'Xalqaro hamkorlik', 'Mahalliy hamkorlik', 'Barcha turdagi hamkorlik']
        },
        {
          question: 'R&D markazida qanday natijalar erishilgan?',
          options: ['Hech qanday natija yo\'q', 'Bir necha natija', 'Ko\'p natijalar', 'Ajoyib natijalar']
        },
        {
          question: 'R&D markazida qanday malakali kadrlar ishlaydi?',
          options: ['O\'rta malakali', 'Yuqori malakali', 'Barcha darajadagi', 'Faqat boshlang\'ich']
        },
        {
          question: 'R&D markazida qanday jihozlardan foydalaniladi?',
          options: ['Eski jihozlar', 'Zamonaviy jihozlar', 'Oddiy jihozlar', 'Maxsus jihozlar']
        },
        {
          question: 'R&D markazida qanday kelajak rejalari mavjud?',
          options: ['Qisqa muddatli', 'O\'rta muddatli', 'Uzoq muddatli', 'Barcha muddatli']
        }
      ],
      ru: [
        {
          question: 'Кто является нынешним руководителем R&D центра?',
          options: ['С.А.Мамадалиев', 'А.Н.Абдуллаев', 'Дж.Ковач', 'М.Умаров']
        },
        {
          question: 'По каким направлениям ведутся работы в R&D центре?',
          options: ['Производство автомобилей', 'Техническое развитие', 'Маркетинг и продажи', 'Все направления']
        },
        {
          question: 'Сколько специалистов работает в R&D центре?',
          options: ['Менее 50', '50-100', '100-200', 'Более 200']
        },
        {
          question: 'Какие проекты реализуются в R&D центре?',
          options: ['Только автомобильные проекты', 'Технические инновации', 'Все виды проектов', 'Только исследования']
        },
        {
          question: 'Какие технологии используются в R&D центре?',
          options: ['Старые технологии', 'Современные технологии', 'Архаичные методы', 'Никакие']
        },
        {
          question: 'Какое сотрудничество осуществляется в R&D центре?',
          options: ['Только внутреннее сотрудничество', 'Международное сотрудничество', 'Местное сотрудничество', 'Все виды сотрудничества']
        },
        {
          question: 'Каких результатов достиг R&D центр?',
          options: ['Никаких результатов', 'Несколько результатов', 'Много результатов', 'Отличные результаты']
        },
        {
          question: 'Какие квалифицированные кадры работают в R&D центре?',
          options: ['Средней квалификации', 'Высокой квалификации', 'Всех уровней', 'Только начального']
        },
        {
          question: 'Каким оборудованием пользуются в R&D центре?',
          options: ['Старое оборудование', 'Современное оборудование', 'Обычное оборудование', 'Специальное оборудование']
        },
        {
          question: 'Какие планы на будущее есть у R&D центра?',
          options: ['Краткосрочные', 'Среднесрочные', 'Долгосрочные', 'Все сроки']
        }
      ],
      en: [
        {
          question: 'Who is the current head of the R&D center?',
          options: ['S.A.Mamadaliyev', 'A.N.Abdullayev', 'J.Kovach', 'M.Umarov']
        },
        {
          question: 'What areas of work are conducted at the R&D center?',
          options: ['Automobile production', 'Technical development', 'Marketing and sales', 'All areas']
        },
        {
          question: 'How many specialists work at the R&D center?',
          options: ['Less than 50', '50-100', '100-200', 'More than 200']
        },
        {
          question: 'What projects are implemented at the R&D center?',
          options: ['Only automobile projects', 'Technical innovations', 'All types of projects', 'Only research']
        },
        {
          question: 'What technologies are used at the R&D center?',
          options: ['Old technologies', 'Modern technologies', 'Archaic methods', 'None']
        },
        {
          question: 'What cooperation is carried out at the R&D center?',
          options: ['Only internal cooperation', 'International cooperation', 'Local cooperation', 'All types of cooperation']
        },
        {
          question: 'What results has the R&D center achieved?',
          options: ['No results', 'Several results', 'Many results', 'Excellent results']
        },
        {
          question: 'What qualified personnel work at the R&D center?',
          options: ['Medium qualification', 'High qualification', 'All levels', 'Only entry level']
        },
        {
          question: 'What equipment is used at the R&D center?',
          options: ['Old equipment', 'Modern equipment', 'Regular equipment', 'Special equipment']
        },
        {
          question: 'What future plans does the R&D center have?',
          options: ['Short-term', 'Medium-term', 'Long-term', 'All terms']
        }
      ]
    }
    
    // Computed properties
    const currentQuestionData = computed(() => {
      return questions[currentLanguage.value][currentQuestion.value - 1]
    })
    
    const progressPercentage = computed(() => {
      return ((currentQuestion.value - 1) / totalQuestions) * 100
    })
    
    // Watch language changes
    watch(currentLanguage, (newLang) => {
      visitorStore.setLanguage(newLang)
    })
    
    // Methods
    const nextQuestion = () => {
      if (currentQuestion.value < totalQuestions) {
        currentQuestion.value++
      }
    }
    
    const previousQuestion = () => {
      if (currentQuestion.value > 1) {
        currentQuestion.value--
      } else {
        // Return to welcome page if on first question
        router.push('/')
      }
    }
    
    const finishQuiz = () => {
      // Calculate score
      const correctAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Debug mode
      let calculatedScore = 0
      
      for (let i = 0; i < totalQuestions; i++) {
        if (answers.value[i] === correctAnswers[i]) {
          calculatedScore++
        }
      }
      
      score.value = calculatedScore
      
      // Store answers in store
      answers.value.forEach((answer, index) => {
        visitorStore.setAnswer(index, answer)
      })
      
      // Calculate final score and generate certificate
      visitorStore.calculateScore()
      visitorStore.generateCertificateNumber()
      
      // Navigate based on score
      if (calculatedScore >= 8) {
        router.push('/certificate')
      } else {
        showFailModal.value = true
      }
    }
    
    const restartQuiz = () => {
      visitorStore.resetQuiz()
      currentQuestion.value = 1
      answers.value = Array(10).fill(null)
      score.value = 0
      showFailModal.value = false
    }
    
    // Initialize
    onMounted(() => {
      // Set language from store
      currentLanguage.value = visitorStore.currentLanguage
      
      // Check if visitor data exists
      if (!visitorStore.visitorData.lastName) {
        router.push('/')
      }
    })
    
    return {
      currentLanguage,
      currentQuestion,
      totalQuestions,
      answers,
      score,
      showFailModal,
      questions,
      currentQuestionData,
      progressPercentage,
      visitorStore,
      translations,
      nextQuestion,
      previousQuestion,
      finishQuiz,
      restartQuiz
    }
  }
}
</script>

<style scoped>
/* Quiz Page Styles - Matching Original CSS */
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

.test-info {
  width: 100%;
  max-width: 300px;
}

.test-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.test-description,
.test-instructions {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.progress-section {
  margin: 1.5rem 0;
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
  margin-bottom: 0.5rem;
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
  text-align: right;
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.lang-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  font-size: 0.9rem;
}

.question-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
}

.question-header {
  text-align: left;
  margin-bottom: 2rem;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.question-counter {
  color: #1e3c72; /* Company blue color */
  font-weight: bold;
  margin-right: 0.5rem;
}

.options-container {
  margin-bottom: 2rem;
}

.option-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.option-item:hover {
  border-color: #1e3c72;
  background: #f8f9fa;
}

.option-item.selected {
  border-color: #1e3c72;
  background: #e3f2fd;
}

.option-radio {
  margin-right: 1rem;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.option-label {
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  flex: 1;
  line-height: 1.4;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
}

.nav-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.prev-btn {
  background: #dc3545; /* Red color for back button */
  color: white;
}

.prev-btn:hover {
  background: #c82333;
}

.next-btn {
  background: #28a745; /* Green color for next button */
  color: white;
}

.next-btn:hover {
  background: #218838;
}

.finish-btn {
  background: #1e3c72; /* Company blue color for finish button */
  color: white;
}

.finish-btn:hover {
  background: #152a4f;
}

.next-btn:disabled, .finish-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Quiz Completion Modal */
.quiz-completion {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.completion-modal {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.fail-modal {
  border: 3px solid #dc3545;
}

.modal-content h2 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.score-display {
  margin: 1rem 0;
  font-size: 1.2rem;
}

.score-label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.score-value {
  color: #dc3545;
  font-weight: bold;
}

.restart-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.restart-btn:hover {
  background: #c82333;
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  
  .left-panel,
  .right-panel {
    flex: none;
  }
  
  .left-panel {
    padding: 1rem;
  }
  
  .building-pic {
    width: 200px;
    height: 120px;
  }
  
  .question-text {
    font-size: 1.2rem;
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
  
  .nav-btn {
    min-width: auto;
  }
}
</style> 