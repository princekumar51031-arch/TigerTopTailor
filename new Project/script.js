/* Typewriter Effect – Auto type and stay visible */
const welcomeText = "Welcome to Tiger Top Tailor Shop";
let i = 0;
function typeWriter() {
    if(i < welcomeText.length){
        document.getElementById('welcome-text').innerHTML += welcomeText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

/* Slider Fade */
let slides = document.querySelectorAll('.slides-container .slide');
let currentSlide = 0;
function showSlide(index){
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}
setInterval(()=>{
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
},3000);

/* Products Array */
const products = [
    { id: 1, name: "Formal Shirt Blue", type: "shirt", price: 850, discount: 0, img: "Formal Shirt Blue.jpg", desc: "Elegant blue formal shirt for men." },
    { id: 2, name: "Casual Shirt Red", type: "shirt", price: 900, discount: 10, img: "Casual Shirt Red.jpeg", desc: "Comfortable red casual shirt." },
    { id: 3, name: "Black Pants", type: "pant", price: 1200, discount: 5, img: "images.png", desc: "Premium black pants for formal occasions." },
    { id: 4, name: "Grey Suit", type: "Blezer", price: 3500, discount: 15, img: "Grey Suit.jpeg", desc: "Stylish grey suit perfect for events." },
    { id: 5, name: "Kids Shirt", type: "kids", price: 500, discount: 0, img: "Kids Shirt.jpg", desc: "Cute kids shirt." },
    { id: 6, name: "Women Blouse Pink", type: "blouse", price: 700, discount: 5, img: "Women Blouse Pink.jpg", desc: "Stylish pink blouse for women." },
    { id: 7, name: "Casual Pants Blue", type: "pant", price: 1100, discount: 0, img: "Casual Pants Blu.jpg", desc: "Comfortable blue casual pants." },
    { id: 8, name: "Kids Uniform", type: "kids", price: 1500, discount: 10, img: "Kids Unifrom.jpg", desc: "Uniform every school for kids." },
    { id: 9, name: "Formal Shirt White", type: "shirt", price: 950, discount: 0, img: "formal shirts.jpg", desc: "Classic white formal shirt." },
    { id: 10, name: "Women Blouse Blue", type: "blouse", price: 750, discount: 5, img: "Women Blouse Blue.jpeg", desc: "Elegant and Beautiful blue blouse." },
    { id: 11, name: "Kurta", type: "Kurta", price: 1150, discount: 0, img: "Kurta.jpeg", desc: "Premium Kurta for Events and Festivals." },
    { id: 12, name: "Patiyala Suits", type: "suit", price: 520, discount: 0, img: "Patiyala.jpg", desc: "Woman Punjabi Suits, good looking." },
    { id: 13, name: "Women Blouse Neck", type: "blouse", price: 800, discount: 10, img: "Women Blouse neck.jpeg", desc: "Trendy blouse Neck." },
    { id: 14, name: "Cargo", type: "pant", price: 800, discount: 15, img: "cargo-500x500.webp", desc: "Best Cloth cargo pants for army." }
];

/* Display Products + Cart Functions */
let productGrid = document.getElementById('product-grid');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartItemsDiv = document.getElementById('cart-items');
let cartTotal = document.getElementById('cart-total');

function displayProducts(list){
    productGrid.innerHTML='';
    list.forEach(product=>{
        let card = document.createElement('div'); 
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
                <button onclick="viewProduct(${product.id})">View</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}
displayProducts(products);

function addToCart(id){
    let item = products.find(p=>p.id===id);
    let measure = document.getElementById(`measure-${id}`).value;
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
            <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(div);
    });
    cartTotal.innerText='Total: ₹'+total;
    document.getElementById('cart-count').innerText=cart.length;
}
updateCart();

/* Checkout -> Payment Modal */
document.getElementById('checkout-btn').addEventListener('click',()=>{
    if(cart.length===0){alert('Cart is empty'); return;}
    displayPaymentCart();
    document.getElementById('payment-modal').style.display='block';
});

function displayPaymentCart(){
    let payCartDiv=document.getElementById('payment-cart');
    let total=0; payCartDiv.innerHTML='';
    cart.forEach(item=>{
        total+=item.price;
        let div=document.createElement('div'); div.className='product-card';
        div.innerHTML=`
            <img src="${item.img}" style="width:50px;height:50px;">
            <h4>${item.name}</h4>
            <p>Measurement: ${item.measurement}</p>
            <p class="price">₹${item.price}</p>
            <button class="remove" onclick="removeFromPaymentCart(${item.id})">Remove</button>
        `;
        payCartDiv.appendChild(div);
    });
    document.getElementById('payment-total').innerText='Total: ₹'+total;
}

function removeFromPaymentCart(id){ cart=cart.filter(p=>p.id!==id); updateCart(); displayPaymentCart(); }

document.querySelector('.close-btn-pay').onclick=()=>document.getElementById('payment-modal').style.display='none';

/* Product Modal */
let modal=document.getElementById('product-modal');
let modalImg=document.getElementById('modal-img');
let modalName=document.getElementById('modal-name');
let modalDesc=document.getElementById('modal-desc');
let modalPrice=document.getElementById('modal-price');
let modalMeasurement=document.getElementById('modal-measurement');
document.querySelector('.close-btn').onclick=()=>modal.style.display='none';

function viewProduct(id){
    let product=products.find(p=>p.id===id);
    modal.style.display='block';
    modalImg.src=product.img;
    modalName.innerText=product.name;
    modalDesc.innerText=product.desc;
    modalPrice.innerText='Price: ₹'+product.price;
    modalMeasurement.innerText='Measurement: Small, Medium, Large, XL';
}

/* Payment Form */
document.getElementById('payment-form').addEventListener('submit',function(e){
    e.preventDefault();
    if(cart.length===0){alert('Cart empty'); document.getElementById('payment-modal').style.display='none'; return;}
    let name=document.getElementById('cust-name').value;
    let phone=document.getElementById('cust-phone').value;
    let address=document.getElementById('cust-address').value;
    let method=document.querySelector('input[name="pay-method"]:checked').value;
    let card=document.getElementById('card-number').value;
    let upi=document.getElementById('upi-id').value;
    let details=`Order Placed!\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nPayment Method: ${method}\nProducts:\n`;
    cart.forEach(p=>details+=`- ${p.name}, Measurement: ${p.measurement}, Price: ₹${p.price}\n`);
    if(method==='Card') details+=`Card Number: ${card}\n`;
    if(method==='UPI') details+=`UPI ID: ${upi}\n`;
    alert(details);
    cart=[]; updateCart(); document.getElementById('payment-modal').style.display='none';
});

/* Search & Filter */
document.getElementById('search-input').oninput=function(e){
    const term=e.target.value.toLowerCase();
    displayProducts(products.filter(p=>p.name.toLowerCase().includes(term)));
};
document.getElementById('filter-select').onchange=function(e){
    const type=e.target.value;
    displayProducts(type==='all'?products:products.filter(p=>p.type===type));
};
