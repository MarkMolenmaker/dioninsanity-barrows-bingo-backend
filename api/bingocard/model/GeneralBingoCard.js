const mongoose = require("mongoose");

// GeneralBingoCard model
const generalBingoCardSchema = mongoose.Schema({
    layout: {
        type: String,
        required: [true, "Layout is required"]
    },
    bonus_layout: {
        type: String,
        required: [true, "Bonus Layout is required"]
    }
});

const GeneralBingoCard = mongoose.model("GeneralBingoCard", generalBingoCardSchema);
module.exports = GeneralBingoCard;