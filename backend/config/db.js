import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishalverma4942:zMZORduJWizOG3sg@cluster0.ve5ir.mongodb.net/pizza"
    );
    console.log("DB Connected");
  } catch (err) {
    console.error("DB connection error:", err.message);
  }
};
