const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


async function registerController(req,res){

    const { name, email, username, password, bio, gender } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:(isUserAlreadyExists.email == email ? "Email already exists" : "Username already exist")
        })
    }

    const hash = await bcrypt.hash(password,10);

    let profileImage;
    
    if (req.file) {
        const fileBase64 = req.file.buffer.toString("base64");

    const file = await imagekit.files.upload({
        file: `data:${req.file.mimetype};base64,${fileBase64}`, // ✅ base64 string
        fileName: `profile_${Date.now()}`,
        folder: "momentz-profiles",
    });

    profileImage = {
        id: file.fileId,
        url: file.url,
    };
    }

    const user = await userModel.create({
        name,
        username,
        email,
        bio,
        gender,
        password:hash,
         ...(profileImage && { profileImage }),
    })
    
    const token = jwt.sign(
        {
        id:user._id,
        username: user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"3d"}
    )

    res.cookie("token",token);
    res.status(201).json({
        message:"User registered successfully",
        user:{
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            gender: user.gender,
            profileImage: user.profileImage,
        }
    })

}


async function loginController (req,res) {
    const { username, email, password } = req.body;

    console.log("check 1")
    const user = await userModel.findOne({
        $or:[
            {email: email},
            {username: username}
        ]
    }).select("+password")
    console.log("check 2")
    console.log("check 3",user)
    
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    console.log("check 3",user)
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Entered incorrect password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200)
    .json({
        message:"User loggedIn successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function getMeController (req,res){

    const userID = req.user.id;

    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}





module.exports = {
    registerController,
    loginController,
    getMeController
}