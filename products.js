const API_URL =
  "https://script.google.com/macros/s/AKfycbyPz7u5OHeFxQg5VS_r9kRUXuALO52qkXY4R0EsWc5NTTbjmjmPZ8E0CyvqwxFWJpu3kA/exec";

async function loadProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();

  // ROBUX
  document.getElementById("robux-amount").textContent = data.robux;

  // OTHERS
  const list = document.getElementById("others-list");
  list.innerHTML = "";

  data.others.forEach(item => {
    const div = document.createElement("div");
    div.className = "other-item";

    div.innerHTML = `
      <span class="name">${item.name}</span>
      <span class="price">${item.available ? item.price : ""}</span>
      <span class="status">
        ${item.available ? "" : "Out of Stock! Restock soon."}
      </span>
    `;

    list.appendChild(div);
  });
}

loadProducts();
