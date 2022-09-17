const Player = require("../model/Player");
const BingoCard = require("../model/BingoCard");

// Get all Players
exports.getAllPlayers = async (req, res) => {
    try {
        // Get all the Players
        const player = await Player.find();
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

// Get all the player names
exports.getAllPlayerNames = async (req, res) => {
    try {
        // Get all the Player names
        const player = await Player.find({}, { name: 1, _id: 1 });
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

// Create a new Player
exports.postCreatePlayer = async (req, res) => {
    // Check if a player already exists by its name
    try {
        const player = await Player.findOne({ name: req.body.name });
        if (player) return res.status(400).json({ error: "User already registered" });
    } catch (err) {
        res.status(400).json({ err: err });
        return;
    }
    // Create a new player
    try {
        const player = new Player({ name: req.body.name });
        let data = await player.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};

// Get a Player by its name
exports.getPlayerByName = async (req, res) => {
    try {
        const player = await Player.findOne({ name: req.params.name });
        if (!player) return res.status(404).json({ error: "No matches with this name" });
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

// Delete a Player by its name
exports.deletePlayerByName = async (req, res) => {
    if (req.params.name === "DionInsanity") return res.status(400).json({ error: "You cannot delete DionInsanity" });
    try {
        // Check if player exists
        const player_check = await Player.findOne({ name: req.params.name });
        if (!player_check) return res.status(404).json({ error: "No matches with this name" });

        // Get all the cards from the player
        const bingoCards = await BingoCard.find({ player: req.params.name });

        // delete all the cards from the player
        bingoCards.forEach(async (card) => {
            await BingoCard.deleteOne({ _id: card._id });
        });

        const player = await Player.findOneAndDelete({ name: req.params.name });
        if (!player) return res.status(404).json({ error: "No matches with this name" });
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

// Add a loot item to a player
exports.addLootItemToPlayer = async (req, res) => {
    try {
        const player = await Player.findOne({ name: req.params.name });
        if (!player) return res.status(404).json({ error: "No matches with this name" });
        player.loot[req.params.loot_item].amount += 1;
        player.save();
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

// Remove a loot item from a player
exports.removeLootItemFromPlayer = async (req, res) => {
    try {
        const player = await Player.findOne({ name: req.params.name });
        if (!player) return res.status(404).json({ error: "No matches with this name" });
        if (player.loot[req.params.loot_item].amount <= 0) return res.status(400).json({ error: "Amount cannot be lower than 0" });
        player.loot[req.params.loot_item].amount -= 1;
        player.save();
        res.status(201).json({ player });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}