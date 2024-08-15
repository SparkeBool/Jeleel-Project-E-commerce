const API_URL = 'https://jeleel-project-e-commerce.vercel.app';

// Register User
async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await axios.post(`${API_URL}/api/register`, {
      name,
      email,
      password
    });
    alert(response.data.message);
  } catch (error) {
    alert(error.response.error);
  }
}

// Login User
async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await axios.post(`${API_URL}/api/login`, {
      email,
      password
    });
    alert('Login successful');
    localStorage.setItem('accessToken', response.data.token);
    fetchProducts();
  } catch (error) {
    alert(error.response.data.error);
  }
}

//create products
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
    const response = await axios.get(`${API_URL}/api/allProducts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const products = response.data;
    const productList = document.getElementById('products');
    productList.innerHTML = '';
    products.forEach(product => {
      const productItem = document.createElement('li');
      productItem.className = 'list-group-item';
      productItem.textContent = `${product.name} - $${product.price}`;
      productList.appendChild(productItem);
    });
  } catch (error) {
    alert('Failed to fetch products');
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error Response:', error.response);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No Response:', error.request);
    } else {
      // Other errors
      console.error('Error', error.message);
    }
  }
}
