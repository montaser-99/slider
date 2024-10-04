const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");
const pagination = document.querySelector(".pagination");

const cards = carousel.querySelectorAll(".card");
const firstCard = cards[0];
let firstCardWidth = firstCard.offsetWidth;

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

// Create pagination dots
const createPaginationDots = () => {
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.dataset.index = index; // Set index for navigation
    dot.addEventListener("click", () => {
      carousel.scrollLeft = index * firstCardWidth; 
      updateActiveDot(index);
    });
    pagination.appendChild(dot);
  });
};

// Update the active dot based on the scroll position
const updateActiveDot = (index) => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active")); 
  dots[index].classList.add("active"); 
};

// Update the dots when the carousel is scrolled
const updateDotsOnScroll = () => {
  const index = Math.round(carousel.scrollLeft / firstCardWidth);
  updateActiveDot(index);
};

// SLIDING ON MOUSE MOVE
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  updateDotsOnScroll(); // Update dots during drag
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
  updateDotsOnScroll(); // Update dots when dragging stops
};

// ARROW LEFT AND RIGHT BUTTONS
const arrowBtns = document.querySelectorAll(".wrapper i");
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    updateDotsOnScroll(); // Update dots after arrow click
  });
});

// CURSOUSEL AUTO PLAY
const autoplay = () => {
  if (window.innerWidth < 800) return;
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    carousel.scrollLeft += firstCardWidth;
    autoplay();
  }, 3000);
};

autoplay();

// Event listeners for dragging
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseenter", () => {
  clearTimeout(timeoutId);
});
wrapper.addEventListener("mouseleave", autoplay);

// Update card width
const updateCardWidth = () => {
  firstCardWidth = firstCard.offsetWidth;
};


window.addEventListener('resize', () => {
  updateCardWidth();
  updateDotsOnScroll(); // Update dots on resize
});


createPaginationDots();
updateActiveDot(0);
