<template>
  <div class="certificate-page">
    <div class="certificate-container">
      <div class="certificate-wrapper">
        <!-- Certificate Background Image -->
        <img 
          :src="certificateImage" 
          alt="Certificate" 
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
          

          
          <!-- QR Code -->
          <div class="qr-code-container">
            <img :src="qrCodeUrl" alt="QR Code" class="qr-code">
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="action-buttons">
        
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

// Import certificate image
import certificateImage from '../assets/images/certificate.png'

export default {
  name: 'Certificate',
  setup() {
    const router = useRouter()
    const visitorStore = useVisitorStore()
    const currentLanguage = ref('uz')
    const qrCodeUrl = ref('')

    // Generate QR code for current certificate page
    const generateQRCode = () => {
      // Use the correct domain for production (GitHub Pages) or localhost for development
      let baseUrl
      if (window.location.hostname === 'localhost') {
        // Development environment
        baseUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
      } else {
        // Production environment (GitHub Pages)
        baseUrl = 'https://dilyorbek-8855.github.io/visitor'
      }
      
      // Include visitor data in the URL
      const visitorName = encodeURIComponent(visitorStore.fullName)
      const path = `/certificate?name=${visitorName}`
      
      // Create the full URL with visitor data
      const certificateUrl = `${baseUrl}${path}`
      
      // Using a free QR code API service
      qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(certificateUrl)}`
    }

    const printCertificate = () => {
      // Create a print-friendly version with optimal scaling
      const printWindow = window.open('', '_blank', 'width=800,height=600')
      
      // Get the certificate content
      const certificateContent = document.querySelector('.certificate-wrapper').cloneNode(true)
      
      // Create print-optimized HTML
      const printHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${visitorStore.fullName}</title>
          <style>
            @page {
              size: A4 landscape;
              margin: 10mm;
            }
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
                         .certificate-wrapper {
               width: 100%;
               height: 100vh;
               position: relative;
               transform: scale(1);
               transform-origin: center center;
               display: flex;
               justify-content: center;
               align-items: center;
             }
            .certificate-image {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .certificate-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
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
                         @media print {
               .certificate-wrapper {
                 transform: scale(1);
                 transform-origin: center center;
               }
             }
          </style>
        </head>
        <body>
          ${certificateContent.outerHTML}
        </body>
        </html>
      `
      
      printWindow.document.write(printHTML)
      printWindow.document.close()
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          // Close the window after printing
          setTimeout(() => {
            printWindow.close()
          }, 1000)
        }, 500)
      }
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
        let nameFromUrl = null
        
        const urlParams = new URLSearchParams(window.location.search)
        nameFromUrl = urlParams.get('name')
        
        if (nameFromUrl) {
          // This is a QR code scan - create temporary visitor data
          visitorStore.visitorData = {
            firstName: nameFromUrl.split(' ')[0] || '',
            lastName: nameFromUrl.split(' ').slice(1).join(' ') || ''
          }
          visitorStore.quizCompleted = true
          console.log('Certificate accessed via QR code:', { name: nameFromUrl })
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
      certificateImage
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



/* Print Media Queries */
@media print {
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