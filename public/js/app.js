// Global variables
let cart = [];
let currentCaptcha = '';
let currentUser = null;
let books = JSON.parse(localStorage.getItem('books') || JSON.stringify([
    { id: 1, name: 'English', category: 'Language', price: 250 },
    { id: 2, name: 'Gujarati', category: 'Language', price: 250 },
    { id: 3, name: 'Mathematics', category: 'Science', price: 300 },
    { id: 4, name: 'Science', category: 'Science', price: 350 },
    { id: 5, name: 'Social Science', category: 'Science', price: 320 },
    { id: 6, name: 'Sanskrit', category: 'Language', price: 220 },
    { id: 7, name: 'Software Engineering', category: 'Technology', price: 450 },
    { id: 8, name: 'Wireless Communication', category: 'Technology', price: 500 },
    { id: 9, name: 'Computer Basics', category: 'Technology', price: 400 },
    { id: 10, name: 'Java Programming', category: 'Technology', price: 550 },
    { id: 11, name: 'C++ Programming', category: 'Technology', price: 500 },
    { id: 12, name: 'Python Programming', category: 'Technology', price: 450 },
    { id: 13, name: 'CSS Design', category: 'Technology', price: 300 },
    { id: 14, name: 'HTML Basics', category: 'Technology', price: 250 }
]));

// Captcha Generator
function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    document.getElementById('captcha-image').textContent = captcha;
    return captcha;
}

// Initialize page
function initPage() {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        updateUserUI();
    }

    // Load cart from localStorage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
    }
}

// Update user UI
function updateUserUI() {
    const userNav = document.getElementById('user-nav');
    if (userNav && currentUser) {
        userNav.innerHTML = `
            <span>Welcome, <strong>${currentUser.name}</strong></span>
            <a href="#" onclick="viewCart(); return false;">🛒 Cart (${cart.length})</a>
            <button class="btn-logout" onclick="logout()">Logout</button>
        `;
    }
}

// Generate Captcha on page load
window.addEventListener('load', function() {
    initPage();
    const captchaImg = document.getElementById('captcha-image');
    if (captchaImg) {
        generateCaptcha();
    }
});

// LOGIN PAGE FUNCTIONS
function validateStudentLogin(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const enrollment = document.getElementById('enrollment').value.trim();
    const dateOfBirth = document.getElementById('dob').value;
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const captchaInput = document.getElementById('captcha-input').value.trim().toUpperCase();

    // Validation
    if (!name) {
        showAlert('Please enter your name', 'error');
        return;
    }
    if (!enrollment) {
        showAlert('Please enter your enrollment number', 'error');
        return;
    }
    if (!dateOfBirth) {
        showAlert('Please enter your date of birth', 'error');
        return;
    }
    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
        showAlert('Please enter a valid 10-digit mobile number', 'error');
        return;
    }
    if (!email || !email.includes('@')) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    if (!captchaInput) {
        showAlert('Please enter the captcha code', 'error');
        return;
    }
    if (captchaInput !== currentCaptcha) {
        showAlert('Captcha is incorrect! Please try again.', 'error');
        generateCaptcha();
        document.getElementById('captcha-input').value = '';
        return;
    }

    // Store user data
    currentUser = { name, enrollment, dateOfBirth, mobile, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('cart', JSON.stringify([]));
    cart = [];

    // Store student in the students list (for admin dashboard)
    let allStudents = JSON.parse(localStorage.getItem('allStudents') || '[]');
    const existingStudent = allStudents.find(s => s.enrollment === enrollment);
    if (!existingStudent) {
        allStudents.push({
            id: allStudents.length + 1,
            name,
            enrollment,
            email,
            mobile,
            dateOfBirth,
            loginDate: new Date().toISOString().split('T')[0]
        });
        localStorage.setItem('allStudents', JSON.stringify(allStudents));
    }

    showAlert('Login successful! Welcome ' + name, 'success');
    setTimeout(() => {
        window.location.href = 'library.html';
    }, 1500);
}

// Admin Login
function validateAdminLogin(e) {
    e.preventDefault();

    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    if (username === 'Prof.Vedrucha Pandya' && password === 'Silveroakuni.ac.in') {
        localStorage.setItem('adminLogged', 'true');
        showAlert('Admin login successful!', 'success');
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid admin credentials!', 'error');
    }
}

// Refresh Captcha
function refreshCaptcha() {
    generateCaptcha();
    document.getElementById('captcha-input').value = '';
}

// Cart Functions
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const existingItem = cart.find(item => item.id === bookId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...book, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateUserUI();
        showAlert(`${book.name} added to cart!`, 'success');
    }
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateUserUI();
    displayCart();
}

function updateQuantity(bookId, quantity) {
    const item = cart.find(item => item.id === bookId);
    if (item) {
        item.quantity = parseInt(quantity);
        if (item.quantity <= 0) {
            removeFromCart(bookId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
        }
    }
}

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; padding: 40px;">Your cart is empty</p>';
        document.getElementById('cart-summary').innerHTML = '';
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                        <input type="text" value="${item.quantity}" readonly style="color: #333;">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <span style="font-weight: 700; color: #667eea;">₹${itemTotal}</span>
                    <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;

    const summary = document.getElementById('cart-summary');
    summary.innerHTML = `
        <div class="summary-line">
            <span>Subtotal:</span>
            <span>₹${total}</span>
        </div>
        <div class="summary-line">
            <span>Tax (5%):</span>
            <span>₹${(total * 0.05).toFixed(2)}</span>
        </div>
        <div class="summary-line">
            <span>Shipping:</span>
            <span>Free</span>
        </div>
        <div class="summary-line total">
            <span>Total:</span>
            <span>₹${(total * 1.05).toFixed(2)}</span>
        </div>
        <button class="btn-checkout" onclick="proceedToPayment()">Proceed to Payment</button>
    `;
}

function viewCart() {
    window.location.href = 'cart.html';
}

// Display Books
function displayBooks(filterCategory = 'all') {
    const container = document.getElementById('books-container');
    if (!container) return;

    let filteredBooks = books;
    if (filterCategory !== 'all') {
        filteredBooks = books.filter(book => book.category === filterCategory);
    }

    let html = '';
    filteredBooks.forEach(book => {
        html += `
            <div class="book-card">
                <div class="book-image">📚</div>
                <div class="book-content">
                    <div class="book-title">${book.name}</div>
                    <div class="book-author">${book.category}</div>
                    <div class="book-price">₹${book.price}</div>
                    <div class="book-actions">
                        <button class="btn-add-cart" onclick="addToCart(${book.id})">Add to Cart</button>
                        <button class="btn-view-details" onclick="viewBookDetails(${book.id})">Details</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function filterBooks() {
    const category = document.getElementById('category-filter').value;
    displayBooks(category);
}

function viewBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    const modal = document.getElementById('book-modal');
    const modalContent = document.getElementById('modal-book-details');

    if (book && modal && modalContent) {
        modalContent.innerHTML = `
            <h2>${book.name}</h2>
            <p><strong>Category:</strong> ${book.category}</p>
            <p><strong>Price:</strong> ₹${book.price}</p>
            <p><strong>Description:</strong> This is a comprehensive book on ${book.name.toLowerCase()} with detailed explanations and examples.</p>
            <button class="btn-add-cart" onclick="addToCart(${book.id}); closeModal('book-modal')">Add to Cart</button>
        `;
        modal.classList.add('show');
    }
}

// Payment Functions
function proceedToPayment() {
    if (!currentUser) {
        showAlert('Please login first!', 'error');
        window.location.href = 'student-login.html';
        return;
    }
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'error');
        return;
    }
    window.location.href = 'payment.html';
}

function displayPaymentSummary() {
    const summary = document.getElementById('payment-summary');
    if (!summary || cart.length === 0) return;

    let total = 0;
    let itemsHtml = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHtml += `<p>${item.name} x${item.quantity} = ₹${itemTotal}</p>`;
    });

    const tax = total * 0.05;
    const finalTotal = total + tax;

    summary.innerHTML = `
        <h3>Order Summary</h3>
        ${itemsHtml}
        <hr>
        <p>Subtotal: ₹${total}</p>
        <p>Tax (5%): ₹${tax.toFixed(2)}</p>
        <h3>Total Amount: ₹${finalTotal.toFixed(2)}</h3>
    `;
}

function processPayment(e) {
    e.preventDefault();

    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!paymentMethod) {
        showAlert('Please select a payment method', 'error');
        return;
    }

    const method = paymentMethod.value;

    if (method === 'UPI') {
        // Redirect to UPI payment page
        window.location.href = 'upi-payment.html';
        return;
    }

    let totalAmount = 0;
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });
    totalAmount *= 1.05;

    showAlert('Processing payment of ₹' + totalAmount.toFixed(2) + ' via ' + method, 'info');

    setTimeout(() => {
        // Store order history for admin dashboard
        const orderId = 'ORD' + Date.now();
        const orderData = {
            id: orderId,
            student: currentUser,
            books: [...cart],
            totalAmount: totalAmount,
            paymentMethod: method,
            orderDate: new Date().toISOString(),
            status: 'Completed'
        };

        let allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
        allOrders.push(orderData);
        localStorage.setItem('allOrders', JSON.stringify(allOrders));

        localStorage.setItem('cart', JSON.stringify([]));
        cart = [];
        showAlert('Payment successful! Your order has been placed.', 'success');
        setTimeout(() => {
            window.location.href = 'library.html';
        }, 2000);
    }, 2000);
}

// Admin Functions
function checkAdminAuth() {
    if (!localStorage.getItem('adminLogged')) {
        window.location.href = 'admin-login.html';
    }
}

function displayAdminStats() {
    const statsContainer = document.getElementById('dash-stats');
    if (!statsContainer) return;

    // Get real data from localStorage
    const allStudents = JSON.parse(localStorage.getItem('allStudents') || '[]');
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');

    // Calculate total revenue from orders
    const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    const stats = {
        totalBooks: books.length,
        totalStudents: allStudents.length,
        totalOrders: allOrders.length,
        totalRevenue: totalRevenue.toFixed(2)
    };

    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Total Books</h3>
            <div class="stat-number">${stats.totalBooks}</div>
        </div>
        <div class="stat-card">
            <h3>Total Students</h3>
            <div class="stat-number">${stats.totalStudents}</div>
        </div>
        <div class="stat-card">
            <h3>Total Orders</h3>
            <div class="stat-number">${stats.totalOrders}</div>
        </div>
        <div class="stat-card">
            <h3>Total Revenue</h3>
            <div class="stat-number">₹${stats.totalRevenue}</div>
        </div>
    `;
}

function displayBooksAdmin() {
    const container = document.getElementById('books-table');
    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Book ID</th>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Price (₹)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    books.forEach(book => {
        html += `
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.category}</td>
                <td>${book.price}</td>
                <td>
                    <button class="btn btn-edit" onclick="editBook(${book.id})">Edit</button>
                    <button class="btn btn-secondary" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function editBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        const name = prompt('Enter book name:', book.name);
        const price = prompt('Enter price (₹):', book.price);
        if (name && price) {
            book.name = name;
            book.price = parseInt(price);
            localStorage.setItem('books', JSON.stringify(books));
            displayBooksAdmin();
            showAlert('Book updated successfully!', 'success');
        }
    }
}

function deleteBook(bookId) {
    if (confirm('Are you sure you want to delete this book?')) {
        books = books.filter(b => b.id !== bookId);
        localStorage.setItem('books', JSON.stringify(books));
        displayBooksAdmin();
        showAlert('Book deleted successfully!', 'success');
    }
}

function addNewBook(e) {
    e.preventDefault();

    const bookName = document.getElementById('book-name').value.trim();
    const bookCategory = document.getElementById('book-category').value;
    const bookPrice = parseInt(document.getElementById('book-price').value);

    if (!bookName || !bookCategory || !bookPrice) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    const newId = Math.max(...books.map(b => b.id), 0) + 1;
    books.push({ id: newId, name: bookName, category: bookCategory, price: bookPrice });
    localStorage.setItem('books', JSON.stringify(books));

    document.getElementById('add-book-form').reset();
    showAlert('Book added successfully!', 'success');
    displayBooksAdmin();
}

function displayStudentsAdmin() {
    const container = document.getElementById('students-table');
    if (!container) return;

    const students = JSON.parse(localStorage.getItem('allStudents') || '[]');

    if (students.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No students have logged in yet.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Enrollment</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Date of Birth</th>
                    <th>Login Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    students.forEach(student => {
        html += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.enrollment}</td>
                <td>${student.email}</td>
                <td>${student.mobile}</td>
                <td>${student.dateOfBirth}</td>
                <td>${student.loginDate}</td>
                <td>
                    <button class="btn btn-edit" onclick="viewStudentOrders('${student.enrollment}')">View Orders</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function viewStudentOrders(enrollment) {
    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    const studentOrders = orders.filter(order => order.student.enrollment === enrollment);

    if (studentOrders.length === 0) {
        showAlert('No orders found for this student', 'info');
        return;
    }

    // Create a modal or detailed view for student orders
    let orderDetails = `Orders for ${studentOrders[0].student.name} (${enrollment}):\n\n`;

    studentOrders.forEach(order => {
        orderDetails += `Order ID: ${order.id}\n`;
        orderDetails += `Date: ${new Date(order.orderDate).toLocaleDateString()}\n`;
        orderDetails += `Books: ${order.books.map(book => `${book.name} (${book.quantity}x)`).join(', ')}\n`;
        orderDetails += `Total: ₹${order.totalAmount.toFixed(2)}\n`;
        orderDetails += `Payment: ${order.paymentMethod}\n`;
        orderDetails += `Status: ${order.status}\n\n`;
    });

    alert(orderDetails);
}

function displayOrdersAdmin() {
    const container = document.getElementById('orders-table');
    if (!container) return;

    const orders = JSON.parse(localStorage.getItem('allOrders') || '[]');

    if (orders.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #666;">No orders have been placed yet.</p>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Student Name</th>
                    <th>Enrollment</th>
                    <th>Book Details (Name, Quantity × Price)</th>
                    <th>Total Amount (₹)</th>
                    <th>Payment Method</th>
                    <th>Order Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach(order => {
        const bookDetails = order.books.map(book => `${book.name} (${book.quantity}x × ₹${book.price})`).join('<br>');
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const statusClass = order.status === 'Completed' ? 'alert-success' : 'alert-info';

        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.student.name}</td>
                <td>${order.student.enrollment}</td>
                <td style="max-width: 300px; word-wrap: break-word;">${bookDetails}</td>
                <td>₹${order.totalAmount.toFixed(2)}</td>
                <td>${order.paymentMethod}</td>
                <td>${orderDate}</td>
                <td><span class="${statusClass}" style="padding: 5px 10px; border-radius: 3px;">${order.status}</span></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// Utility Functions
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    currentUser = null;
    cart = [];
    showAlert('You have been logged out', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function adminLogout() {
    localStorage.removeItem('adminLogged');
    showAlert('Admin logout successful', 'info');
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 1000);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    // Add to page
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alert, container.firstChild);

    // Auto remove
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});
