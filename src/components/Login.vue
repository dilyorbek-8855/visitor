<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Language Selector - Top Right -->
      <div class="language-selector">
        <select v-model="currentLanguage" class="lang-select">
          <option value="uz">O'z</option>
          <option value="ru">Ру</option>
          <option value="en">En</option>
        </select>
      </div>
      
      <div class="logo-section">
        <img src="../assets/images/logo.png" alt="R&D Center Logo" class="logo">
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">{{ translations[currentLanguage].login }}</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            :placeholder="translations[currentLanguage].enterLogin"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="password">{{ translations[currentLanguage].password }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            :placeholder="translations[currentLanguage].enterPassword"
            required
          >
        </div>
        
        <button type="submit" class="login-btn">{{ translations[currentLanguage].loginButton }}</button>
      </form>
      
      <div v-if="errorMessage" class="error-message">
        {{ translations[currentLanguage].invalidCredentials }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const currentLanguage = ref('uz')
    const router = useRouter()

    // Static credentials
    const VALID_USERNAME = 'rd_center'
    const VALID_PASSWORD = 'rd_center'

    // Translations for login page
    const translations = {
      uz: {
        login: 'Login',
        password: 'Parol',
        enterLogin: 'Loginni kiriting',
        enterPassword: 'Parolni kiriting',
        loginButton: 'Kirish',
        invalidCredentials: 'Noto\'g\'ri login yoki parol'
      },
      ru: {
        login: 'Логин',
        password: 'Пароль',
        enterLogin: 'Введите логин',
        enterPassword: 'Введите пароль',
        loginButton: 'Войти',
        invalidCredentials: 'Неверный логин или пароль'
      },
      en: {
        login: 'Login',
        password: 'Password',
        enterLogin: 'Enter login',
        enterPassword: 'Enter password',
        loginButton: 'Login',
        invalidCredentials: 'Invalid login or password'
      }
    }

    const handleLogin = () => {
      if (username.value === VALID_USERNAME && password.value === VALID_PASSWORD) {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true')
        // Redirect to welcome page
        router.push('/')
      } else {
        errorMessage.value = translations[currentLanguage.value].invalidCredentials
        // Clear password field
        password.value = ''
      }
    }

    return {
      username,
      password,
      errorMessage,
      currentLanguage,
      translations,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
}

.language-selector {
  position: absolute;
  top: 20px;
  right: 20px;
}

.lang-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  background: white;
  transition: border-color 0.3s ease;
}

.lang-select:focus {
  outline: none;
  border-color: #1e3c72;
}

.logo-section {
  margin-bottom: 30px;
  margin-top: 20px;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 15px;
}

.login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #1e3c72;
}

.login-btn {
  width: 100%;
  background: #1e3c72;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-btn:hover {
  background: #152a4f;
}

.login-btn:active {
  background: #1e3c72;
}

.error-message {
  color: #e74c3c;
  background: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 12px;
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .logo {
    width: 100px;
    height: 100px;
  }
  
  .language-selector {
    top: 15px;
    right: 15px;
  }
}
</style> 