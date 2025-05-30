const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();
 
router
.route('/users')
.get(authMiddleware, adminMiddleware ,adminController.getAllUsers);

router
    .route('/users/:id')
    .get(authMiddleware, adminMiddleware, adminController.GetUserById);

router
    .route('/users/update/:id')
    .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
.route('/users/delete/:id')
.delete(authMiddleware , adminMiddleware ,adminController.deleteUserById);

router
.route('/contacts')
.get(authMiddleware, adminMiddleware ,adminController.getAllcontacts);

router
    .route('/contacts/delete/:id')
    .delete(authMiddleware, adminMiddleware, adminController.DeletecontactById);

module.exports = router;
