import { defineStore } from 'pinia'

export const useVisitorStore = defineStore('visitor', {
  state: () => ({
    // Visitor data
    visitorData: {
      lastName: '',
      firstName: '',
      language: 'uz'
    },
    
    // Quiz state
    currentQuestion: 1,
    totalQuestions: 10,
    answers: Array(10).fill(null),
    score: 0,
    quizCompleted: false,
    
    // Certificate data
    certificateData: {
      certificateNumber: '',
      date: '',
      language: 'uz'
    }
  }),
  
  getters: {
    // Get full visitor name
    fullName: (state) => {
      const { lastName, firstName } = state.visitorData
      return `${lastName} ${firstName}`
    },
    
    // Get current language
    currentLanguage: (state) => state.visitorData.language,
    
    // Check if quiz is completed
    isQuizCompleted: (state) => state.quizCompleted,
    
    // Check if user passed (8+ correct answers)
    hasPassed: (state) => state.score >= 8
  },
  
  actions: {
    // Set visitor data
    setVisitorData(data) {
      this.visitorData = { ...data }
    },
    
    // Set language
    setLanguage(language) {
      this.visitorData.language = language
      this.certificateData.language = language
    },
    
    // Set quiz answer
    setAnswer(questionIndex, answer) {
      this.answers[questionIndex] = answer
    },
    
    // Calculate quiz score
    calculateScore() {
      const correctAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // Debug mode
      let score = 0
      
      for (let i = 0; i < this.totalQuestions; i++) {
        if (this.answers[i] === correctAnswers[i]) {
          score++
        }
      }
      
      this.score = score
      this.quizCompleted = true
      return score
    },
    
    // Generate certificate number
    generateCertificateNumber() {
      const date = new Date()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      
      this.certificateData.certificateNumber = `CERT-${year}${month}${day}-${random}`
      this.certificateData.date = date.toLocaleDateString()
    },
    
    // Reset quiz state
    resetQuiz() {
      this.currentQuestion = 1
      this.answers = Array(10).fill(null)
      this.score = 0
      this.quizCompleted = false
    },
    
    // Reset all data
    resetAll() {
      const currentLang = this.visitorData.language
      this.visitorData = {
        lastName: '',
        firstName: '',
        language: currentLang
      }
      this.resetQuiz()
      this.certificateData = {
        certificateNumber: '',
        date: '',
        language: currentLang
      }
    }
  }
}) 