const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    plans: [{ type: Types.ObjectId, ref: 'Plan' }]
});

module.exports = model('User', userSchema);
