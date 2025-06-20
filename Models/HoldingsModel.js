const { model } = require('mongoose');
const { HoldingsSchema } = require('../schema/HoldingsSchema');

const HoldingsModel = model("Holding", HoldingsSchema); // ✅ NO `new`

module.exports = { HoldingsModel };