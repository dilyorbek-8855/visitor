<template>
  <div class="welcome-page">
    <div class="layout">
      <!-- Left Blue Panel -->
      <div class="left-panel">
        <div class="profile-section">
          <div class="profile-image">
            <img src="../assets/images/director.png" alt="Director" class="profile-pic">
          </div>
          <h2 class="profile-name">{{ getDirectorName() }}</h2>
          <p class="profile-title">{{ translations[currentLanguage].directorTitle }}</p>
        </div>
        
        <div class="welcome-message">
          <p>{{ translations[currentLanguage].welcomeMessage }}</p>
          <p>{{ translations[currentLanguage].requestMessage }}</p>
          <p>{{ translations[currentLanguage].thankYouMessage }}</p>
          <p class="signature">
            <span>{{ translations[currentLanguage].sincerely }}</span>,<br>
            <span>{{ getDirectorName() }}</span>
          </p>
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

        <!-- Centered Content -->
        <div class="center-content">
          <!-- Company Logo -->
          <div class="company-logo">
            <img src="../assets/images/logo.png" alt="Company Logo" class="logo">
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="handleSubmit" class="registration-form">
            <div class="form-group">
              <label for="lastName">{{ translations[currentLanguage].lastName }} *</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="formData.lastName"
                required
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="firstName">{{ translations[currentLanguage].firstName }} *</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="formData.firstName"
                required
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="middleName">{{ translations[currentLanguage].middleName }}</label>
              <input 
                type="text" 
                id="middleName" 
                v-model="formData.middleName"
                class="form-input"
              >
            </div>

            <button type="submit" class="submit-btn">
              {{ translations[currentLanguage].enterTest }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVisitorStore } from '../stores/visitor.js'
import { translations } from '../stores/translations.js'

export default {
  name: 'Welcome',
  setup() {
    const router = useRouter()
    const visitorStore = useVisitorStore()
    
    const currentLanguage = ref('uz')
    
    const formData = reactive({
      lastName: '',
      firstName: '',
      middleName: ''
    })
    
    // Watch language changes and update store
    watch(currentLanguage, (newLang) => {
      visitorStore.setLanguage(newLang)
    })
    
    const handleSubmit = () => {
      // Set visitor data in store
      visitorStore.setVisitorData({
        ...formData,
        language: currentLanguage.value
      })
      
      // Navigate to quiz
      router.push('/quiz')
    }
    
    const getDirectorName = () => {
      const directorNames = {
        uz: 'Janus Kovach',
        ru: 'Janus Kovacs',
        en: 'Janus Kovacs'
      }
      return directorNames[currentLanguage.value]
    }
    
    return {
      currentLanguage,
      formData,
      translations,
      handleSubmit,
      getDirectorName
    }
  }
}
</script>

<style scoped>
/* Welcome Page Styles */
.welcome-page {
  min-height: 100vh;
  background: #f5f5f5;
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

.profile-section {
  margin-bottom: 2rem;
}

.profile-image {
  margin-bottom: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  overflow: hidden;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.profile-title {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.welcome-message {
  max-width: 300px;
  line-height: 1.6;
}

.welcome-message p {
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.signature {
  margin-top: 1.5rem;
  font-style: italic;
}

.signature span:first-child {
  opacity: 0.8;
}

.signature span:last-child {
  font-weight: 600;
  color: #fff;
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
}

.lang-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
}

.company-logo {
  margin-bottom: 2rem;
  text-align: center;
}

.logo {
  max-width: 250px;
  height: auto;
}

.registration-form {
  width: 100%;
  max-width: 450px;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: #333;
  font-size: 1.1rem;
}

.form-input {
  width: 400px;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #1e3c72;
}

.submit-btn {
  width: 400px;
  padding: 1.2rem;
  background: #1e3c72;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .center-content {
    max-width: 450px;
  }
  
  .registration-form {
    max-width: 400px;
  }
  
  .form-input,
  .submit-btn {
    width: 350px;
  }
  
  .logo {
    max-width: 220px;
  }
}

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
  
  .profile-image {
    width: 120px;
    height: 120px;
  }
  
  .profile-name {
    font-size: 1.3rem;
  }
  
  .center-content {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .logo {
    max-width: 180px;
  }
  
  .form-input,
  .submit-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style> 