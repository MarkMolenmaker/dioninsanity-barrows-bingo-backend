const express = require("express");
const router = express.Router();
const playerController = require("../controller/playerController");
const auth = require("../../../config/auth");

router.get("/", playerController.getAllPlayers);
router.get("/names", playerController.getAllPlayerNames);
router.get("/:name", playerController.getPlayerByName);
router.delete("/:name", playerController.deletePlayerByName);
router.post("/create", auth, playerController.postCreatePlayer);

router.post("/:name/add/:loot_item", auth, playerController.addLootItemToPlayer);
router.post("/:name/remove/:loot_item", auth, playerController.removeLootItemFromPlayer);

module.exports = router;