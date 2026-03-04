;(function () {
  //burger menu
  const headerNav = document.querySelector(".header__nav")
  const navLinks = document.querySelectorAll(".nav__link")
  const burger = document.querySelector(".burger")

  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("burger-active")
      headerNav.classList.toggle("menu-active")
    })
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!burger.classList.contains("burger-active")) return
      headerNav.classList.remove("menu-active")
      burger.classList.remove("burger-active")
    })
  })

  //video
  const videoThumbnail = document.querySelector(".video-thumbnail")
  const playButton = document.querySelector(".play-button")
  const customVideo = document.querySelector(".video-player")

  playButton.addEventListener("click", () => {
    videoThumbnail.style.display = "none"
    playButton.style.display = "none"
    customVideo.style.display = "block"

    const playPromise = customVideo.play()

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Автовоспроизведение заблокировано.")
      })
    }
  })

  //animation init
  AOS.init({
    disable: function () {
      return window.innerWidth < 1024
    },
    duration: 550,
  })

  // sticky header shadow on scroll
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // back to top button
  const backToTop = document.getElementById("backToTop")
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible")
      } else {
        backToTop.classList.remove("visible")
      }
    })
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // animated counters for statistics section
  function animateCounter(el, target, duration) {
    const isK = String(target).includes("k")
    const isDecimal = !isK && target < 100
    const numericTarget = isK ? parseFloat(target) * 1000 : parseFloat(target)
    let start = 0
    const step = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= numericTarget) {
        start = numericTarget
        clearInterval(timer)
      }
      if (isK) {
        el.textContent = (start / 1000).toFixed(start < numericTarget ? 1 : 0).replace(".0", "")
      } else {
        el.textContent = Math.floor(start)
      }
    }, 16)
  }

  const statisticSection = document.querySelector(".statistic")
  const counterEls = document.querySelectorAll(".statistic__item-number")

  if (statisticSection && counterEls.length) {
    const targets = ["10", "5k", "20k"]
    let animated = false

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true
          counterEls.forEach((el, i) => {
            el.textContent = "0"
            animateCounter(el, targets[i], 2000)
          })
        }
      })
    }, { threshold: 0.3 })

    observer.observe(statisticSection)
  }
})()
