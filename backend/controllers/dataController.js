const Data = require('../models/Data');
const csvParser = require('../utils/csvParser');

exports.getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    const { rowName, columns } = req.body;
    let data = await Data.findOne({ rowName });
    
    if (data) {
      data.columns = columns;
      await data.save();
    } else {
      data = await Data.create({ rowName, columns });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};