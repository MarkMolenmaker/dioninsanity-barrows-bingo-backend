const BingoCard = require("../model/BingoCard");
const Player = require("../model/Player");

/**
 * Function to shuffle an array.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} - The shuffled array.
 * **/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

exports.getAllBingoCards = async (req, res) => {
    try {
        // Get all bingocards
        const cards = await BingoCard.find();
        res.status(201).json({ cards });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.getAllBingoCardsFromPlayer = async (req, res) => {
    try {
        // Get all bingocards from a player
        const cards = await BingoCard.find({ player: req.params.player });
        res.status(201).json({ cards });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.deleteOneBingoCardFromPlayer = async (req, res) => {
    try {
        // Delete a bingocard from a player
        const card = await BingoCard.findOneAndDelete({ player: req.body.player });
        res.status(201).json({ card });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.getCreateNewBingoCard = async (req, res) => {
    // Check if the player exists
    try {
        const player = await Player.findOne({ name: req.body.player });
        if (!player) {
            res.status(400).json({ err: "The player: " + req.body.player + " does not exist!" });
            return;
        }
    } catch (err) {
        res.status(400).json({ err: err });
        return;
    }
    // Create a new card
    try {
        // Generate a random layout by shuffling the array
        let layout = [
            "ahrim_hood", "ahrim_robetop", "ahrim_robeskirt", "ahrim_staff",
            "dharok_helm", "dharok_platebody", "dharok_platelegs", "dharok_greataxe",
            "guthan_helm", "guthan_platebody", "guthan_chainskirt", "guthan_warspear",
            "karil_coif", "karil_leathertop", "karil_leatherskirt", "karil_crossbow",
            "torag_helm", "torag_platebody", "torag_platelegs", "torag_hammers",
            "verac_helm", "verac_brassard", "verac_plateskirt", "verac_flail"
        ];
        shuffle(layout);

        // Allocate bonuses to random positions
        // Copy the layout array to a new array
        let bonus_array = layout.slice();
        // Pick 5 random elements from the copied array
        let bonus_layout = shuffle(bonus_array).slice(0, 5);

        // Insert the clue scroll in the middle of the array
        layout.splice(12, 0, "clue_scroll_elite");

        const bingoCard = new BingoCard({
            player: req.body.player,
            layout: layout.toString(),
            bonus_layout: bonus_layout.toString()
        });

        let data = await bingoCard.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};