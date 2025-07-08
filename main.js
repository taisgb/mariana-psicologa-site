document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const menuLines = mobileMenuBtn?.querySelectorAll("span");

 function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (menuLines) {
      menuLines[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      menuLines[1].style.opacity = "0";
      menuLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    }
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "auto";
    if (menuLines) {
      menuLines[0].style.transform = "none";
      menuLines[1].style.opacity = "1";
      menuLines[2].style.transform = "none";
    }
  }

  function toggleMobileMenu() {
    if (mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  mobileMenuBtn?.addEventListener("click", toggleMobileMenu);
  closeMenuBtn?.addEventListener("click", closeMobileMenu);

  const mobileMenuLinks = mobileMenu?.querySelectorAll("a") || [];
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        closeMobileMenu();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Animações de Scroll
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in")
    fadeElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  const fadeElements = document.querySelectorAll(".fade-in")
  fadeElements.forEach((element) => {
    // Aplica animação apenas em telas maiores que 767px
    if (window.innerWidth > 767) {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out"
    } else { // Para telas pequenas, garante que seja visível imediatamente
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
      element.style.transition = "none" // Sem transição para aparecer instantaneamente
    }
  })

  window.addEventListener("scroll", handleScrollAnimations)
  handleScrollAnimations() // Chama a função na carga inicial para elementos visíveis no início

  
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href")
      if (href !== "#" && href.length > 1) {
        const targetElement = document.querySelector(href)
        if (targetElement) {
          event.preventDefault()
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight - 20
          window.scrollTo({ top: targetPosition, behavior: "smooth" })
        }
      }
    })
  })

  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
  })

  const ctaButtons = document.querySelectorAll(".hover-scale")
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })
  images.forEach((img) => imageObserver.observe(img))

  console.log(`
    🌟 Site desenvolvido para Mariana Virgínio - Psicóloga
    💻 Desenvolvido por: taisgb.com.br
    🎨 Design: Moderno, responsivo e acessível
    ⚡ Tecnologias: HTML5, Tailwind CSS, JavaScript Vanilla

    Obrigada por visitar! 💚
  `)
}); 

// Funções utilitárias globais
function debounce(func, wait, immediate) {
  let timeout
  return function executedFunction() {
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(this, args)
  }
}

function isMobileDevice() {
  return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf("IEMobile") !== -1
}

function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const headerHeight = document.querySelector("header").offsetHeight
    const targetPosition = element.offsetTop - headerHeight - offset
    window.scrollTo({ top: targetPosition, behavior: "smooth" })
  }
}

window.MarianaVirginio = {
  scrollToElement,
  isMobileDevice,
  debounce,
}; 