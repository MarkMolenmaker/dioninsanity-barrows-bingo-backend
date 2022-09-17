const express = require("express");
const router = express.Router();
const bingoCardController = require("../controller/bingoCardController");
const auth = require("../../../config/auth");

router.get("/", bingoCardController.getAllBingoCards);
router.get("/:player", bingoCardController.getAllBingoCardsFromPlayer);
router.post("/new", auth, bingoCardController.getCreateNewBingoCard);
router.post("/remove", auth, bingoCardController.deleteOneBingoCardFromPlayer);

module.exports = router;