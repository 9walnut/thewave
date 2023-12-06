const express = require("express");
const controller = require("../controllers/Cpayments.js");
const router = express.Router();

// 결제하기
router.post("/:productId", controller.goPayment);

module.exports = router;
