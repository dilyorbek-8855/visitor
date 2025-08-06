<template>
  <div id="app">
    <Welcome v-if="currentPage === 'welcome'" @start-quiz="startQuiz" />
    <Quiz 
      v-if="currentPage === 'quiz'" 
      :visitorData="visitorData" 
      @back-to-welcome="backToWelcome"
      @view-certificate="viewCertificate"
    />
    <Certificate 
      v-if="currentPage === 'certificate'" 
      :certificateData="certificateData"
      @back-to-quiz="backToQuiz"
      @start-over="startOver"
    />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Quiz from './components/Quiz.vue'
import Certificate from './components/Certificate.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Quiz,
    Certificate
  },
  data() {
    return {
      currentPage: 'welcome',
      visitorData: null,
      certificateData: null
    }
  },
  methods: {
    startQuiz(formData) {
      this.visitorData = formData
      this.currentPage = 'quiz'
    },
    backToWelcome() {
      this.currentPage = 'welcome'
      this.visitorData = null
      this.certificateData = null
    },
    viewCertificate(certData) {
      this.certificateData = certData
      this.currentPage = 'certificate'
    },
    backToQuiz() {
      this.currentPage = 'quiz'
    },
    startOver() {
      this.currentPage = 'welcome'
      this.visitorData = null
      this.certificateData = null
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

#app {
  min-height: 100vh;
}
</style> 