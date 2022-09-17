const mongoose = require("mongoose");

// BingoCard model
const bingoCardSchema = mongoose.Schema({
    player: {
        type: String,
        required: [true, "Player name is required"]
    },
    layout: {
        type: String,
        required: [true, "Layout is required"]
    },
    bonus_layout: {
        type: String,
        required: [true, "Bonus Layout is required"]
    }
});


// Search for the players bingo cards
bingoCardSchema.statics.findByOwner = async (player) => {
    const cards = await BingoCard.find({ player });
    if (cards.length === 0) throw new Error("No BingoCards found for this player");
    return cards;
};

const BingoCard = mongoose.model("BingoCard", bingoCardSchema);
module.exports = BingoCard;