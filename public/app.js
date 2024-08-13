// 'e-commerce-cbwl32osw-olamilekanjes-projects.vercel.app';

// Register User
async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(`/api/register`, {
      name,
      email,
      password
    });
    alert(response.data.message);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // Specific error message from the server
    } else {
      alert(error.message);  // General error message
    }
  }
}

// Login User
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    console.log(email, password);
    const response = await axios.post(`/api/login`, {
      email,
      password
    });
    alert('Login successful');

    fetchProducts();
  } catch (error) {
    alert(error.response.data.error);
  }
}

// Create Product
async function createProduct() {
  const name = document.getElementById('product-name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const category = document.getElementById('category').value;
  const stock = document.getElementById('stock').value;
  try {
    const response = await axios.post(`${API_URL}/api/products/create-product`, {
      name,
      description,
      price,
      category,
      stock
    });
    alert(response.data.message);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // Specific error message from the server
    } else {
      alert(error.message);  // General error message
    }
  }
}

// Fetch Products
async function fetchProducts() {
  try {
    const response = await axios.get(`/api/products/allProducts`);
    const products = response.data;
    console.log(products);
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.className = 'list-group-item';
      productItem.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(productItem);
    });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);  // Specific error message from the server
    } else {
      alert('Failed to fetch products');  // General error message
    }
  }
  
}

// Event Listeners
document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('createProductBtn').addEventListener('click', createProduct);

// Fetch products on page load
fetchProducts();
