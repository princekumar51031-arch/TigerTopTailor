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

/* ====== CATEGORY SEARCH/FILTER ====== */
const categories = [
  {name: "Shirt", image: "Men's Shirts.jpeg", link: "category-shirt.html"},
  {name: "Pant", image: "Men's Paints.jpg", link: "category-pant.html"},
  {name: "Blouse", image: "Women Blouse.jpg", link: "category-blouse.html"},
  {name: "Kids", image: "Kids Unifrom.jpg", link: "category-kids.html"},
  {name: "Suit", image: "Woman Suits.jpg", link: "category-suit.html"},
  {name: "Sewing Tools", image: "Sweing Tools.jpg", link: "category-tools.html"},
  {name: "Jacket", image: "Neharu Jacket.jpeg", link: "category-jacket.html"},
  {name: "Kurta", image: "Short Kurta.jpg", link: "category-kurta.html"}
];

const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const resultsDiv = document.getElementById('results');

function displayResults(items){
  resultsDiv.innerHTML = '';
  if(items.length === 0){
    resultsDiv.innerHTML = '<p>No results found</p>';
    return;
  }
  items.forEach(item=>{
    const div = document.createElement('div');
    div.classList.add('category-card');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <a href="${item.link}" class="view-btn">View All</a>
    `;
    resultsDiv.appendChild(div);
  });
}

function filterCategories(){
  const searchText = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value.toLowerCase();

  const filtered = categories.filter(cat=>{
    const matchName = cat.name.toLowerCase().includes(searchText);
    const matchCategory = filterValue==='all' || cat.name.toLowerCase()===filterValue;
    return matchName && matchCategory;
  });
  displayResults(filtered);
}

searchInput.addEventListener('input', filterCategories);
filterSelect.addEventListener('change', filterCategories);

// Initial load
displayResults(categories);

/* ====== SERVICE MORE BUTTON ====== */
const moreButtons = document.querySelectorAll('.more-btn');
moreButtons.forEach(button=>{
  button.addEventListener('click', ()=>{
    const fullDesc = button.previousElementSibling;
    if(fullDesc.style.display === 'inline'){
      fullDesc.style.display = 'none';
      button.textContent = 'More';
    } else {
      fullDesc.style.display = 'inline';
      button.textContent = 'Less';
    }
  });
});
// ===== NAVBAR LOGIN NAME LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("ttt_name");

  const loginBtn = document.getElementById("loginBtn");
  const userNameBox = document.getElementById("userName");
  const navUserName = document.getElementById("navUserName");

  if(name){
    loginBtn.style.display = "none";
    userNameBox.style.display = "block";
    navUserName.innerText = name;
  }
});
// ===== LOGOUT FUNCTION =====
document.addEventListener("click", function(e){
  if(e.target.id === "logoutBtn"){
    localStorage.removeItem("ttt_name");
    alert("Logout Successfully");
    location.reload();
  }
});

/* ====== END ====== */ 