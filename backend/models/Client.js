import mongoose from "mongoose";

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validateEmail, "Please enter a valid email"],
    unique: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  registrationTime: {
    type: String,
    required: [true],
  },
});

export default mongoose.model("Client", clientSchema);
