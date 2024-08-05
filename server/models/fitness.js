const mongoose = require('mongoose');

const FitnessSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    height: Number,
    weight: Number,
    gender: String,
    exerciseLevel: String,
    caloriesConsumed: { type: Number, default: 0 },
    dailyGoal: { type: Number, default: 0 },
    glassesConsumed: { type: Number, default: 0 },
    text: String
});

const FitnessModel = mongoose.model("Users", FitnessSchema);
module.exports = FitnessModel;
