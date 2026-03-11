const Transcation = require("../models/Transction");

//get all transcation

exports.getTranscation = async (req, res, next) => {
  try {
    const transaction = await Transcation.find();
    return res.status(200).json({
      success: true,
      count: transaction.length,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

exports.addTranscation = async (req, res, next) => {
  try {
    const { text, body } = req.body;
    const transaction = await Transcation.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: message,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "server error",
      });
    }
  }
};

exports.deleteTranscation = async (req, res, next) => {
  try {
    const transaction = await Transcation.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
