const express = require("express");
const fs = require("fs");
const router = express.Router();

const upload = require("../middlewares/uploadProfilePic");
const User = require("../models/users.models");


router.get("", async(req,res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(200).send(users);
    } catch(err) {
        return res.status(500).send(err);
    }
});


router.post("", upload.single("profile_pic"), async(req,res) => {
    try{
   
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        }
        // incorporating data into the database collection
        const user = await User.create(data);
        return res.status(200).send({user});
    } catch (err) {
        return res.status(500).send(err);
    }
});


router.patch("/:userId", upload.single("profile_pic"), async(req,res) => {
    try{
        
        const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        }
        
     
        let user = await User.findById(req.params.userId);
 
        let path = user.profile_pic;
     
        fs.unlinkSync(path);

    
        user = await User.findByIdAndUpdate(req.params.userId, data, {new: true});
        return res.status(200).send({user});
    } catch (err) {
        return res.status(500).send(err);
    }
});

router.delete("/:userId", async(req,res) => {
    try {
        let user = await User.findById(req.params.userId);
        let path = user.profile_pic;
        fs.unlinkSync(path);
        await User.findByIdAndDelete(req.params.userId);
        return res.status(200).send(user);
    } catch(err) {
        return res.status(500).send(err);
    }
})

module.exports = router;