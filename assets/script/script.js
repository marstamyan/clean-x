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
})()
