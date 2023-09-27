import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    required: [true, "Please provide a first name"],
    type: String,
  },
  lastName: {
    required: [true, "Please provide a last name"],
    type: String,
  },
  email: {
    required: [true, "Please provide an email"],
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
