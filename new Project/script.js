/* ====== TYPEWRITER ====== */
const welcomeText = " ";
let twIndex = 0;
function typeWriter() {
  if (twIndex < welcomeText.length) {
    document.getElementById("welcome-text").innerHTML += welcomeText.charAt(twIndex);
    twIndex++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

/* ====== SLIDER ====== */
const slides = document.querySelectorAll(".slides-container .slide");
let currentSlide = 0;
function showSlide(index){
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
}
setInterval(()=>{
  currentSlide = (currentSlide+1)%slides.length;
  showSlide(currentSlide);
},3000);
const categories = [
  {name: "Shirt", image: "shirt.jpg", link: "category-shirt.html"},
  {name: "Pant", image: "pant.jpg", link: "category-pant.html"},
  {name: "Blouse", image: "blouse.jpg", link: "category-blouse.html"},
  {name: "Kids", image: "kids.jpg", link: "category-kids.html"},
  {name: "Suit", image: "suit.jpg", link: "category-suit.html"},
  {name: "Sewing Tools", image: "tools.jpg", link: "category-tools.html"},
  {name: "Jacket", image: "jacket.jpg", link: "category-jacket.html"},
  {name: "Kurta", image: "kurta.jpg", link: "category-kurta.html"},
];

const productGrid = document.getElementById("product-grid");

// Generate category cards dynamically
categories.forEach(cat => {
  const card = document.createElement("div");
  card.classList.add("category-card");
  card.innerHTML = `
    <img src="${cat.image}" alt="${cat.name}">
    <h3>${cat.name}</h3>
    <a href="${cat.link}"><button>View All</button></a>
  `;
  productGrid.appendChild(card);
});
