const counters = document.querySelectorAll(".counter");
const duration = 2000; // مدة العد بالكامل بالمللي ثانية
let hasAnimated = false;

const animateCounters = () => {
counters.forEach((counter) => {
    counter.classList.add("visible");

    const target = +counter.getAttribute("data-target");
    let count = 0;
    const stepTime = 20; // كم مرة يحدث التحديث بالمللي ثانية
    const steps = duration / stepTime;
    const increment = target / steps;

    const updateCount = () => {
    count += increment;
    if (count < target) {
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, stepTime);
    } else {
        counter.innerText = target;
    }
    };

    setTimeout(updateCount, 600); // نبدأ العد بعد ظهور الحركة من الأسفل
});
};

const section = document.querySelector(".about-stats-wrapper");

const observer = new IntersectionObserver(
(entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting && !hasAnimated) {
        animateCounters();
        hasAnimated = true;
    }
    });
},
{ threshold: 0.5 }
);

const cards = document.querySelectorAll(".team-card");
  let current = 2; // central card

function updateCarousel() {
    cards.forEach((card, index) => {
      card.className = "team-card"; // reset all classes
    const diff = (index - current + cards.length) % cards.length;

    if (index === current) {
        card.classList.add("card-center");
    } else if (diff === 1 || diff === -cards.length + 1) {
        card.classList.add("card-right");
    } else if (diff === 2 || diff === -cards.length + 2) {
        card.classList.add("card-right-behind");
    } else if (diff === cards.length - 1 || diff === -1) {
        card.classList.add("card-left");
    } else if (diff === cards.length - 2 || diff === -2) {
        card.classList.add("card-left-behind");
    }
    });
}

updateCarousel();
setInterval(() => {
    current = (current + 1) % cards.length;
    updateCarousel();
}, 2500);
observer.observe(section);