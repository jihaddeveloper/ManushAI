Project setup instruction: 

==> clone project
==> package install command: npm i --save
==> project run command: npm start / nodemon

======================================

All API endpoint:

User: Fully complete
-------------------------------------------------------
// @route   GET http://localhost:9000/api/user/all-user
// @desc    Get All User
// @access  Public

// @route   POST http://localhost:9000/api/user/register
// @desc    Register User
// @access  Public

// @route   POST http://localhost:9000/api/user/login
// @desc    Login User / Returning JWT Token
// @access  Public

// @route   GET http://localhost:9000/api/user/current-user
// @desc    Return current user
// @access  Private

// @route   GET http://localhost:9000/api/user/logout
// @desc    Logout current user
// @access  Private

// @route   PUT http://localhost:9000/api/user/update/:id
// @desc    Update user information
// @access  Private

// @route   DELETE http://localhost:9000/api/user/:id
// @desc    Delete user with id
// @access  Private
----------------------------------------------------

Item: Fully complete
----------------------------------------------------
// @route   POST http://localhost:9000/api/item/create
// @desc    Create item
// @access  Public

// @route   GET http://localhost:9000/api/item/all
// @desc    Get all item
// @access  Private
-----------------------------------------------------

Order: Pertially complete( Time issue)
-----------------------------------------------------
// @route   POST http://localhost:9000/api/order/create
// @desc    Create order
// @access  Private

// @route   POST http://localhost:9000/api/order/confirm
// @desc    Confirm order
// @access  Private
----------------------------------------------------