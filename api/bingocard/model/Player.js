const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Player model
const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    loot: {
        ahrim_hood: { amount: { type: Number, default: 0 } },
        ahrim_robetop: { amount: { type: Number, default: 0 } },
        ahrim_robeskirt: { amount: { type: Number, default: 0 } },
        ahrim_staff: { amount: { type: Number, default: 0 } },

        dharok_helm: { amount: { type: Number, default: 0 } },
        dharok_platebody: { amount: { type: Number, default: 0 } },
        dharok_platelegs: { amount: { type: Number, default: 0 } },
        dharok_greataxe: { amount: { type: Number, default: 0 } },

        guthan_helm: { amount: { type: Number, default: 0 } },
        guthan_platebody: { amount: { type: Number, default: 0 } },
        guthan_chainskirt: { amount: { type: Number, default: 0 } },
        guthan_warspear: { amount: { type: Number, default: 0 } },

        karil_coif: { amount: { type: Number, default: 0 } },
        karil_leathertop: { amount: { type: Number, default: 0 } },
        karil_leatherskirt: { amount: { type: Number, default: 0 } },
        karil_crossbow: { amount: { type: Number, default: 0 } },

        torag_helm: { amount: { type: Number, default: 0 } },
        torag_platebody: { amount: { type: Number, default: 0 } },
        torag_platelegs: { amount: { type: Number, default: 0 } },
        torag_hammers: { amount: { type: Number, default: 0 } },

        verac_helm: { amount: { type: Number, default: 0 } },
        verac_brassard: { amount: { type: Number, default: 0 } },
        verac_plateskirt: { amount: { type: Number, default: 0 } },
        verac_flail: { amount: { type: Number, default: 0 } },

        clue_scroll_elite: { amount: { type: Number, default: 0 } }
    }
});

const Player = mongoose.model("Player", playerSchema);
module.exports = Player;