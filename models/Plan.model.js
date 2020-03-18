const { Schema, model, Types } = require('mongoose');

const planSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  date: { type: Number, required: true },
  title: { type: String, required: true },
  tasks: [{ type: Types.ObjectId, ref: 'Task' }]
});

module.exports = model('Plan', planSchema);
