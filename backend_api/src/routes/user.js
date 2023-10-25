const express = require("express");

const usermodel = require("../models/user.js");
const addmomentData = require("../models/moment.js");
const signinData = require('../models/signin.js')

const router = express.Router();

router.post("/Adduser", async (req, res) => {
  const reqdata = req.body;

  const numcode = reqdata.numcode

  console.log("numcode",numcode);

  console.log("reqdata", reqdata);
  let userdata = new usermodel({
    firstname: reqdata.firstname,
    lastname: reqdata.lastname,
    numcode:reqdata.numcode,
    mobile: numcode + reqdata.mobile,
    email: reqdata.email,
    city: reqdata.city,
    password: reqdata.password,
  });
  try {
    let sentuserData = await userdata.save();
    res
      .status(200)
      .json({
        status: 200,
        data: sentuserData,
        message: "user Added Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});


router.post("/signinuser", async (req, res) => {
  const reqdata = req.body;

  console.log("reqdata", reqdata);
  let signiData = new signinData({
   email:reqdata.email,
   password:reqdata.password
  });
  try {
    let sentuserData = await signiData.save();
    res
      .status(200)
      .json({
        status: 200,
        data: sentuserData,
        message: "user Added Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});



router.post("/addmoments", async (req, res) => {
  const reqdata = req.body;

  console.log("reqdata", reqdata);
  let addmomentsData = new addmomentData({
    title: reqdata.title,
    tag: reqdata.tag,
    image: reqdata.image,
  });
  try {
    let sentuserData = await addmomentsData.save();
    res
      .status(200)
      .json({
        status: 200,
        data: sentuserData,
        message: "user Added Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});

router.get("/getUser", async (req, res) => {
  try {
    let sentuserData = await addmomentData.find();
    res
      .status(200)
      .json({
        status: 200,
        data: sentuserData,
        message: "user fetch Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});

router.get("/getuserDetails/:userid",async(req,res)=>{
  try{
    const userdetails = await addmomentData.findById(req.params.userid)
    
    if (!userdetails) {
            throw new Error('userdetails not found');
        }
        res
        .status(200)
        .json({
          status: 200,
          data: userdetails,
          message: "user fetch Successfully",
          error: false,
        });
  }
 catch(err){
  res.status(400).json({ status: 400, message: err, error: true });
 }})

router.patch("/updateUser/:userid", async (req, res) => {
  const reqdata = req.body;
  console.log("reqdata",reqdata);
  try {
    let updatedData = await addmomentData.findByIdAndUpdate(
      { _id: req.params.userid },
      { ...reqdata }
    );
    res
      .status(200)
      .json({
        status: 200,
        data: updatedData,
        message: "user updated Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});

router.delete("/Deleteuser/:userid", async (req, res) => {
  try {
    let deleted = await addmomentData.findByIdAndDelete(
      req.params.userid
    );
    res
      .status(200)
      .json({
        status: 200,
        data: deleted,
        message: "user data deleted Successfully",
        error: false,
      });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message, error: true });
  }
});

module.exports = router;
