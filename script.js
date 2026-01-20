// Menunggu halaman sepenuhnya dimuat
window.addEventListener("DOMContentLoaded", (event) => {
  // Sembunyikan loading screen setelah halaman siap
  setTimeout(() => {
    document.getElementById("loading-screen").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loading-screen").style.display = "none";
    }, 500);
  }, 1500);

  // Inisialisasi variabel
  const openInvitationBtn = document.getElementById("open-invitation");
  const invitationContent = document.getElementById("invitation-content");
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");
  const musicStatus = document.getElementById("music-status");
  const backToTopBtn = document.getElementById("backToTop");

  // Slideshow utama (beranda)
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  // Slideshow foto bayi
  let currentBabySlide = 0;
  const babySlides = document.querySelectorAll(".baby-slide");
  const babyIndicators = document.querySelectorAll(".baby-indicator");
  const babyPrevBtn = document.querySelector(".baby-prev");
  const babyNextBtn = document.querySelector(".baby-next");

  // Fungsi untuk mengubah slide utama
  function changeSlide(slideIndex) {
    // Hapus kelas active dari semua slide dan indikator
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Tambah kelas active ke slide dan indikator yang dipilih
    slides[slideIndex].classList.add("active");
    indicators[slideIndex].classList.add("active");

    currentSlide = slideIndex;
  }

  // Fungsi untuk mengubah slide foto bayi
  function changeBabySlide(slideIndex) {
    // Hapus kelas active dari semua slide dan indikator
    babySlides.forEach((slide) => slide.classList.remove("active"));
    babyIndicators.forEach((indicator) => indicator.classList.remove("active"));

    // Tambah kelas active ke slide dan indikator yang dipilih
    babySlides[slideIndex].classList.add("active");
    babyIndicators[slideIndex].classList.add("active");

    currentBabySlide = slideIndex;
  }

  // Otomatis ganti slide utama setiap 5 detik
  let slideInterval = setInterval(() => {
    let nextSlide = (currentSlide + 1) % slides.length;
    changeSlide(nextSlide);
  }, 5000);

  // Event listener untuk indikator slide utama
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      clearInterval(slideInterval);
      changeSlide(index);

      // Restart interval
      slideInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        changeSlide(nextSlide);
      }, 5000);
    });
  });

  // Event listener untuk navigasi slide bayi
  babyPrevBtn.addEventListener("click", () => {
    let prevSlide =
      (currentBabySlide - 1 + babySlides.length) % babySlides.length;
    changeBabySlide(prevSlide);
  });

  babyNextBtn.addEventListener("click", () => {
    let nextSlide = (currentBabySlide + 1) % babySlides.length;
    changeBabySlide(nextSlide);
  });

  // Event listener untuk indikator slide bayi
  babyIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      changeBabySlide(index);
    });
  });

  // Tombol buka undangan
  openInvitationBtn.addEventListener("click", function () {
    // Animasi tombol
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);

    // Tampilkan konten undangan
    invitationContent.classList.add("active");

    // Scroll ke konten undangan
    setTimeout(() => {
      invitationContent.scrollIntoView({ behavior: "smooth" });
    }, 300);

    // Mulai countdown jika belum dimulai
    updateCountdown();

    // Mulai musik jika belum dimulai
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          musicStatus.textContent = "Musik Menyala";
          musicToggle.innerHTML =
            '<i class="fas fa-music"></i> <span id="music-status">Musik Menyala</span>';
        })
        .catch((error) => {
          console.log("Autoplay diblokir oleh browser");
        });
    }
  });

  // Kontrol musik
  let isMusicPlaying = false;

  musicToggle.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play();
      musicStatus.textContent = "Musik Menyala";
      this.innerHTML =
        '<i class="fas fa-music"></i> <span id="music-status">Musik Menyala</span>';
      isMusicPlaying = true;
    } else {
      bgMusic.pause();
      musicStatus.textContent = "Putar Musik";
      this.innerHTML =
        '<i class="fas fa-music"></i> <span id="music-status">Putar Musik</span>';
      isMusicPlaying = false;
    }
  });

  // Otomatis putar musik dengan interaksi pengguna
  document.addEventListener("click", function initAudio() {
    if (bgMusic.paused && !isMusicPlaying) {
      bgMusic
        .play()
        .then(() => {
          musicStatus.textContent = "Musik Menyala";
          musicToggle.innerHTML =
            '<i class="fas fa-music"></i> <span id="music-status">Musik Menyala</span>';
          isMusicPlaying = true;
        })
        .catch((error) => {
          console.log("Autoplay diblokir, menunggu interaksi pengguna");
        });
    }
    // Hapus event listener setelah interaksi pertama
    document.removeEventListener("click", initAudio);
  });

  // Hitung mundur pernikahan - Diperbarui untuk 22 Januari 2026
  function updateCountdown() {
    // Tanggal pernikahan: 22 Januari 2026, jam 11:00
    const weddingDate = new Date("January 22, 2026 11:00:00").getTime();

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      // Jika tanggal sudah lewat
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector(".countdown-container").innerHTML =
          '<div class="countdown-box"><div class="countdown-number">00</div><div class="countdown-label">Hari</div></div>' +
          '<div class="countdown-box"><div class="countdown-number">00</div><div class="countdown-label">Jam</div></div>' +
          '<div class="countdown-box"><div class="countdown-number">00</div><div class="countdown-label">Menit</div></div>' +
          '<div class="countdown-box"><div class="countdown-number">00</div><div class="countdown-label">Detik</div></div>';
        document.querySelector(".countdown-text").textContent =
          "Hari bahagia telah tiba!";
        return;
      }

      // Hitung hari, jam, menit, detik
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Tampilkan hasil
      document.getElementById("days").textContent = days
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutes
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = seconds
        .toString()
        .padStart(2, "0");

      // Animasi angka berubah
      animateValue("days", days);
      animateValue("hours", hours);
      animateValue("minutes", minutes);
      animateValue("seconds", seconds);
    }, 1000);
  }

  // Animasi perubahan angka countdown
  function animateValue(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);

    if (currentValue !== newValue) {
      element.style.transform = "scale(1.2)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 300);
    }
  }

  // Tombol kembali ke atas
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animasi untuk elemen saat scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Terapkan animasi untuk semua bagian
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Animasi untuk galeri
  document.querySelectorAll(".gallery-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  // Inisialisasi countdown saat halaman dimuat
  updateCountdown();

  // Tambahkan efek konfetti saat membuka undangan
  openInvitationBtn.addEventListener("click", function () {
    createConfetti();
  });

  // Fungsi untuk membuat efek konfetti
  function createConfetti() {
    const confettiCount = 100;
    const container = document.querySelector(".cover-section");

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.width = Math.random() * 10 + 5 + "px";
      confetti.style.height = Math.random() * 10 + 5 + "px";
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.position = "fixed";
      confetti.style.borderRadius = "50%";
      confetti.style.top = "-10px";
      confetti.style.zIndex = "9999";
      confetti.style.opacity = "0.8";

      document.body.appendChild(confetti);

      // Animasi konfetti
      const animation = confetti.animate(
        [
          { transform: "translateY(0) rotate(0deg)", opacity: 0.8 },
          {
            transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        },
      );

      // Hapus konfetti setelah animasi selesai
      animation.onfinish = () => {
        confetti.remove();
      };
    }
  }

  // Fungsi untuk menghasilkan warna acak
  function getRandomColor() {
    const colors = [
      "#d4a574",
      "#8b5a2b",
      "#e74c3c",
      "#f1c40f",
      "#2ecc71",
      "#3498db",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Tambahkan efek klik pada gambar galeri
  document
    .querySelectorAll(".gallery-item img, .baby-image-container img")
    .forEach((img) => {
      img.addEventListener("click", function () {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0,0,0,0.8)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "10000";

        const modalImg = document.createElement("img");
        modalImg.src = this.src;
        modalImg.style.maxWidth = "90%";
        modalImg.style.maxHeight = "90%";
        modalImg.style.borderRadius = "10px";
        modalImg.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener("click", function () {
          document.body.removeChild(modal);
        });
      });
    });

  // Tambahkan efek ketikan pada judul
  const coupleNames = document.querySelector(".couple-names");
  const groomName = document.querySelector(".groom-name");
  const brideName = document.querySelector(".bride-name");

  // Simpan teks asli
  const groomText = groomName.textContent;
  const brideText = brideName.textContent;

  // Kosongkan teks awal
  groomName.textContent = "";
  brideName.textContent = "";

  // Fungsi untuk mengetik teks
  function typeWriter(element, text, speed, callback) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else if (callback) {
        callback();
      }
    }
    typing();
  }

  // Mulai efek ketikan setelah halaman dimuat
  setTimeout(() => {
    typeWriter(groomName, groomText, 100, () => {
      setTimeout(() => {
        typeWriter(brideName, brideText, 100);
      }, 300);
    });
  }, 2000);
});
