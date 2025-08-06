<template>
  <div class="certificate-page">
    <div class="certificate-container">
      <!-- Certificate Display -->
      <div class="certificate">
        <div class="diagonal-lines"></div>
        
        <div class="header">
          <div class="logo-section">
            <img src="/logo.png" alt="R&D Center Logo" class="logo" @error="handleLogoError">
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
          
          <div class="recipient-name">{{ visitorName }}</div>
          
          <div class="score-badge">
            Natija: {{ certificateData.score }}/{{ certificateData.totalQuestions }} ({{ scorePercentage }}%)
          </div>
          
          <div class="certificate-number">
            {{ currentYear }} yil Berildi: R&D Center: № {{ certificateNumber }}
          </div>
        </div>
        
        <div class="footer-section">
          <div class="signature-area">
            Texnik rivojlantirish direksiyasi direktori: {{ directorName }}<br>
            <div class="signature-line">___________________ M.O'.</div>
            <div class="signature-label">(Imzo)</div>
          </div>
          <div class="date-area">
            {{ currentDate }}
          </div>
        </div>
        
        <div class="bottom-bar">
          <div class="social-handles">
            <span>📱 @uzauto_rd_center</span>
            <span>📷 @uzauto_rd_center</span>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button @click="printCertificate" class="print-btn">
          🖨️ {{ translations[currentLang].printCertificate }}
        </button>
        <button @click="backToQuiz" class="back-btn">
          ← {{ translations[currentLang].backToQuiz }}
        </button>
        <button @click="startOver" class="restart-btn">
          🔄 {{ translations[currentLang].startOver }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Certificate',
  props: {
    certificateData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentLang: this.certificateData.language || 'uz',
      certificateNumber: this.generateCertificateNumber(),
      translations: {
        uz: {
          printCertificate: 'Sertifikatni chop etish',
          backToQuiz: 'Testga qaytish',
          startOver: 'Boshidan boshlash'
        },
        ru: {
          printCertificate: 'Печать сертификата',
          backToQuiz: 'Вернуться к тесту',
          startOver: 'Начать сначала'
        },
        en: {
          printCertificate: 'Print Certificate',
          backToQuiz: 'Back to Quiz',
          startOver: 'Start Over'
        }
      }
    }
  },
  computed: {
    visitorName() {
      const firstName = this.certificateData.visitorData?.firstName || ''
      const lastName = this.certificateData.visitorData?.lastName || ''
      return `${firstName} ${lastName}`.trim().toUpperCase() || 'VISITOR'
    },
    directorName() {
      // You can make this dynamic based on language if needed
      return this.currentLang === 'uz' ? 'Yanush Kovach' : 'Janos Kovacs'
    },
    scorePercentage() {
      return Math.round((this.certificateData.score / this.certificateData.totalQuestions) * 100)
    },
    currentDate() {
      return new Date().toLocaleDateString()
    },
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    generateCertificateNumber() {
      return String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0')
    },
    handleLogoError(event) {
      // Replace with placeholder if logo fails to load
      event.target.style.display = 'none'
      event.target.parentElement.querySelector('.logo-placeholder').style.display = 'flex'
    },
    printCertificate() {
      window.print()
    },
    backToQuiz() {
      this.$emit('back-to-quiz')
    },
    startOver() {
      this.$emit('start-over')
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
  font-family: Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
}

.certificate-page {
  min-height: 100vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.certificate-container {
  max-width: 900px;
  width: 100%;
}

.certificate {
  width: 100%;
  background: linear-gradient(135deg, #2c5aa0 0%, #4a80c4 50%, #87ceeb 100%);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
  justify-content: flex-start;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: white;
  border-radius: 4px;
  padding: 5px;
}

.logo-placeholder {
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 4px;
  display: none;
  align-items: center;
  justify-content: center;
  color: #1e3c72;
  font-weight: bold;
  font-size: 10px;
}

.header-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
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
  line-height: 1.4;
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
}

.score-badge {
  background: #28a745;
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin: 30px auto;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
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
  z-index: 3;
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
  line-height: 1.4;
}

.signature-line {
  margin-top: 15px;
  font-size: 14px;
}

.signature-label {
  font-size: 10px;
  margin-top: 5px;
  color: #666;
}

.date-area {
  text-align: right;
  color: #1e3c72;
  font-size: 14px;
  font-weight: 600;
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

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.print-btn {
  background: #17a2b8;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(23, 162, 184, 0.3);
}

.back-btn {
  background: #ffc107;
  color: #212529;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(255, 193, 7, 0.3);
}

.restart-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
}

.print-btn:hover,
.back-btn:hover,
.restart-btn:hover {
  transform: translateY(-2px);
}

/* Print Styles */
@media print {
  .certificate-page {
    background: white;
    padding: 0;
  }
  
  .action-buttons {
    display: none;
  }
  
  .certificate {
    box-shadow: none;
    margin: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .certificate-page {
    padding: 10px;
  }
  
  .main-content {
    padding: 20px;
    margin: 0 10px;
  }
  
  .certificate-title {
    font-size: 32px;
  }
  
  .recipient-name {
    font-size: 24px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .print-btn,
  .back-btn,
  .restart-btn {
    width: 200px;
  }
}
</style>