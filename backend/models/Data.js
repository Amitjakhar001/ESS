

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  rowName: { type: String, required: true },
  columns: [{
    value: { type: String, required: true },
    typeOfData: { type: String, required: true },
    lengthOfData: { type: Number, required: true }
  }]
});

module.exports = mongoose.model('Data', dataSchema);