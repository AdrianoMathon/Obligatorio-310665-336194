import mongoose from "mongoose";
import routineSchema from "./schemas/routine-schema.mjs";

const routine = mongoose.model("Routine", routineSchema);

export default routine;