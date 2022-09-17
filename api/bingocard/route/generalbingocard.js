const express = require("express");
const router = express.Router();
const generalBingoCardController = require("../controller/generalBingoCardController");
const auth = require("../../../config/auth");

router.get("/", generalBingoCardController.getGeneralBingoCard);
router.get("/create", auth, generalBingoCardController.getCreateGeneralBingoCard);

module.exports = router;