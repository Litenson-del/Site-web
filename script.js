/* =========================================================
   Jacmel Tourisme — script.js
   Mode sombre, diaporama, menu mobile, retour en haut,
   horodatage du pied de page et validation du formulaire
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initHamburgerMenu();
  initSlideshow();
  initBackToTop();
  initFooterDatetime();
  initContactForm();
   alert("Bienvenue sur le site de Jacmel Devant!");


});

/* ---------------------------------------------------------
   1) Mode sombre / mode nuit
   --------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggle");
  if (!themeBtn) return;

  const STORAGE_KEY = "jacmel-theme";
  const saved = localStorage.getItem(STORAGE_KEY);

  const applyTheme = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    themeBtn.textContent = isDark ? "☀️ Mode jour" : "🌙 Mode nuit";
  };

  // Respecte le choix enregistré, sinon la préférence système
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved ? saved === "dark" : prefersDark);

  themeBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  });
}

/* ---------------------------------------------------------
   2) Menu hamburger (mobile)
   --------------------------------------------------------- */
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Ferme le menu après un clic sur un lien (mobile)
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("show"));
  });
}

/* ---------------------------------------------------------
   3) Diaporama automatique
   --------------------------------------------------------- */
function initSlideshow() {
  const container = document.querySelector(".diaporama-container");
  if (!container) return;

  const slides = Array.from(container.querySelectorAll(".slideshow"));
  if (slides.length === 0) return;

  // Crée les points de navigation
  const dotsWrapper = document.createElement("div");
  dotsWrapper.className = "slideshow-dots";
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    if (index === 0) dot.classList.add("active-dot");
    dot.addEventListener("click", () => goToSlide(index));
    dotsWrapper.appendChild(dot);
  });
  container.appendChild(dotsWrapper);
  const dots = Array.from(dotsWrapper.children);

  let current = 0;
  const DELAY = 4000;
  let timer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active-slide", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active-dot", i === index));
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function goToSlide(index) {
    showSlide(index);
    restartTimer();
  }

  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, DELAY);
  }

  showSlide(0);
  restartTimer();

  // Pause au survol
  container.addEventListener("mouseenter", () => clearInterval(timer));
  container.addEventListener("mouseleave", restartTimer);
}

/* ---------------------------------------------------------
   4) Bouton retour en haut
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backtoTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 300);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
    // 5. MIZIK DE FON (JWE SOU NENPÒT PREMYE KLIKE OSOA TOUCHE)
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
        bgMusic.volume = 0.5;

        const playAudio = () => {
            bgMusic.play().then(() => {
                // Si l reyalize jwe, retire tout koutè sa yo
                window.removeEventListener("click", playAudio);
                window.removeEventListener("touchstart", playAudio);
                window.removeEventListener("scroll", playAudio);
                window.removeEventListener("keydown", playAudio);
            }).catch(() => {
                // Navigatè a toujou bloke l, l ap tann yon lòt klike
            });
        };

        // Koute sou tout fenèt la nèt (window)
        window.addEventListener("click", playAudio);
        window.addEventListener("touchstart", playAudio);
        window.addEventListener("scroll", playAudio);
        window.addEventListener("keydown", playAudio);

        // Kòmanse jwe touswit si navigatè a pèmèt li san blokaj
        playAudio();

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                bgMusic.pause();
            } else {
                bgMusic.play().catch(() => {});
            }
        });
    }



/* ---------------------------------------------------------
   6) Date et heure dans le pied de page
   --------------------------------------------------------- */
function initFooterDatetime() {
  const el = document.getElementById("datetime");
  if (!el) return;

  const update = () => {
    const now = new Date();
    const formatted = now.toLocaleString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    el.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  update();
  setInterval(update, 1000);
}
const form = document.getElementById("form-contact");

if (form) {

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const message = document.getElementById("message").value.trim();

    let valide = true;


    // Masquer toutes les erreurs
    document.querySelectorAll(".error-message").forEach(function(element) {
        element.style.display = "none";
    });


    // Vérification du nom
    if (nom === "") {
        document.getElementById("error-nom").style.display = "block";
        valide = false;
    }


    // Vérification du prénom
    if (prenom === "") {
        document.getElementById("error-prenom").style.display = "block";
        valide = false;
    }


    // Vérification de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
        document.getElementById("error-email").style.display = "block";
        valide = false;
    }


    // Vérification du téléphone
    if (telephone === "") {
        document.getElementById("error-telephone").style.display = "block";
        valide = false;
    }


    // Vérification du message
    if (message === "") {
        document.getElementById("error-message").textContent =
            "Veuillez écrire votre message.";

        document.getElementById("error-message").style.display = "block";

        valide = false;
    }


    // Si une erreur existe
    if (!valide) {
        return;
    }


    // Enregistrer les informations
    const contact = {
        nom: nom,
        prenom: prenom,
        email: email,
        telephone: telephone,
        message: message,
        date: new Date().toLocaleString("fr-FR")
    };


    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));


    // Message de confirmation
    alert(
        "Message envoyé avec succès !\n\n" +
        "Merci " + prenom + " " + nom + ".\n" +
        "Nous avons bien reçu votre message."
    );


    // Réinitialiser le formulaire
    form.reset();

});

}