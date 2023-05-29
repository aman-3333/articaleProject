
const ArticaleModel = require('../models/ArticaleModel');
const {successResponse, errorResponse} = require("../service/apiresponse")
const createArticale = async (req, res) => {
  const {userId,articale}=req.body
  try {
    const Articale = await ArticaleModel.create({ userId: userId, articale: articale})
    res.status(200).json(successResponse("createArticale",Articale,res.statusCode))
  } catch (error) {
      res.status(500).json(errorResponse("error in createArticale", res.statusCode));
  }
  };
  


const findAllArticales = async (req, res) => {
  try {
    const Articale = await ArticaleModel.find().populate("userId");
    res.status(200).json(successResponse("findAllArticales",Articale,res.statusCode))
  } catch (error) {
      res.status(500).json(errorResponse("error in findAllArticales", res.statusCode));
  }
  };
  

const findOneArticale = async (req, res) => {
  try {
    const Articale = await ArticaleModel.findOne({ _id: req.body.ArticaleId });
    res.status(200).json(successResponse("findOneArticale",Articale,res.statusCode))
  } catch (error) {
      res.status(500).json(errorResponse("error in findOneArticale", res.statusCode));
  }
  };
  

const updateArticale = async (req, res) => {
  try {
    const ArticaleUpdate = await ArticaleModel.findOneAndUpdate(
      { _id: req.body.articaleId },
    {$set:{ articale: req.body.articale}}, { new: true }
    );
    res.status(200).json(successResponse("updateArticale",ArticaleUpdate,res.statusCode))
  } catch (error) {
      res.status(500).json(errorResponse("error in updateArticale", res.statusCode));
  }
  };
  


const deleteArticale = async (req, res) => {
  try {
    const ArticaleRemoved = await ArticaleModel.findByIdAndDelete(req.body.ArticaleId);
    res.status(200).json(successResponse("ArticaleRemoved",ArticaleRemoved,res.statusCode))
  } catch (error) {
      res.status(500).json(errorResponse("error in ArticaleRemoved", res.statusCode));
  }
  };
  
module.exports = {
  createArticale,
  findAllArticales,
  findOneArticale,
  updateArticale,
  deleteArticale
}