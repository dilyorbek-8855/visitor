<template>
  <div class="welcome-page">
    <div class="layout">
      <!-- Left Blue Panel -->
      <div class="left-panel">
        <div class="profile-section">
          <div class="profile-image">
            <img :src="directorImage" :alt="getDirectorName()" class="profile-pic" @error="handleImageError">
          </div>
          <h2 class="profile-name">{{ getDirectorName() }}</h2>
          <p class="profile-title">{{ translations[currentLang].directorTitle }}</p>
        </div>
        
        <div class="welcome-message">
          <p>{{ translations[currentLang].welcomeMessage }}</p>
          <p>{{ translations[currentLang].requestMessage }}</p>
          <p>{{ translations[currentLang].thankYouMessage }}</p>
          <p class="signature">{{ translations[currentLang].sincerely }},<br>{{ getDirectorName() }}</p>
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

        <!-- Centered Content -->
        <div class="center-content">
          <!-- Company Image Placeholder -->
          <div class="company-image">
            <div class="image-placeholder">Image</div>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="submitForm" class="registration-form">
            <div class="form-group">
              <label for="lastName">{{ translations[currentLang].lastName }} *</label>
              <input 
                type="text" 
                id="lastName" 
                v-model="formData.lastName" 
                required
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="firstName">{{ translations[currentLang].firstName }} *</label>
              <input 
                type="text" 
                id="firstName" 
                v-model="formData.firstName" 
                required
                class="form-input"
              >
            </div>

            <div class="form-group">
              <label for="middleName">{{ translations[currentLang].middleName }}</label>
              <input 
                type="text" 
                id="middleName" 
                v-model="formData.middleName" 
                class="form-input"
              >
            </div>

            <button type="submit" class="submit-btn">
              {{ translations[currentLang].enterTest }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data() {
    return {
      currentLang: 'uz',
      directorImage: '/director.png',
      formData: {
        lastName: '',
        firstName: '',
        middleName: ''
      },
      directorNames: {
        uz: 'Yanush Kovach',
        ru: 'Janos Kovacs',
        en: 'Janos Kovacs'
      },
      translations: {
        uz: {
          directorTitle: 'Bosh Direktor',
          welcomeMessage: 'Hurmatli mehmon! Kompaniyamizga xush kelibsiz, sizni tashrifingizdan hursandmiz.',
          requestMessage: 'Korxona to\'g\'risida fikringizni bildirishingizni so\'raymiz. Sizning fikringiz biz uchun muhim!',
          thankYouMessage: 'Faol ishtirokingiz uchun tashakkur!',
          sincerely: 'Hurmat bilan',
          lastName: 'Familyangiz',
          firstName: 'Ismingiz',
          middleName: 'Sharifingiz',
          enterTest: 'Testga kirish'
        },
        ru: {
          directorTitle: 'Генеральный директор',
          welcomeMessage: 'Уважаемый гость! Добро пожаловать в нашу компанию, мы рады вашему визиту.',
          requestMessage: 'Просим вас выразить свое мнение о предприятии. Ваше мнение важно для нас!',
          thankYouMessage: 'Спасибо за ваше активное участие!',
          sincerely: 'С уважением',
          lastName: 'Фамилия',
          firstName: 'Имя',
          middleName: 'Отчество',
          enterTest: 'Войти в тест'
        },
        en: {
          directorTitle: 'General Director',
          welcomeMessage: 'Dear guest! Welcome to our company, we are glad for your visit.',
          requestMessage: 'We ask you to express your opinion about the enterprise. Your opinion is important to us!',
          thankYouMessage: 'Thank you for your active participation!',
          sincerely: 'Sincerely',
          lastName: 'Last Name',
          firstName: 'First Name',
          middleName: 'Middle Name',
          enterTest: 'Enter Test'
        }
      }
    }
  },
  methods: {
    getDirectorName() {
      return this.directorNames[this.currentLang]
    },
    submitForm() {
      console.log('Form submitted:', this.formData)
      // Navigate to quiz
      this.$emit('start-quiz', this.formData)
    },
    handleImageError(event) {
      // If image fails to load, replace with placeholder
      event.target.style.display = 'none'
      const initials = this.currentLang === 'uz' ? 'YK' : 'JK'
      event.target.parentElement.innerHTML = `
        <div class="profile-pic-placeholder">
          <span class="profile-initials">${initials}</span>
        </div>
      `
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

.welcome-page {
  min-height: 100vh;
}

.layout {
  display: flex;
  min-height: 100vh;
}

/* Left Blue Panel - Adjusted proportions */
.left-panel {
  flex: 0 0 45%; /* Fixed width like in the image */
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.profile-section {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-image {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
  object-position: left center;
  background: #fff;
  transform: translateX(10px) scale(1.2);
}

.profile-pic-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(10px) scale(1.1);
}

.profile-initials {
  font-size: 2rem;
  font-weight: 600;
  color: #1e3c72;
}

.profile-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.profile-title {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.welcome-message {
  max-width: 320px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.welcome-message p {
  margin-bottom: 0.8rem;
}

.signature {
  margin-top: 1.5rem;
  font-weight: 500;
  font-size: 0.85rem;
}

/* Right White Panel - Adjusted proportions */
.right-panel {
  flex: 0 0 55%; /* Fixed width like in the image */
  background: white;
  padding: 2rem 2.5rem;
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

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.company-image {
  margin-bottom: 2rem;
  width: 33.33%; /* 1/3 of the form width */
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

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #333;
  font-size: 0.9rem;
}

.form-input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  height: 40px;
}

.form-input:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 2px rgba(42, 82, 152, 0.1);
}

.submit-btn {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  margin-top: 1rem;
  height: 42px;
  min-width: 140px;
}

.submit-btn:hover {
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  
  .left-panel {
    flex: none;
    padding: 2rem 1rem;
  }
  
  .right-panel {
    flex: none;
    padding: 1.5rem;
  }
  
  .profile-pic {
    width: 100px;
    height: 100px;
    object-position: left center;
    transform: translateX(8px) scale(1.15);
  }
  
  .profile-pic-placeholder {
    width: 100px;
    height: 100px;
    transform: translateX(8px) scale(1.05);
  }
  
  .profile-name {
    font-size: 1.1rem;
  }
  
  .center-content {
    max-width: none;
  }
  
  .company-image {
    width: 40%; /* Slightly larger on mobile */
  }
}
</style> 