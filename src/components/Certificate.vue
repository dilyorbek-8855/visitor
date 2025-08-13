<template>
  <div class="certificate-page">
    <div class="certificate-container">
      <div class="certificate-wrapper">
        <!-- Certificate Background Image - Different for web vs print -->
        <img 
          :src="currentCertificateImage" 
          :alt="showPrintVersion ? 'Certificate (Print Version)' : 'Certificate (Web Version)'" 
          class="certificate-image"
        >
        
        <!-- Text Overlays -->
        <div class="certificate-overlay">
          <!-- Certificate Title -->
          <h1 class="certificate-title" id="certificateTitle">
            {{ translations[currentLanguage].certificateTitle }}
          </h1>
          
          <!-- Certificate Purpose -->
          <p class="certificate-purpose" id="certificatePurpose">
            {{ translations[currentLanguage].certificatePurpose }}
          </p>
          
          <!-- Recipient Name -->
          <div class="recipient-name" id="recipientName">
            {{ visitorStore.fullName }}
          </div>
          
          <!-- Certificate Issuer -->
          <p class="certificate-issuer" id="certificateIssuer">
            {{ translations[currentLanguage].certificateIssuer }}
          </p>
          
          <!-- Director Name and Signature (Website Only) -->
          <div class="director-info" v-if="!showPrintVersion">
            <div class="director-name">S.A.Mamadaliyev</div>
            <div class="director-title">Direksiya direktori</div>
          </div>
          
          <!-- QR Code (Print Only) -->
          <div class="qr-code-container" v-if="showPrintVersion">
            <img :src="qrCodeUrl" alt="QR Code" class="qr-code">
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        <!-- Debug Switch (Hidden in Production) -->
        <div class="debug-switch">
          <label class="debug-label">
            <input 
              type="checkbox" 
              v-model="showPrintVersion" 
              class="debug-checkbox"
            >
            <span class="debug-text">Debug: Show Print Version</span>
          </label>
        </div>
        
        <button @click="printCertificate" class="action-btn print-btn">
          {{ translations[currentLanguage].printCertificate }}
        </button>
        <button @click="backToQuiz" class="action-btn back-btn">
          {{ translations[currentLanguage].backToQuiz }}
        </button>
        <button @click="startOver" class="action-btn start-btn">
          {{ translations[currentLanguage].startOver }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVisitorStore } from '../stores/visitor.js'
import { translations } from '../stores/translations.js'

// Import certificate images
import certificateWeb from '../assets/images/certificate-web.png'
import certificatePrint from '../assets/images/certificate-print.png'

export default {
  name: 'Certificate',
  setup() {
    const router = useRouter()
    const visitorStore = useVisitorStore()
    const currentLanguage = ref('uz')
    const qrCodeUrl = ref('')
    const showPrintVersion = ref(false) // New ref for debug switch

    // Computed property to determine which certificate image to use
    const currentCertificateImage = computed(() => {
      return showPrintVersion.value 
        ? certificatePrint
        : certificateWeb
    })

    // Generate QR code for current certificate page
    const generateQRCode = () => {
      // Get the actual domain (works for both localhost and production)
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      const port = window.location.port ? `:${window.location.port}` : ''
      
      // Include visitor data in the URL
      const visitorName = encodeURIComponent(visitorStore.fullName)
      const certificateId = visitorStore.certificateNumber || 'CERT' + Date.now()
      const path = `/certificate?name=${visitorName}&id=${certificateId}`
      
      // Create the full URL with visitor data
      const certificateUrl = `${protocol}//${hostname}${port}${path}`
      
      // Using a free QR code API service
      qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(certificateUrl)}`
    }

    const printCertificate = () => {
      // Temporarily switch to print version before printing
      showPrintVersion.value = true
      
      // Use setTimeout to ensure the DOM updates before printing
      setTimeout(() => {
        window.print()
        // Switch back to web version after printing
        setTimeout(() => {
          showPrintVersion.value = false
        }, 100)
      }, 100)
    }

    const backToQuiz = () => {
      router.push('/quiz')
    }

    const startOver = () => {
      visitorStore.resetAll()
      router.push('/')
    }

    onMounted(() => {
      // Set language from store
      currentLanguage.value = visitorStore.currentLanguage
      
      // Check if visitor data exists and quiz is completed
      if (!visitorStore.visitorData.lastName || !visitorStore.isQuizCompleted) {
        // Check if we have data in URL parameters (from QR code scan)
        const urlParams = new URLSearchParams(window.location.search)
        const nameFromUrl = urlParams.get('name')
        const idFromUrl = urlParams.get('id')
        
        if (nameFromUrl && idFromUrl) {
          // This is a QR code scan - create temporary visitor data
          visitorStore.visitorData = {
            firstName: nameFromUrl.split(' ')[0] || '',
            lastName: nameFromUrl.split(' ').slice(1).join(' ') || '',
            middleName: ''
          }
          visitorStore.certificateNumber = idFromUrl
          visitorStore.quizCompleted = true
          console.log('Certificate accessed via QR code:', { name: nameFromUrl, id: idFromUrl })
        } else {
          // No data available, redirect to welcome
          router.push('/')
          return
        }
      }
      
      // Debug: Log visitor data
      console.log('Visitor Data:', visitorStore.visitorData)
      console.log('Full Name:', visitorStore.fullName)
      
      // Generate QR code
      generateQRCode()
    })

    // Watch language changes
    watch(currentLanguage, (newLang) => {
      visitorStore.setLanguage(newLang)
    })

    return {
      currentLanguage,
      visitorStore,
      translations,
      qrCodeUrl,
      printCertificate,
      backToQuiz,
      startOver,
      showPrintVersion, // Expose the new ref
      currentCertificateImage // Expose the new computed property
    }
  }
}
</script>

<style scoped>
/* Certificate Page Styles */
.certificate-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
}

.certificate-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.certificate-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.certificate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.certificate-title {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3.8rem;
  font-weight: normal;
  color: #333;
  margin: 0;
  text-align: center;
}

.certificate-purpose {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.1rem;
  color: #333;
  text-align: center;
  line-height: 1.4;
  max-width: 95%;
  white-space: nowrap;
}

.recipient-name {
  position: absolute;
  top: calc(48% + 10px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.8rem;
  color: #333;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.certificate-issuer {
  position: absolute;
  top: calc(55% + 10px);
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  color: #333;
  text-align: center;
  line-height: 1.4;
}

.qr-code-container {
  position: absolute;
  top: calc(65% + 10px);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.qr-code {
  width: 25%;
  height: auto;
  min-width: 100px;
  border: 2px solid #333;
  border-radius: 8px;
  background: white;
}

/* Director Information Styling */
.director-info {
  position: absolute;
  top: calc(78% + 10px);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.director-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.2rem;
}

.director-title {
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 1rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.print-btn {
  background: #28a745;
  color: white;
}

.print-btn:hover {
  background: #218838;
}

.back-btn {
  background: #6c757d;
  color: white;
}

.back-btn:hover {
  background: #5a6268;
}

.start-btn {
  background: #dc3545;
  color: white;
}

.start-btn:hover {
  background: #c82333;
}

/* Debug Switch Styles */
.debug-switch {
  position: absolute;
  top: 10px; /* Adjust position as needed */
  left: 10px; /* Adjust position as needed */
  z-index: 10; /* Ensure it's above other content */
  background-color: #e9ecef;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.debug-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.debug-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #28a745; /* Customize checkbox color */
}

.debug-text {
  font-size: 0.8rem;
  color: #333;
}

/* Print Media Queries */
@media print {
  /* Hide director info in print */
  .director-info {
    display: none !important;
  }
  
  /* Show QR code in print */
  .qr-code-container {
    display: block !important;
  }
  
  /* Hide action buttons in print */
  .action-buttons {
    display: none !important;
  }
  
  /* Remove background and shadows for print */
  .certificate-page {
    background: white;
    padding: 0;
  }
  
  .certificate-container {
    box-shadow: none;
    border-radius: 0;
  }
  

}

/* Debug Switch Logic */
/* No need for website-only and print-only classes anymore */

/* Responsive Design */
@media (max-width: 768px) {
  .certificate-page {
    padding: 1rem;
  }
  
  .certificate-wrapper {
    height: 500px;
  }
  
  .certificate-title {
    font-size: 2rem;
    top: 12%;
  }
  
  .certificate-purpose {
    font-size: 1rem;
    top: 22%;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    min-width: 200px;
  }
}
</style> 