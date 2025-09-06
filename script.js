const grid = document.getElementById("main");
const categorySelect = document.getElementById("bolimlar");
const sortSelect = document.getElementById("sort");
const input = document.getElementById("input");

let allProducts = [];

function renderProducts(products) {
  grid.innerHTML = products.map(p => `
    <div class="card">
      <div class="thumb">
        <img src="${p.image}" alt="${p.title}">
      </div>
      <div class="title">${p.title}</div>
      <div class="price">$${p.price}</div>
    </div>
  `).join("");
}

function filterProducts() {
  let filtered = [...allProducts];

  let category = categorySelect.value;
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  let search = input.value.toLowerCase().trim();
  if (search) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(search)
    );
  }

  let sortType = sortSelect.value;
  if (sortType === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortType === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    allProducts = await res.json();
    renderProducts(allProducts);
  } catch (err) {
    console.error("Xatolik:", err.message);
  }
}

categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);
input.addEventListener("input", filterProducts);

document.addEventListener("DOMContentLoaded", getProducts);
