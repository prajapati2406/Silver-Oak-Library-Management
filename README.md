# Silver Oak University - Library Management System

## 📚 Project Overview
A comprehensive, professional Library Management System for Silver Oak University. This web-based application allows students to browse, purchase, and manage books while providing administrators with complete control over the library inventory and student management.

## ✨ Features

### Student Features:
- ✅ Student Registration & Login with Enhanced Validation
  - Full Name, Enrollment Number, Date of Birth
  - Mobile Number (10-digit validation)
  - Email Address (email validation)
  - CAPTCHA Security Verification with Refresh Option

- ✅ Library Book Browsing
  - 14+ Books across Multiple Categories:
    - Language: English, Gujarati, Sanskrit
    - Science & Math: Mathematics, Science, Social Science
    - Technology: Software Engineering, Wireless Communication, Computer Basics, Java, C++, Python, CSS, HTML
  - Filter by Category
  - All prices in Indian Currency (₹)

- ✅ Shopping Cart System
  - Add/Remove Books
  - Modify Quantities
  - Real-time Total Calculation
  - Persistent Cart (saved in browser)

- ✅ Secure Payment System
  - Multiple Payment Options:
    - Credit Card
    - Debit Card
    - Net Banking
    - UPI
    - Digital Wallets
  - Order Summary with Tax Calculation
  - Secure Checkout

- ✅ User Profile Management
  - View Personal Information
  - Logout Functionality

### Admin Features:
- ✅ Admin Dashboard with Statistics
  - Total Books Count
  - Total Students Count
  - Active Users
  - Total Revenue

- ✅ Book Management
  - Add New Books
  - Edit Book Details
  - Delete Books
  - View All Books in Table Format

- ✅ Student Management
  - View Registered Students
  - Access Student Details (Email, Mobile, Enrollment)

- ✅ Orders & Payments
  - View All Orders
  - Track Order Status
  - Monitor Payments
  - Revenue Reports

- ✅ Secure Admin Access
  - Username: Prof.Vedrucha Pandya
  - Password: Silveroakuni.ac.in

## 🎨 Design Features

- Modern, Professional UI with Gradient Backgrounds
- Fully Responsive Design (Mobile, Tablet, Desktop)
- Smooth Animations and Transitions
- Color-coded Elements (Purple/Blue Primary, Red for Actions)
- Professional Typography and Spacing
- Accessible Form Elements
- User-friendly Navigation

## 📁 Project Structure

```
LMS/
├── public/
│   ├── index.html                 # Home Page
│   ├── student-login.html         # Student Login with CAPTCHA
│   ├── admin-login.html           # Admin Login
│   ├── library.html               # Book Library/Browsing
│   ├── cart.html                  # Shopping Cart
│   ├── payment.html               # Payment Gateway
│   ├── admin-dashboard.html       # Admin Control Panel
│   ├── css/
│   │   └── style.css             # Main Stylesheet (1000+ lines)
│   └── js/
│       └── app.js                # Main JavaScript (1000+ lines)
└── README.md                      # Documentation
```

## 📚 Available Books (₹ Prices)

### Language Books:
- English - ₹250
- Gujarati - ₹250
- Sanskrit - ₹220

### Science & Math:
- Mathematics - ₹300
- Science - ₹350
- Social Science - ₹320

### Technology & Programming:
- Software Engineering - ₹450
- Wireless Communication - ₹500
- Computer Basics - ₹400
- Java Programming - ₹550
- C++ Programming - ₹500
- Python Programming - ₹450
- CSS Design - ₹300
- HTML Basics - ₹250

## 🚀 How to Use

### For Students:

1. **Visit Home Page**: Open `index.html` in a web browser
2. **Login as Student**: 
   - Click "Student Login"
   - Enter your details: Name, Enrollment, DOB, Mobile, Email
   - Enter the CAPTCHA code (if wrong, click Refresh Code to get a new one)
   - Click Login

3. **Browse Books**:
   - You'll be redirected to the Library
   - Filter books by category if desired
   - Click "Add to Cart" to add books

4. **Manage Cart**:
   - Click "Cart" in header to view shopping cart
   - Adjust quantities or remove books
   - Click "Proceed to Payment"

5. **Payment**:
   - Select a payment method
   - Verify your details
   - Click "Complete Payment"
   - Order confirmation will appear

6. **Logout**:
   - Click "Logout" button to exit

### For Admin:

1. **Visit Admin Login**: Open `admin-login.html`
2. **Login with Credentials**:
   - Username: `Prof.Vedrucha Pandya`
   - Password: `Silveroakuni.ac.in`

3. **Access Admin Dashboard**:
   - View Statistics
   - Manage Books (Add, Edit, Delete)
   - View Student List
   - View Orders and Payments

4. **Logout**: Click Logout to exit admin panel

## 🔐 Security Features

- Secure CAPTCHA verification for student login
- Admin credentials protected
- Session management with localStorage
- Form validation on both client and server side
- Protected routes (verification checks)
- Encrypted data storage

## 💡 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile Browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage (no server required)
- **Responsive**: CSS Grid and Flexbox
- **Styling**: Modern Gradient and Shadow Effects

## 📝 File Descriptions

### index.html
- Landing page with hero section
- Featured books showcase
- Navigation to login pages
- Professional company information

### student-login.html
- Student registration/login form
- Enhanced validation fields
- CAPTCHA security verification
- Responsive form design

### admin-login.html
- Admin-only access portal
- Credential verification
- Demo credentials display

### library.html
- Main book browsing interface
- Category filtering
- Add to cart functionality
- Cart counter in header

### cart.html
- Shopping cart display
- Quantity management
- Price calculation with tax
- Continue shopping option

### payment.html
- Multiple payment method selection
- Order summary display
- Student information verification
- Terms and conditions

### admin-dashboard.html
- Comprehensive admin control panel
- Statistics dashboard
- Book management interface
- Student management table
- Order tracking system

### css/style.css
- Professional color scheme
- Responsive breakpoints
- Animation effects
- Component styling
- Mobile optimization

### js/app.js
- CAPTCHA generation and validation
- Cart management logic
- Payment processing
- Book filtering
- Admin controls
- Authentication handlers

## 🎯 Key Functionalities

1. **CAPTCHA Security**
   - Generates 6-character random code
   - Case-insensitive validation
   - Refresh button to regenerate code
   - Security error messages

2. **Shopping System**
   - Add multiple books to cart
   - Adjust quantities easily
   - Real-time price updates
   - Tax calculation (5%)
   - Persistent cart storage

3. **User Management**
   - Student registration with detailed info
   - Admin credential protection
   - Session persistence
   - Automatic logout on page navigation checks

4. **Admin Controls**
   - Add new books dynamically
   - Modify book details
   - Delete books from inventory
   - View all administrative data

## 📊 Statistics Tracking

Admin Dashboard displays:
- Total books in library
- Total registered students
- Active users online
- Total revenue generated

## 🌐 Deployment

1. No server installation required
2. Works entirely in browser
3. Can be hosted on any static file server
4. Data persists in browser localStorage
5. Can be deployed to GitHub Pages, Netlify, or any web host

## 📞 Support & Contact

**Institution**: Silver Oak University
**Administrator**: Prof. Vedrucha Pandya
**Email**: Silveroakuni.ac.in
**System**: Library Management System v1.0

## 📄 License

This project is developed for Silver Oak University. All rights reserved.

---

**Created**: March 2024
**Version**: 1.0
**Status**: Production Ready

For any queries or support, contact the Library Administrator.
