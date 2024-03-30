const products = [
  {
    id: 1,
    name: "SAMSUNG Galaxy A15 5G 128GB",
    price: 199.99,
    image: "./images/iphone-1.jpg",
    brand: "Samsung",
  },
  {
    id: 2,
    name: "SAMSUNG Galaxy S24+, 256GB, Grayscale",
    price: 849.99,
    image: "./images/phone-2.jpg",
    brand: "Samsung",
  },
  {
    id: 3,
    name: "SAMSUNG Galaxy S23, 128GB, Greenish",
    price: 849.99,
    image: "./images/phone-3.jpg",
    brand: "Samsung",
  },
  {
    id: 4,
    name: "Apple iPhone 13 Pro, 128GB, Sierra Blue",
    price: 470.0,
    image: "./images/iphone-1.jpg",
    brand: "Apple",
  },
  {
    id: 5,
    name: "Apple iPhone 12 Mini, 64GB, Black",
    price: 204.9,
    image: "./images/iphone-2.jpg",
    brand: "Apple",
  },
  {
    id: 6,
    name: "Apple iPhone 12, 64GB, Green Lime",
    price: 174.95,
    image: "./images/iphone-3.jpg",
    brand: "Apple",
  },
  {
    id: 7,
    name: "Google Pixel 7a, 128GB – Charcoal",
    price: 374.0,
    image: "./images/gg-pixel-1.jpg",
    brand: "Google Pixel",
  },
  {
    id: 8,
    name: "Google Pixel 8, 128GB – Obsidian",
    price: 499.0,
    image: "./images/gg-pixel-2.jpg",
    brand: "Google Pixel",
  },
  {
    id: 9,
    name: "Pixel 4 - Clearly White - 64GB - Unlocked",
    price: 165,
    image: "./images/gg-pixel-3.jpg",
    brand: "Google Pixel",
  },
];

function startWeb() {
  renderProducts(products);
  renderImages(products.reverse());
  updateCartCount();
  updateFavoriteCount();
}
startWeb();

function renderProducts(products) {
  const container = document.querySelector(".product-container");
  const owlCarousel = $(".owl-carousel-1");

  container.innerHTML = "";

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const isFavorite = favorites.some(
      (favProduct) => favProduct.id === product.id
    );

    const heartIconClass = isFavorite ? "fa-heart active" : "fa-heart";

    card.innerHTML = `
    <div class="product-image">
      <a href="./detail.html">
        <img src="${product.image}" alt="${product.name}">
      </a>
        <span class="heart-icon" onclick="toggleFavorite(${product.id}, this)">
          <i class="fa-solid ${heartIconClass}"></i>
        </span>
    </div>
    <div class="product-details">
        <h2 class="product-title">${product.name}</h2>
        <p class="product-price">$${product.price}</p>
        <div class="product-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;

    container.appendChild(card);
  });

  // Destroy the existing Owl Carousel instance
  owlCarousel.trigger("destroy.owl.carousel");

  // Reinitialize the Owl Carousel
  owlCarousel.owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
}

function renderImages(products) {
  const container = document.querySelector(".explore-product-container");

  // Clear existing content in the container
  container.innerHTML = "";

  products.forEach((p) => {
    const img = document.createElement("img");
    img.src = p.image;
    img.alt = p.name;

    container.appendChild(img);
  });
}

function toggleFavorite(productId, heartIcon) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.findIndex(
    (favProduct) => favProduct.id === productId
  );

  if (index !== -1) {
    // Product is already in favorites, so remove it
    favorites.splice(index, 1);
    heartIcon.querySelector("i").classList.remove("active");
  } else {
    // Product is not in favorites, so add it
    favorites.push({ id: productId });
    heartIcon.querySelector("i").classList.add("active");
  }

  // Update favorites in localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Re-render products after updating favorites
  renderProducts(products);
  updateFavoriteCount();
}

function updateFavoriteCount() {
  const favoriteCount = JSON.parse(localStorage.getItem("favorites")) || [];
  document.getElementById("favoriteCount").textContent = favoriteCount.length;
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
}

function filterByBrand(products, brand) {
  return products.filter((product) => product.brand === brand);
}

/* SCROLL TOP BUTTON */
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/* ACCORDION */
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    // Add click event listener to each question
    question.addEventListener("click", () => {
      // Toggle active class on question
      question.classList.toggle("active");

      // Toggle max-height of answer to expand/collapse
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});

/* FILTER IMAGES */
const filterItems = document.querySelectorAll(".filter-list .item");
filterItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove the 'active' class from all filter items
    filterItems.forEach((i) => i.classList.remove("active"));

    // Add the 'active' class to the clicked filter item
    item.classList.add("active");

    const brand = item.dataset.brand; // Get the brand from the data attribute

    // Check if the special 'Show All' option is selected
    if (brand === "all") {
      renderImages(products); // Display all products
    } else {
      const filteredProducts = filterByBrand(products, brand);
      renderImages(filteredProducts); // Display filtered products
    }
  });
});

/* ADD PRODUCT TO CART */
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productExists = cart.some((item) => item.id === productId);

  if (productExists) {
    cart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* VALIDATE FORM */
const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Validate the form
  let isValid = true;
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    if (!input.validity.valid) {
      isValid = false;
      input.classList.add("input-error");
      const errorMessage = document.getElementById(input.id + "Error");
      errorMessage.style.display = "block";
    } else {
      input.classList.remove("input-error");
      const errorMessage = document.getElementById(input.id + "Error");
      errorMessage.style.display = "none";
    }
  });

  // If form is valid, submit it
  if (isValid) {
    alert("Form submitted successfully!");
    form.reset();
  }
});
