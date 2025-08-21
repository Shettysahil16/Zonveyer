import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please provide all the required fields.",
        success: false,
        error: true,
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        message: "User already exists with this email.",
        success: false,
        error: true,
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
        success: false,
        error: true,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userData = new User({
      ...req.body,
      password: hashPassword,
    });

    const savedUser = await userData.save();
    return res.status(201).json({
      message: "user created successfully",
      data: savedUser,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        message: "please provide all the details",
        success: false,
        error: true,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
        success: false,
        error: true,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(422).json({
        message: "incorrect password",
        success: false,
        error: true,
      });
    }
    const { password: _password, ...userWithoutPassword } = user.toObject();

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
      expiresIn: "30d",
    });

    const tokenOption = {
      httpOnly: true,
      secure: true, 
    };

    return res.cookie("token", jwtToken, tokenOption).status(200).json({
      message: "login successful",
      data: userWithoutPassword,
      token: jwtToken,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export const logout = async(req,res) => {
   try {
        res.clearCookie("token");
        
        return res.status(200).json({
            message : "user logout successful",
            success : true,
            error : false,
            data : [],
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error",
            success : false,
            error : true
        })
    }
}

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const allUsers = await User.find({ _id: { $ne: currentUserId } }).select(
      "-password"
    );

    return res.status(200).json({
      message: "all users",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
