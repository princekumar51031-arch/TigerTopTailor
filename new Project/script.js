/* ====== TYPEWRITER ====== */
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

/* ====== CATEGORY CARDS ====== */
const categories = [
  {name: "Shirt", image: "Men's Shirts.jpeg", link: "category-shirt.html"},
  {name: "Pant", image: "Men's Paints.jpg", link: "category-pant.html"},
  {name: "Blouse", image: "Women Blouse.jpg", link: "category-blouse.html"},
  {name: "Kids", image: "Kids Unifrom.jpg", link: "category-kids.html"},
  {name: "Suit", image: "Woman Suits.jpg", link: "category-suit.html"},
  {name: "Sewing Tools", image: "Sweing Tools.jpg", link: "category-tools.html"},
  {name: "Jacket", image: "Neharu Jacket.jpeg", link: "category-jacket.html"},
  {name: "Kurta", image: "Short Kurta.jpg", link: "category-kurta.html"},
];

const productGrid = document.getElementById("product-grid");
categories.forEach(cat=>{
  const card = document.createElement("div");
  card.classList.add("category-card");
  card.innerHTML = `
    <img src="${cat.image}" alt="${cat.name}">
    <h3>${cat.name}</h3>
    <a href="${cat.link}"><button>View All</button></a>
  `;
  productGrid.appendChild(card);
});

const loginBtn = document.getElementById("loginBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

loginBtn.onclick = ()=> authModal.style.display = "flex";
closeAuth.onclick = ()=> authModal.style.display = "none";

const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendOtpBtn = document.getElementById("resendOtpBtn");
const authMsg = document.getElementById("authMsg");

function sendOtp(){
  const mobile = document.getElementById("mobile").value;
  const name = document.getElementById("name").value;

  if(!name){ alert("Enter Name"); return; }
  if(mobile.length !== 10){ alert("Enter valid mobile number"); return; }

  fetch("sendotp.php",{
    method:"POST",
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:`mobile=${mobile}&name=${name}`
  })
  .then(res=>res.text())
  .then(data=>{
    document.getElementById("otpSection").classList.remove("hidden");
    authMsg.innerText = "OTP Sent Successfully";
  });
}

sendOtpBtn.onclick = sendOtp;
resendOtpBtn.onclick = sendOtp;

verifyOtpBtn.onclick = ()=>{
  const otp = document.getElementById("otp").value;
  const mobile = document.getElementById("mobile").value;

  fetch("verifyotp.php",{
    method:"POST",
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:`mobile=${mobile}&otp=${otp}`
  })
  .then(res=>res.text())
  .then(data=>{
    authMsg.innerText = data;
    if(data.includes("Success")) setTimeout(()=>authModal.style.display="none",1500);
  });
};

