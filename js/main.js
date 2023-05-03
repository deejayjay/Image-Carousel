const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Set slide position based on index
function setSlidePosition(slide, index) {
  slide.style.left = slideWidth * index + 'px';
}

// Arrange slides next to each other
for (const index in slides) {
  setSlidePosition(slides[index], index);
}

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

// When right arrow is clicked, move slides to the right
nextButton.addEventListener('click', handleNextClick);

function handleNextClick() {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;

  // Move to the next slide
  moveToSlide(track, currentSlide, nextSlide);

  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  nextDot.classList.add('current-slide');
  currentDot.classList.remove('current-slide');
}

// When left arrow is clicked, move slides to the left
prevButton.addEventListener('click', handlePrevClick);

function handlePrevClick() {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  // Move to the next slide
  moveToSlide(track, currentSlide, prevSlide);

  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.previousElementSibling;
  nextDot.classList.add('current-slide');
  currentDot.classList.remove('current-slide');
}

// When the nav indicators are clicked, move to that slide
