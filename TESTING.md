# 🧪 Testing Guide & Scenarios

## Getting Started with Testing

### Step 1: Launch the System
1. Open `public/index.html` in any modern web browser
2. You should see a professional-looking home page with gradient background
3. Two main buttons: "Get Started as Student" and "Admin Access"

---

## 📝 Student Login Testing

### Scenario 1: Correct Login
**Objective**: Successfully login as a student

**Steps**:
1. Click "Get Started as Student" or go to student-login.html
2. Fill the form:
   - Name: `Rajesh Kumar`
   - Enrollment: `E12345`
   - DOB: Select any date
   - Mobile: `9876543210` (exactly 10 digits)
   - Email: `rajesh@gmail.com`
   - CAPTCHA: Copy the code shown in the box
3. Click "Login"

**Expected Result**: ✅ Success message "Login successful! Welcome Rajesh Kumar" → Redirect to library.html

---

### Scenario 2: Wrong CAPTCHA Code
**Objective**: Test CAPTCHA validation

**Steps**:
1. Open student-login.html
2. Fill form correctly BUT:
   - Type wrong CAPTCHA code (e.g., type anything different)
3. Click "Login"

**Expected Result**: ❌ Error message "Captcha is incorrect! Please try again." → New CAPTCHA code generated → Input field cleared

---

### Scenario 3: CAPTCHA Refresh
**Objective**: Test CAPTCHA refresh button

**Steps**:
1. Open student-login.html
2. Note the current CAPTCHA code
3. Click "🔄 Refresh Code" button
4. New code should appear

**Expected Result**: ✅ New 6-character CAPTCHA code displayed

---

### Scenario 4: Invalid Mobile Number
**Objective**: Test mobile number validation

**Steps**:
1. Open student-login.html
2. Fill form with:
   - Mobile: `98765` (less than 10 digits)
3. Try to submit

**Expected Result**: ❌ Browser validation error OR error message

---

### Scenario 5: Invalid Email
**Objective**: Test email validation

**Steps**:
1. Open student-login.html
2. Fill with Email: `invalidemail` (no @ or domain)
3. Try to submit

**Expected Result**: ❌ Browser validation error or our error message

---

### Scenario 6: Missing Required Fields
**Objective**: Test required field validation

**Steps**:
1. Open student-login.html
2. Leave Name field empty
3. Try to submit

**Expected Result**: ❌ Error: "Please enter your name"

---

## 📚 Student Library Testing

### Scenario 7: Browse All Books
**Objective**: View all books after login

**Steps**:
1. Login successfully as student
2. You should see library.html

**Expected Result**: ✅ 14 books displayed in grid format with:
- Book name
- Category
- Price in ₹
- "Add to Cart" button
- "Details" button

---

### Scenario 8: Book Category Filter
**Objective**: Filter books by category

**Steps**:
1. Open library.html (after login)
2. In filter dropdown, select "Language"
3. Click or change selection

**Expected Result**: ✅ Only language books displayed:
- English (₹250)
- Gujarati (₹250)
- Sanskrit (₹220)

**Steps (continued)**:
4. Select "Science & Math"

**Expected Result**: ✅ Only science books:
- Mathematics (₹300)
- Science (₹350)
- Social Science (₹320)

**Steps (continued)**:
5. Select "Technology & Programming"

**Expected Result**: ✅ 8 books displayed

**Steps (continued)**:
6. Select "All Categories"

**Expected Result**: ✅ All 14 books displayed

---

### Scenario 9: Add Single Book to Cart
**Objective**: Add a book to shopping cart

**Steps**:
1. In library, find "Java Programming" book
2. Click "Add to Cart" button

**Expected Result**: ✅ Green success message: "Java Programming added to cart!" → Cart counter increases to (1)

---

### Scenario 10: Add Multiple Books
**Objective**: Add different books to cart

**Steps**:
1. Add "English" book → message appears
2. Add "Mathematics" book → message appears
3. Add "Python Programming" book → message appears
4. Check cart counter (should show 3)

**Expected Result**: ✅ All three books in cart, counter shows (3)

---

### Scenario 11: Add Same Book Twice
**Objective**: Test quantity increase

**Steps**:
1. Add "Java Programming" to cart
2. Add "Java Programming" again

**Expected Result**: ✅ Single entry "Java Programming" with quantity 2

---

### Scenario 12: View Book Details
**Objective**: View detailed book information

**Steps**:
1. In library, click "Details" button on any book
2. A modal should appear with:
   - Book title
   - Category
   - Price
   - Description
   - "Add to Cart" button

**Expected Result**: ✅ Modal displays correctly with all info

---

## 🛒 Shopping Cart Testing

### Scenario 13: View Cart
**Objective**: Access and view shopping cart

**Steps**:
1. Add some books to cart
2. Click "Cart" button in header (or 🛒 icon)

**Expected Result**: ✅ Cart page displays all items with:
- Book name
- Unit price
- Quantity with +/- buttons
- Total price per item
- Remove button
- Summary with Subtotal, Tax, Grand Total

---

### Scenario 14: Increase Quantity
**Objective**: Increase book quantity in cart

**Steps**:
1. Open cart.html
2. Find a book item
3. Click the "+" button a few times

**Expected Result**: ✅ Quantity increases → Total price updates automatically

---

### Scenario 15: Decrease Quantity
**Objective**: Decrease book quantity

**Steps**:
1. In cart, find an item with quantity > 1
2. Click the "−" button

**Expected Result**: ✅ Quantity decreases → Totals recalculate

---

### Scenario 16: Remove Item
**Objective**: Remove book from cart

**Steps**:
1. Open cart
2. Click "Remove" button on any book

**Expected Result**: ✅ Book removed from cart → Cart updates → Totals recalculate

---

### Scenario 17: Clear Cart
**Objective**: Clear all items at once

**Steps**:
1. Add multiple books
2. Click "Clear Cart" button

**Expected Result**: ✅ Confirmation prompt → All items removed → Empty cart message

---

### Scenario 18: Cart Persistence
**Objective**: Test if cart is saved

**Steps**:
1. Add books to cart
2. Refresh the page (F5)

**Expected Result**: ✅ Cart items still there (saved in localStorage)

---

### Scenario 19: Calculate Cart Total
**Objective**: Verify tax calculation

**Example**:
- Book 1: ₹250 × 1 = ₹250
- Book 2: ₹300 × 2 = ₹600
- Subtotal: ₹850
- Tax (5%): ₹42.50
- Total: ₹892.50

**Expected Result**: ✅ All calculations correct

---

## 💳 Payment Testing

### Scenario 20: Proceed to Payment
**Objective**: Go to payment page from cart

**Steps**:
1. Add books to cart
2. Click "Proceed to Payment"
3. Should redirect to payment.html

**Expected Result**: ✅ Payment page loads with:
- Order summary
- Student information (pre-filled)
- Payment method options
- Terms checkbox

---

### Scenario 21: Select Payment Method
**Objective**: Select different payment options

**Steps**:
1. On payment page, click radio button for:
   - Credit Card
   - Debit Card
   - Net Banking
   - UPI
   - Digital Wallet

**Expected Result**: ✅ Each option selectable with description visible

---

### Scenario 22: Verify Student Info
**Objective**: Confirm student details on payment page

**Steps**:
1. Login as student with name "Priya Singh", email "priya@mail.com", mobile "9876543211"
2. Go to payment page
3. Check the student information section

**Expected Result**: ✅ Shows:
- Name: Priya Singh
- Email: priya@mail.com
- Mobile: 9876543211

---

### Scenario 23: Complete Payment
**Objective**: Process payment successfully

**Steps**:
1. Add books to cart
2. Go to payment page
3. Select a payment method (e.g., UPI)
4. Check "Terms and Conditions"
5. Click "Complete Payment"

**Expected Result**: ✅ Success message: "Payment successful! Your order has been placed." → Redirect to library.html → Cart cleared

---

### Scenario 24: Payment Without Method
**Objective**: Test validation

**Steps**:
1. Go to payment page
2. DON'T select payment method
3. Click "Complete Payment"

**Expected Result**: ❌ Error message: "Please select a payment method"

---

## 👨‍💼 Admin Dashboard Testing

### Scenario 25: Admin Login Correct
**Objective**: Login as admin

**Steps**:
1. Go to admin-login.html
2. Enter:
   - Username: `Prof.Vedrucha Pandya`
   - Password: `Silveroakuni.ac.in`
3. Click "Login as Admin"

**Expected Result**: ✅ Success message → Redirect to admin-dashboard.html

---

### Scenario 26: Admin Login Wrong
**Objective**: Test admin credential validation

**Steps**:
1. Go to admin-login.html
2. Enter ANY other username/password
3. Click "Login"

**Expected Result**: ❌ Error message: "Invalid admin credentials!"

---

### Scenario 27: View Admin Statistics
**Objective**: Check dashboard statistics

**Steps**:
1. Login as admin
2. Scroll to top of dashboard

**Expected Result**: ✅ Statistics cards show:
- Total Books: 14
- Total Students: 245
- Active Users: 48
- Total Revenue: ₹1,24,560

---

### Scenario 28: Add New Book
**Objective**: Add a book to inventory

**Steps**:
1. Go to admin-dashboard.html (as admin)
2. Scroll to "Books Management"
3. In "Add New Book" form, enter:
   - Book Name: `Advanced Python`
   - Category: `Technology & Programming`
   - Price: `600`
4. Click "Add Book"

**Expected Result**: ✅ Success message: "Book added successfully!" → New book appears in table

---

### Scenario 29: Edit Book
**Objective**: Modify existing book

**Steps**:
1. In books table, find a book
2. Click "Edit" button
3. Prompt appears asking for new data
4. Change the name to `Advanced Java`
5. Click OK

**Expected Result**: ✅ Book updated in table

---

### Scenario 30: Delete Book
**Objective**: Remove a book from inventory

**Steps**:
1. In books table, find a book
2. Click "Delete" button
3. Confirmation dialog appears
4. Click OK

**Expected Result**: ✅ Book removed from table → Success message

---

### Scenario 31: View All Students
**Objective**: Check registered students

**Steps**:
1. Scroll to "Students Management" section
2. View students table

**Expected Result**: ✅ Table shows sample students with:
- Student ID
- Name
- Enrollment
- Email
- Mobile

---

### Scenario 32: View Orders
**Objective**: Check order history

**Steps**:
1. Scroll to "Orders & Payments" section
2. View orders table

**Expected Result**: ✅ Table shows:
- Order ID
- Student Name
- Amount (₹)
- Date
- Status (Completed/Pending)

---

## 🚪 Logout Testing

### Scenario 33: Student Logout
**Objective**: Test student logout

**Steps**:
1. Login as student
2. Go to library.html
3. Click "Logout" button

**Expected Result**: ✅ Logout message → Redirect to index.html → Trying to access library.html redirects to login

---

### Scenario 34: Admin Logout
**Objective**: Test admin logout

**Steps**:
1. Login as admin
2. Click "Logout" button at top

**Expected Result**: ✅ Logout message → Redirect to admin-login.html

---

## 📱 Cross-Device Testing

### Scenario 35: Mobile View
**Objective**: Test on mobile screen

**Steps**:
1. Open any page
2. Press F12 (Developer Tools)
3. Click device toggle (mobile phone icon)
4. Select iPhone 12 or similar

**Expected Result**: ✅ Layout adapts:
- Single column on small screens
- Readable text
- Touch-friendly buttons
- Proper spacing

---

### Scenario 36: Tablet View
**Objective**: Test on tablet screen

**Steps**:
1. In Developer Tools
2. Select tablet device (iPad)

**Expected Result**: ✅ Better layout with multiple columns but optimized

---

### Scenario 37: Desktop View
**Objective**: Test on desktop

**Steps**:
1. Close Developer Tools or set to full screen

**Expected Result**: ✅ Full responsive layout with all features

---

## 🎨 Design Testing

### Scenario 38: Color Scheme
**Expected**: Purple/Blue primary color (#667eea, #764ba2)
**Verify**: All buttons, headers, and primary elements use these colors

### Scenario 39: Responsiveness
**Expected**: No horizontal scrolling on any device
**Verify**: Test on multiple screen sizes

### Scenario 40: Animations
**Expected**: Smooth 0.3s transitions on hover effects
**Verify**: Hover over buttons and cards

---

## ✅ Test Summary

**Total Test Scenarios**: 40+

**Categories**:
- Student Login: 6 tests
- Library & Books: 6 tests
- Shopping Cart: 7 tests
- Payment: 5 tests
- Admin Panel: 8 tests
- Logout: 2 tests
- Device Testing: 3 tests
- Design: 3 tests

**All Tests Should Pass**: ✅ Green
**Status**: Production Ready

---

## 🐛 Common Issues & Solutions

**Issue**: CAPTCHA not working
**Solution**: Refresh page, try again

**Issue**: Cart not updating
**Solution**: Check browser localStorage is enabled

**Issue**: Admin login failing
**Solution**: Check exact credentials (case-sensitive)

**Issue**: Page not loading
**Solution**: Check all files are in correct folders

**Issue**: Styling not applied
**Solution**: Verify style.css path is correct

**Issue**: JavaScript not running
**Solution**: Check js/app.js is loaded in console

---

## 📊 Test Checklist

- [ ] Home page loads correctly
- [ ] Student login works with validation
- [ ] CAPTCHA verification works
- [ ] Library page displays all 14 books
- [ ] Categories filter properly
- [ ] Books can be added to cart
- [ ] Cart shows correct calculations
- [ ] Payment page loads with options
- [ ] Admin login works with correct credentials
- [ ] Admin can add/edit/delete books
- [ ] Admin can view students and orders
- [ ] Logout works correctly
- [ ] Mobile view is responsive
- [ ] All colors and fonts are correct
- [ ] No console errors

**If all checked ✅**: System is working perfectly!

---

Created: March 2024
Last Updated: March 27, 2026
Version: 1.0
