let cart = [];

const cartModal = document.getElementById('cartModal');
const cartDrawer = document.getElementById('cartDrawer');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartItemsList = document.getElementById('cartItemsList');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const emptyCartMsg = document.getElementById('emptyCartMsg');
const filterBtns = document.querySelectorAll('.filter-btn');
const foodCards = document.querySelectorAll('.food-card');
const searchInput = document.getElementById('searchInput');

function openCart() {
    cartModal.classList.remove('pointer-events-none', 'opacity-0');
    cartDrawer.classList.remove('translate-x-full');
}

function closeCart() {
    cartDrawer.classList.add('translate-x-full');
    cartModal.classList.add('opacity-0');
    setTimeout(() => {
        cartModal.classList.add('pointer-events-none');
    }, 300);
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);

window.addToCart = function(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, qty: 1 });
    }
    renderCart();
};

window.changeQty = function(id, delta) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    renderCart();
};

function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    cartCountBadge.textContent = totalCount;
    cartSubtotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="text-sm text-slate-500 text-center py-10" id="emptyCartMsg">Your cart is empty.</p>';
        return;
    }

    cartItemsList.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between bg-accent/40 border border-white/5 p-3 rounded-xl">
            <div>
                <p class="text-sm font-semibold text-white">${item.name}</p>
                <p class="text-xs text-primary font-bold">$${(item.price * item.qty).toFixed(2)}</p>
            </div>
            <div class="flex items-center gap-2 bg-darkBg border border-white/10 rounded-lg px-2 py-1">
                <button onclick="changeQty(${item.id}, -1)" class="text-slate-400 hover:text-white text-xs px-1">-</button>
                <span class="text-xs font-semibold text-white">${item.qty}</span>
                <button onclick="changeQty(${item.id}, 1)" class="text-slate-400 hover:text-white text-xs px-1">+</button>
            </div>
        </div>
    `).join('');
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-white');
            b.classList.add('bg-accent', 'text-slate-300');
        });
        btn.classList.remove('bg-accent', 'text-slate-300');
        btn.classList.add('bg-primary', 'text-white');

        const cat = btn.dataset.category;
        filterList(cat, searchInput.value);
    });
});

searchInput.addEventListener('input', (e) => {
    const activeCategoryBtn = document.querySelector('.filter-btn.bg-primary');
    const cat = activeCategoryBtn ? activeCategoryBtn.dataset.category : 'All';
    filterList(cat, e.target.value);
});

function filterList(category, query) {
    const q = query.trim().toLowerCase();
    foodCards.forEach(card => {
        const cardCat = card.dataset.category;
        const cardName = card.dataset.name.toLowerCase();

        const matchesCat = (category === 'All' || cardCat === category);
        const matchesQuery = cardName.includes(q);

        if (matchesCat && matchesQuery) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
