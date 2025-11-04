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
          question: 'R&D markazining asosiy maqsadi nima?',
          options: [
            'Korxonaning innovatsion salohiyatini oshirish',
            'Korxonaning moliyaviy hisobotlarini tayorlash', 
            'Ishchilar soni va xarajatlarni qisqartirish', 
            'Marketing kompaniyalari bilan ishlash'
          ]
        },
        {
          question: 'R&D center nechanchi yilda tashkil etilgan?',
          options: ['2024-yil', '2022-yil', '2023-yil', '2025-yil']
        },
        {
          question: 'R&D markazida qanday yo\'nalishlar bo\'yicha ishlar olib boriladi?',
          options: ['Qolipsozlik muhandisligi', 'Qadoqlash muhandisligi', 'Sanoat tizimlari muhandisligi', 'Barcha javoblar to\'g\'ri']
        },
        {
          question: 'R&D centerda faoliyat olib bormaydigan yo\'nalishni belgilang',
          options: ['Cost engineering', 'Xalqaro hamkorlik va Dizayn', 'Reverse engieering', 'Taqqoslov va Tahlil']
        },
        {
          question: 'Markazda necha nafar muhandis faoliyat olib boradi?',
          options: ['100 nafardan kam', '100 nafardan ko\'p', '80 nafardan ko\'p', '80 nafardan kam']
        },
        {
          question: 'Markazning O\'zbek modelini ishlab chiqarish rejasi nechanchi yilgacha maqsad qlib olingan?',
          options: ['2026-yil', '2027-yil', '2029-yil', '2030-yil']
        },
        {
          question: 'R&D markazida qanday hamkorliklar amalga oshiriladi?',
          options: ['Mahalliy hamkorliklar', 'OTM lar bilan hamkorlik', 'Xorijiy hamkorliklar', 'Barcha javoblar to\'g\'ri']
        },
        {
          question: 'Markaz labarotoriyasida foydalaniluvchi Fanuc va Yaskawa robotlari qaysi davlatga tegishli?',
          options: ['Koreya va Yaponiya', 'Ikkisi ham Koreya', 'Ikkisi ham Yaponiya', 'Braziliya va Yaponiya']
        },
        {
          question: 'R&D markazida tomonidan amalga oshirilgan face lift loyihasi qaysi modellar ustida qilingan?',
          options: ['Cobalt', 'Onix', 'Tracker', 'Cobalt va Onix']
        },
        {
          question: 'Markaz tomonidan tuning loyixalari qaysi model ustida amalga oshirilmagan?',
          options: ['Gentra', 'Onix', 'Tracker', 'Cobalt']
        }
      ],
      ru: [
        {
  question: 'R&D markazining asosiy maqsadi nima?',
  options: [
    "To increase the company's innovative potential",
    "To prepare the company's financial reports",
    "To reduce the number of employees and expenses",
    "To work with marketing companies"
  ]
},
        {
          question: 'Какова основная цель R&D центра?',
          options: ['2024 год', '2022 год', '2023 год', '2025 год']
        },
        {
          question: 'По каким направлениям ведутся работы в R&D центре?',
          options: [
            'Повышение инновационного потенциала компании', 
            'Подготовка финансовой отчётности компании', 
            'Сокращение числа сотрудников и расходов', 
            'Работа с маркетинговыми компаниями'
          ]
        },
        {
          question: 'Укажите направление, по которому не ведется деятельность в R&D центре',
          options: ['Cost engineering', 'Международное сотрудничество и Дизайн', 'Reverse engineering', 'Стандартизация и анализ']
        },
        {
          question: 'Сколько инженеров работает в центре?',
          options: ['Менее 100 человек', 'Более 100 человек', 'Более 80 человек', 'Менее 80 человек']
        },
        {
          question: 'До какого года планируется производство узбекской модели в центре?',
          options: ['2026 год', '2027 год', '2029 год', '2030 год']
        },
        {
          question: 'Какие виды сотрудничества осуществляются в R&D центре?',
          options: ['Местное сотрудничество', 'Сотрудничество с ВУЗами', 'Иностранное сотрудничество', 'Все ответы правильные']
        },
        {
          question: 'Роботы Fanuc и Yaskawa, используемые в лаборатории центра, принадлежат какой стране?',
          options: ['Корея и Япония', 'Оба из Кореи', 'Оба из Японии', 'Бразилия и Япония']
        },
        {
          question: 'На каких моделях был выполнен проект face lift, реализованный R&D центром?',
          options: ['Cobalt', 'Onix', 'Tracker', 'Cobalt и Onix']
        },
        {
          question: 'На какой модели не были реализованы проекты тюнинга центром?',
          options: ['Gentra', 'Onix', 'Tracker', 'Cobalt']
        }
      ],
      en: [
        {
          question: 'What is the main goal of the R&D center?',
          options: [
            'To increase the company\'s innovative potential', 
            'To prepare the company\'s financial reports', 
            'To reduce the number of employees and expenses', 
            'To work with marketing companies'
          ]
        },
        {
          question: 'In which year was the R&D center established?',
          options: ['2024', '2022', '2023', '2025']
        },
        {
          question: 'What areas of work are conducted at the R&D center?',
          options: ['Mold engineering', 'Packaging engineering', 'Industrial systems engineering', 'All answers are correct']
        },
        {
          question: 'Identify the area where no activity is carried out at the R&D center',
          options: ['Cost engineering', 'International cooperation and Design', 'Reverse engineering', 'Standardization and Analysis']
        },
        {
          question: 'How many engineers work at the center?',
          options: ['Less than 100 people', 'More than 100 people', 'More than 80 people', 'Less than 80 people']
        },
        {
          question: 'Until which year is the production of the Uzbek model planned at the center?',
          options: ['2026', '2027', '2029', '2030']
        },
        {
          question: 'What types of cooperation are carried out at the R&D center?',
          options: ['Local cooperation', 'Cooperation with universities', 'Foreign cooperation', 'All answers are correct']
        },
        {
          question: 'Fanuc and Yaskawa robots used in the center\'s laboratory belong to which country?',
          options: ['Korea and Japan', 'Both from Korea', 'Both from Japan', 'Brazil and Japan']
        },
        {
          question: 'On which models was the face lift project implemented by the R&D center?',
          options: ['Cobalt', 'Onix', 'Tracker', 'Cobalt and Onix']
        },
        {
          question: 'On which model were tuning projects not implemented by the center?',
          options: ['Gentra', 'Onix', 'Tracker', 'Cobalt']
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
      const correctAnswers = [0, 3, 3, 1, 2, 3, 3, 2, 3, 0] // Correct answers for new questions
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
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

.lang-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  font-size: 0.9rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-btn:hover {
  background: #c0392b;
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