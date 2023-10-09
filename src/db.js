import mongoose from "mongoose";
// Conexion a MDB
const URL = "";

export const dbConnect = async () => {
    await mongoose.connect(URL);
}
