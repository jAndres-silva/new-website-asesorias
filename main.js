// ==========================================
// JHROYETT RESEARCH - JAVASCRIPT CORREGIDO
// ==========================================

// ==========================================
// 0. INICIALIZACIÓN DE AOS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: "top-bottom",
      disable: function () {
        // ✅ CORREGIDO: Solo verificar el ancho de pantalla
        return window.innerWidth < 576;
      },
    });

    console.log("✨ AOS inicializado correctamente");
  }

  // Remover clase de loading después de que el DOM esté listo
  setTimeout(function () {
    document.body.classList.remove("aos-loading");
    document.body.classList.add("aos-ready");
  }, 100);
});

// ==========================================
// 1. NAVBAR SCROLL EFFECT
// ==========================================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ==========================================
// 2. ANIMATED COUNTER FOR HERO STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  const easeOutQuad = (t) => t * (2 - t);

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const current = start + (target - start) * easedProgress;

    if (target % 1 !== 0) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
    }
  };

  requestAnimationFrame(updateCounter);
}

// Intersection Observer para activar contadores
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseFloat(stat.getAttribute("data-target"));
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px",
  }
);

// ==========================================
// 3. SMOOTH SCROLL PARA NAVEGACIÓN
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Cerrar menú móvil si está abierto
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }

      // Actualizar link activo
      document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// ==========================================
// 4. PARALLAX EFFECT EN HERO
// ==========================================
let isScrolling = false;
window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector(".hero-section");

      if (heroSection && scrolled < window.innerHeight) {
        const parallaxElements = document.querySelectorAll(".hero-decoration");
        parallaxElements.forEach((element, index) => {
          const speed = (index + 1) * 0.1;
          element.style.transform = `translateY(${scrolled * speed}px)`;
        });
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// ==========================================
// 5. BOTÓN DE WHATSAPP FLOTANTE
// ==========================================
function createWhatsAppButton() {
  const whatsappBtn = document.createElement("a");
  whatsappBtn.href =
    "https://wa.me/573001234567?text=Hola,%20quiero%20información%20sobre%20asesoría%20de%20tesis";
  whatsappBtn.target = "_blank";
  whatsappBtn.className = "whatsapp-float";
  whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
  whatsappBtn.title = "Contáctanos por WhatsApp";

  // Agregar animación AOS al botón
  whatsappBtn.setAttribute("data-aos", "zoom-in");
  whatsappBtn.setAttribute("data-aos-delay", "1500");

  document.body.appendChild(whatsappBtn);
}

// ==========================================
// 6. BACK TO TOP BUTTON
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    let scrollTimer;

    window.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add("show");
          backToTopBtn.style.transform = "scale(1)";
        } else {
          backToTopBtn.classList.remove("show");
          backToTopBtn.style.transform = "scale(0)";
        }
      }, 100);
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// ==========================================
// 7. MANEJO DE FORMULARIOS
// ==========================================
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  // Simular envío
  setTimeout(() => {
    console.log("Datos del formulario:", data);

    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado con éxito!';
    submitBtn.classList.add("success");

    showCustomAlert(
      "¡Gracias por tu interés! Te contactaremos en menos de 24 horas."
    );

    setTimeout(() => {
      event.target.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove("success");
    }, 3000);
  }, 2000);
}

// Función para mostrar alertas personalizadas
function showCustomAlert(message) {
  const alertDiv = document.createElement("div");
  alertDiv.className = "custom-alert";
  alertDiv.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <p>${message}</p>
  `;
  alertDiv.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    z-index: 9999;
    animation: slideInDown 0.5s ease;
  `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.style.animation = "slideOutUp 0.5s ease";
    setTimeout(() => alertDiv.remove(), 500);
  }, 4000);
}

// ==========================================
// 8. LAZY LOADING DE IMÁGENES
// ==========================================
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// ==========================================
// 9. DETECCIÓN DE DISPOSITIVO MÓVIL
// ==========================================
function detectMobileDevice() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    document.body.classList.add("mobile-device");
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  } else {
    document.body.classList.add("desktop-device");
  }
}

// ==========================================
// 10. VIDEO MODAL FUNCTIONS
// ==========================================
function playVideo() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoIframe");

  if (modal && iframe) {
    iframe.src = "https://www.youtube.com/embed/p0odcJAzplI?autoplay=1";
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoIframe");

  if (modal && iframe) {
    iframe.src = "";
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Cerrar video con tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVideo();
  }
});

// ==========================================
// 11. SWIPER TESTIMONIALS INITIALIZATION
// ==========================================
function initTestimonialsSwiper() {
  // ✅ CORREGIDO: Verificar que Swiper existe
  if (typeof Swiper === "undefined") {
    console.warn("⚠️ Swiper no disponible");
    return;
  }

  const testimonialsSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    navigation: {
      nextEl: ".testimonial-next",
      prevEl: ".testimonial-prev",
    },
    effect: "slide",
    breakpoints: {
      // Solo mostrar 2 slides en desktop grande
      1200: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
    on: {
      init: function () {
        updatePagination(this);
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      },
      slideChange: function () {
        updatePagination(this);
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      },
    },
  });

  function updatePagination(swiper) {
    const currentSlide = document.querySelector(".current-slide");
    const totalSlides = document.querySelector(".total-slides");

    if (currentSlide && totalSlides) {
      let realIndex = swiper.realIndex + 1;
      currentSlide.textContent = realIndex;
      totalSlides.textContent = swiper.slides.length - swiper.loopedSlides * 2;
    }
  }
}

// ==========================================
// 12. ANIMATED CREDENTIALS IN ABOUT SECTION
// ==========================================
function animateCredentialNumber(element, targetText, duration = 2000) {
  const numberMatch = targetText.match(/[\d.]+/);

  if (!numberMatch) {
    element.textContent = targetText;
    return;
  }

  const targetNumber = parseFloat(numberMatch[0]);
  const hasPlus = targetText.includes("+");
  const hasSlash = targetText.includes("/");
  const afterSlash = hasSlash ? targetText.split("/")[1] : "";

  const startTime = performance.now();
  const easeOutQuad = (t) => t * (2 - t);

  const updateNumber = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuad(progress);
    const current = targetNumber * easedProgress;

    if (hasPlus) {
      element.textContent = "+" + Math.floor(current);
    } else if (hasSlash) {
      element.textContent = current.toFixed(2) + "/" + afterSlash;
    } else if (targetText.includes("Años")) {
      element.textContent = Math.floor(current) + " Años";
    } else {
      element.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = targetText;
    }
  };

  requestAnimationFrame(updateNumber);
}

// Intersection Observer para credenciales
const credentialsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const credentialNumbers =
          entry.target.querySelectorAll(".credential-number");

        credentialNumbers.forEach((numberEl) => {
          const originalText =
            numberEl.getAttribute("data-original") || numberEl.textContent;
          if (!numberEl.getAttribute("data-original")) {
            numberEl.setAttribute("data-original", originalText);
          }
          animateCredentialNumber(numberEl, originalText);
        });

        credentialsObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px",
  }
);

// ==========================================
// 13. SCROLL PROGRESS BAR
// ==========================================
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #007bff 0%, #00bfff 100%);
    z-index: 9999;
    transition: width 0.2s ease;
    width: 0%;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;
  });
}

// ==========================================
// 14. REFRESH AOS ON WINDOW RESIZE
// ==========================================
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 250);
});

// ==========================================
// INICIALIZACIÓN AL CARGAR EL DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 DOM Cargado - Iniciando componentes...");

  // Inicializar observador de stats
  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Inicializar observer de credenciales
  const credentialsGrid = document.querySelector(".credentials-grid");
  if (credentialsGrid) {
    credentialsObserver.observe(credentialsGrid);
  }

  // Inicializar otros componentes
  createWhatsAppButton();
  initBackToTop();
  initLazyLoading();
  detectMobileDevice();
  initScrollProgress();

  // Agregar event listeners a formularios
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  console.log("✅ JHRoyett Research - Website cargado correctamente");
});

// ==========================================
// PREVENIR ANIMACIONES EN CARGA INICIAL
// ==========================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // ✅ CORREGIDO: Inicializar Swiper después de cargar
  if (typeof Swiper !== "undefined") {
    initTestimonialsSwiper();
  }

  // Refrescar AOS después de que todo esté cargado
  if (typeof AOS !== "undefined") {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }

  console.log("🎉 Todo cargado completamente");
});

// ==========================================
// ANIMACIONES CSS ADICIONALES
// ==========================================
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
  /* Animaciones para alertas */
  @keyframes slideInDown {
    from {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutUp {
    from {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    to {
      transform: translate(-50%, -100%);
      opacity: 0;
    }
  }
  
  /* Loading state para body */
  body.aos-loading {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  body.aos-ready {
    opacity: 1;
  }
  
  /* Botón WhatsApp mejorado */
  .whatsapp-float {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 30px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .whatsapp-float:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
    color: white;
    text-decoration: none;
  }
  
  /* Estado success para formulario */
  .btn-submit-form.success {
    background: #28a745 !important;
    border-color: #28a745 !important;
  }
  
  /* Active nav link */
  .navbar-nav .nav-link.active {
    color: #007bff !important;
    position: relative;
  }
  
  .navbar-nav .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 2px;
    background: #007bff;
    animation: slideIn 0.3s ease;
  }
  
  @keyframes slideIn {
    from {
      width: 0;
    }
    to {
      width: 30px;
    }
  }
`;
document.head.appendChild(additionalStyles);

console.log("🎯 JHRoyett Research JavaScript cargado");
