/* ====== Typewriter ====== */
let welcomeText = "Welcome to Tiger Top Tailor Shop";
let i=0;
function typeWriter(){
  if(i<welcomeText.length){
    document.getElementById('welcome-text').innerHTML += welcomeText.charAt(i);
    i++;
    setTimeout(typeWriter,100);
  }
}
typeWriter();

/* ====== Slider ====== */
let slides = document.querySelectorAll('.slides-container .slide');
let currentSlide=0;
function showSlide(index){
  slides.forEach(s=>s.classList.remove('active'));
  slides[index].classList.add('active');
}
setInterval(()=>{
  currentSlide = (currentSlide+1)%slides.length;
  showSlide(currentSlide);
},3000);

/* ====== Products + Cart ====== */
const products = [
  {id:1,name:"Formal Shirt Blue",type:"shirt",price:850,discount:0,img:"Formal Shirt Blue.jpg",desc:"Elegant blue formal shirt for men."},
  {id:2,name:"Casual Shirt Red",type:"shirt",price:900,discount:10,img:"Casual Shirt Red.jpeg",desc:"Comfortable red casual shirt."},
  {id:3,name:"Black Pants",type:"pant",price:1200,discount:5,img:"images.png",desc:"Premium black pants for formal occasions."},
  {id:4,name:"Grey Suit",type:"Blezer",price:3500,discount:15,img:"Grey Suit.jpeg",desc:"Stylish grey suit perfect for events."},
  {id:5,name:"Kids Shirt",type:"kids",price:500,discount:0,img:"Kids Shirt.jpg",desc:"Cute kids shirt."}
  /* ... add remaining products ... */
];

let productGrid=document.getElementById('product-grid');
let cart = JSON.parse(localStorage.getItem('cart'))||[];
let cartItemsDiv=document.getElementById('cart-items');
let cartTotal=document.getElementById('cart-total');

function displayProducts(list){
  productGrid.innerHTML='';
  list.forEach(product=>{
    let card=document.createElement('div');
    card.className='product-card';
    card.innerHTML=`
      <img src="${product.img}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p class="price">₹${product.price} ${product.discount>0? `(Discount ${product.discount}%)`:''}</p>
      <label>Measurement:
        <select id="measure-${product.id}">
          <option value="Small">S</option>
          <option value="Medium">M</option>
          <option value="Large">L</option>
          <option value="XL">XL</option>
        </select>
      </label>
      <div class="btn-group">
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button class="remove" onclick="removeFromCart(${product.id})">Remove</button>
      </div>`;
    productGrid.appendChild(card);
  });
}
displayProducts(products);

function addToCart(id){
  let item=products.find(p=>p.id===id);
  let measure=document.getElementById(`measure-${id}`).value;
  if(!cart.find(p=>p.id===id)) cart.push({...item,measurement:measure});
  updateCart();
}
function removeFromCart(id){ cart=cart.filter(p=>p.id!==id); updateCart(); }

function updateCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
  cartItemsDiv.innerHTML=''; let total=0;
  cart.forEach(item=>{
    total+=item.price;
    let div=document.createElement('div'); div.className='product-card';
    div.innerHTML=`
      <img src="${item.img}" style="width:50px;height:50px;">
      <h4>${item.name}</h4>
      <p>Measurement: ${item.measurement}</p>
      <p class="price">₹${item.price} ${item.discount>0? `(Discount ${item.discount}%)`:''}</p>
      <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>`;
    cartItemsDiv.appendChild(div);
  });
  cartTotal.innerText='Total: ₹'+total;
  document.getElementById('cart-count').innerText=cart.length;
}
updateCart();

/* ====== Payment Form ====== */
document.getElementById('checkout-btn').onclick=()=>{
  if(cart.length===0){alert("Cart is empty!"); return;}
  document.getElementById('payment-modal').style.display='block';
}

document.getElementById('payment-form').addEventListener('submit',function(e){
  e.preventDefault();
  if(cart.length===0){alert("Cart empty"); return;}
  let orders = JSON.parse(localStorage.getItem("userOrders"))||{};
  if(!orders[loggedUser.mobile]) orders[loggedUser.mobile]=[];
  cart.forEach(p=>orders[loggedUser.mobile].push({...p,date:new Date().toLocaleString()}));
  localStorage.setItem("userOrders",JSON.stringify(orders));
  alert("Order placed successfully!");
  cart=[]; updateCart();
  document.getElementById('payment-modal').style.display='none';
});

/* ====== LOGIN/SIGNUP + DASHBOARD ====== */
let loggedUser=JSON.parse(localStorage.getItem("loggedUser"))||null;
const loginBtn=document.createElement("button");
loginBtn.style.cssText="background:#ff9800;color:white;padding:6px 12px;border:none;border-radius:5px;cursor:pointer;";
loginBtn.innerText=loggedUser?loggedUser.name:"Login";
loginBtn.onclick=()=>loggedUser?toggleDashboard():openAuthPopup();
document.querySelector("nav").appendChild(loginBtn);

function openAuthPopup(){
  document.getElementById("authPopup").classList.add("active");
}
let generatedOtp="";
function sendOtp(){
  let name=document.getElementById("userName").value.trim();
  let mobile=document.getElementById("userMobile").value.trim();
  if(name=="" || mobile.length!==10){alert("Enter valid name & mobile"); return;}
  generatedOtp=Math.floor(1000+Math.random()*9000);
  alert("Demo OTP: "+generatedOtp);
  document.getElementById("otpSection").style.display="block";
}

function verifyOtp(){
  const entered=document.getElementById("otpInput").value;
  if(entered==generatedOtp){
    loggedUser={name:document.getElementById("userName").value, mobile:document.getElementById("userMobile").value, address:"", orders:0};
    localStorage.setItem("loggedUser",JSON.stringify(loggedUser));
    document.getElementById("authPopup").classList.remove("active");
    loginBtn.innerText=loggedUser.name;
    alert("Login successful!");
  }else alert("Invalid OTP!");
}

/* ====== Dashboard ====== */
const dashboard=document.getElementById("userDashboard");
function toggleDashboard(){
  if(!dashboard.classList.contains("active")){
    dashboard.querySelector("#dashboardName").innerText=loggedUser.name;
    dashboard.querySelector("#dashboardMobile").innerText=loggedUser.mobile;
    dashboard.querySelector("#dashboardAddress").value=loggedUser.address||"";
    let dashboardOrders=JSON.parse(localStorage.getItem("userOrders"))||{};
    let userOrders=dashboardOrders[loggedUser.mobile]||[];
    let totalSpent=0;
    const ordersDiv=document.getElementById("dashboardOrders");
    ordersDiv.innerHTML="";
    if(userOrders.length===0) ordersDiv.innerHTML="<p>No orders yet.</p>";
    userOrders.forEach(order=>{
      totalSpent+=order.price;
      let div=document.createElement("div");
      div.className="product-card";
      div.innerHTML=`<h4>${order.name}</h4>
                     <p>Measurement: ${order.measurement}</p>
                     <p>Price: ₹${order.price}</p>`;
      ordersDiv.appendChild(div);
    });
    document.getElementById("dashboardTotalOrders").innerText=userOrders.length;
    document.getElementById("dashboardTotalSpent").innerText=totalSpent;
  }
  dashboard.classList.toggle("active");
}

function saveDashboardAddress(){
  loggedUser.address=document.getElementById("dashboardAddress").value;
  localStorage.setItem("loggedUser",JSON.stringify(loggedUser));
}

function logoutDashboard(){
  localStorage.removeItem("loggedUser");
  loggedUser=null;
  loginBtn.innerText="Login";
  dashboard.classList.remove("active");
  alert("Logged out successfully!");
}

/* ====== Payment Input ====== */
function showPayInput(type){
  document.querySelectorAll(".hidden-pay-input").forEach(el=>el.style.display="none");
  if(type=="card") document.getElementById("card-number").style.display="block";
  if(type=="upi") document.getElementById("upi-id").style.display="block";
  if(type=="qr") document.querySelector(".qr-img").style.display="block";
}
document.querySelectorAll('.more-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const fullDesc = btn.previousElementSibling;
    if(fullDesc.style.display === 'inline'){
      fullDesc.style.display = 'none';
      btn.innerText = 'More';
    } else {
      fullDesc.style.display = 'inline';
      btn.innerText = 'Less';
    }
  });
});
