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

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

function disableOrEnableArrows(slides, prevButton, nextButton, targetIndex) {
  prevButton.disabled = false;
  nextButton.disabled = false;

  if (targetIndex === 0) {
    prevButton.disabled = true;
  } else if (targetIndex === slides.length - 1) {
    nextButton.disabled = true;
  }
}

function handleNextClick(e) {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  // Move to the next slide
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  disableOrEnableArrows(slides, prevButton, nextButton, nextIndex);
}

function handlePrevClick(e) {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  // Move to the next slide
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  disableOrEnableArrows(slides, prevButton, nextButton, prevIndex);
}

function handleDotClick(e) {
  const targetDot = e.target.closest('button.carousel__indicator');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];
  const currentDot = dotsNav.querySelector('.current-slide');

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  disableOrEnableArrows(slides, prevButton, nextButton, targetIndex);
}

// Arrange slides next to each other
for (const index in slides) {
  setSlidePosition(slides[index], index);
}

// When right arrow is clicked, move slides to the right
nextButton.addEventListener('click', handleNextClick);

// When left arrow is clicked, move slides to the left
prevButton.addEventListener('click', handlePrevClick);

// When the nav indicators are clicked, move to that slide
dotsNav.addEventListener('click', handleDotClick);
