function filterShop(products) {
  //=======================================================================================
  const maxPriceFilter = document.getElementById("max__min");
  maxPriceFilter.onclick = filterByMaxPrice;
  const minPriceFilter = document.getElementById("min__max");
  minPriceFilter.onclick = filterByMinPrice;
  const maxMinColor = document.getElementById("color__max_min");
  const minMaxColor = document.getElementById("color__min_max");
  //=======================================================================================
  const categoriesContainer = document.getElementById("category__container");
  const genderContainer = document.getElementById("gender__container");
  const sizeContainer = document.getElementById("size__container");
  const colorContainer = document.getElementById("color__container");
  //=======================================================================================
  const searchBar = document.getElementById("search__bar");
  const searchButton = document.getElementById("btn__search");
  const clearSearchButton = document.getElementById("clear__search");
  searchButton.addEventListener("click", performSearch);
  searchBar.addEventListener("keydown", handleKeyPress);
  //=======================================================================================
  let priceFilter = [];
  //=======================================================
  const categories = new Set();
  const genders = new Set();
  const sizes = new Set();
  const colors = new Set();
  //=======================================================
  let selectedCategories = new Set();
  let selectedGenders = new Set();
  let selectedSizes = new Set();
  let selectedColors = new Set();
  //=======================================================================================
  products.forEach((product) => {
    categories.add(product.category);
    genders.add(product.gender);
    product.size.forEach((size) => {
      sizes.add(String(size));
    });
    product.color.forEach((color) => {
      colors.add(color);
    });
  });
  //=======================================================
  categories.forEach((category) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.classList.add("categories", "m-1");
    input.id = category.toLowerCase();

    label.htmlFor = category.toLowerCase();
    label.appendChild(input);
    label.appendChild(document.createTextNode(category));

    categoriesContainer.appendChild(label);
  });
  //=======================================================
  genders.forEach((gender) => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.classList.add("gender", "m-1");
    input.id = gender.toLowerCase();

    label.htmlFor = gender.toLowerCase();
    label.appendChild(input);
    label.appendChild(document.createTextNode(gender));

    genderContainer.appendChild(label);
  });
  //=======================================================
  sizes.forEach((size) => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.classList.add("sizes", "m-1");
    input.id = size;

    label.htmlFor = size;
    label.appendChild(input);
    label.appendChild(document.createTextNode(size));

    sizeContainer.appendChild(label);
  });
  //=======================================================
  colors.forEach((color) => {
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.classList.add("colors", "m-1");
    input.id = color.toLowerCase();

    label.htmlFor = color.toLowerCase();
    label.appendChild(input);
    label.appendChild(document.createTextNode(color));

    colorContainer.appendChild(label);
  });
  //=======================================================================================
  // Navbar
  //=======================================================================================
  //=======================================================================================
  // Filter By Price
  //=======================================================================================
  const categoryCheckboxes = document.getElementsByClassName("categories");
  for (const checkbox of categoryCheckboxes) {
    checkbox.addEventListener("change", filterCategory);
  }

  const genderCheckboxes = document.getElementsByClassName("gender");
  for (const checkbox of genderCheckboxes) {
    checkbox.addEventListener("change", filterGender);
  }

  const sizeCheckboxes = document.getElementsByClassName("sizes");
  for (const checkbox of sizeCheckboxes) {
    checkbox.addEventListener("change", filterSize);
  }

  const colorCheckboxes = document.getElementsByClassName("colors");
  for (const checkbox of colorCheckboxes) {
    checkbox.addEventListener("change", filterColor);
  }
  //=======================================================
  function filterByMaxPrice() {
    if (maxPriceFilter.checked) {
      products.sort((x, y) => y.price - x.price);
      maxMinColor.classList.add("filter__price-check");
      minMaxColor.classList.remove("filter__price-check");
      minPriceFilter.checked = false;
    } else {
      maxMinColor.classList.remove("filter__price-check");
      products.sort((x, y) => x.id - y.id);
    }
    localStorage.setItem("maxPriceFilterChecked", JSON.stringify(priceFilter));
    applyFilters();
    displayProducts(products);
  }
  function filterByMinPrice() {
    if (minPriceFilter.checked) {
      minMaxColor.classList.add("filter__price-check");
      maxMinColor.classList.remove("filter__price-check");
      maxPriceFilter.checked = false;
      products.sort((x, y) => x.price - y.price);
    } else {
      minMaxColor.classList.remove("filter__price-check");
      products.sort((x, y) => x.id - y.id);
    }
    localStorage.setItem("minPriceFilterChecked", JSON.stringify(priceFilter));
    applyFilters();
    displayProducts(products);
  }
  //=======================================================================================
  // Filter Category
  //=======================================================================================
  function filterCategory() {
    selectedCategories = new Set();
    const categoryCheckboxes = document.getElementsByClassName("categories");
    for (const checkbox of categoryCheckboxes) {
      if (checkbox.checked) {
        selectedCategories.add(checkbox.id);
      }
    }
    applyFilters();
  }
  function filterGender() {
    selectedGenders = new Set();
    const genderCheckboxes = document.getElementsByClassName("gender");
    for (const checkbox of genderCheckboxes) {
      if (checkbox.checked) {
        selectedGenders.add(checkbox.id);
      }
    }
    applyFilters();
  }
  function filterSize() {
    selectedSizes = new Set();
    const sizeCheckboxes = document.getElementsByClassName("sizes");
    for (const checkbox of sizeCheckboxes) {
      if (checkbox.checked) {
        selectedSizes.add(checkbox.id);
      }
    }
    applyFilters();
  }
  function filterColor() {
    selectedColors = new Set();
    const colorCheckboxes = document.getElementsByClassName("colors");
    for (const checkbox of colorCheckboxes) {
      if (checkbox.checked) {
        selectedColors.add(checkbox.id);
      }
    }
    applyFilters();
  }
  function applyFilters() {
    const filteredProducts = products.filter((product) => {
      const categoryMatch =
        selectedCategories.size === 0 ||
        selectedCategories.has(product.category.toLowerCase());
      const genderMatch =
        selectedGenders.size === 0 ||
        selectedGenders.has(product.gender.toLowerCase());
      const sizesMatch =
        selectedSizes.size === 0 ||
        product.size.some((size) => selectedSizes.has(size));
      const colorsMatch =
        selectedColors.size === 0 ||
        product.color.some((color) => selectedColors.has(color.toLowerCase()));
      return categoryMatch && genderMatch && sizesMatch && colorsMatch;
    });
    displayProducts(filteredProducts);
  }
  //=======================================================================================
  // Search Bar
  //=======================================================================================
  function performSearch() {
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm !== "") {
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm);
      });
      displayProducts(filteredProducts);
    } else {
      displayProducts(products);
    }
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      performSearch();
    } else {
      performSearchWithDelay();
    }
  }
  let searchTimeout;
  function performSearchWithDelay() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(performSearch, 300);
  }
}
