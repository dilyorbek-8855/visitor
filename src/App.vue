<template>
  <div id="app">
    <Welcome v-if="currentPage === 'welcome'" @start-quiz="startQuiz" />
    <Quiz v-if="currentPage === 'quiz'" @back-to-welcome="backToWelcome" />
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Quiz from './components/Quiz.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Quiz
  },
  data() {
    return {
      currentPage: 'welcome',
      visitorData: null
    }
  },
  methods: {
    startQuiz(formData) {
      this.visitorData = formData
      this.currentPage = 'quiz'
    },
    backToWelcome() {
      this.currentPage = 'welcome'
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