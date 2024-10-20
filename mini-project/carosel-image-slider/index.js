const carouselSlide = document.querySelector('.carousel-slide')

const carouselImages = document.querySelectorAll('.carousel-slide img')

const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')

const indicators = document.querySelectorAll('.indicator')

let currentIndex = 0
const totalImages = carouselImages.length

let autoSlideInterval;

function updateCarousel(){
    carouselSlide.style.transform = `translateX(${-currentIndex *100}%)`

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex)
    }) 
}

function nextSlide(){
    currentIndex = (currentIndex + 1) % totalImages
    updateCarousel()
    resetAutoSlide()
}

function prevSlide(){
    currentIndex = (currentIndex - 1 + totalImages) % totalImages
    updateCarousel()
    resetAutoSlide()
}

function resetAutoSlide(){
    clearInterval(autoSlideInterval)

    autoSlideInterval = setInterval('click', nextSlide)
}

nextBtn.addEventListener('click', nextSlide)


prevBtn.addEventListener('click', prevSlide)

autoSlideInterval = setInterval(nextSlide, 5000)

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index
        updateCarousel()
        resetAutoSlide()
    })
})