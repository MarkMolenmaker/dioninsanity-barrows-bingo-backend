const GeneralBingoCard = require("../model/GeneralBingoCard");

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

exports.getGeneralBingoCard = async (req, res) => {
    try {
        // Get the GeneralBingoCard
        const generalBingoCard = await GeneralBingoCard.find();
        res.status(201).json({ generalBingoCard });
    } catch (err) {
        res.status(400).json({ err: err });
    }
}

exports.getCreateGeneralBingoCard = async (req, res) => {
    // Check if a card already exists
    try {
        const generalBingoCardArray = await GeneralBingoCard.find();
        if (generalBingoCardArray.length > 0) {
            res.status(400).json({ err: "A general bingo card already exists!" });
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

        const generalBingoCard = new GeneralBingoCard({
            layout: layout.toString(),
            bonus_layout: bonus_layout.toString()
        });

        let data = await generalBingoCard.save();
        res.status(201).json({ data });
    } catch (err) {
        res.status(400).json({ err: err });
    }
};