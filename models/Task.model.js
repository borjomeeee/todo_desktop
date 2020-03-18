const { Schema, model, Types } = require('mongoose');

const taskSchema = new Schema({
  planId: { type: Types.ObjectId, ref: 'Plan' },
  userId: { type: Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  checked: { type: Boolean, required: true }
});

module.exports = model('Task', taskSchema);
