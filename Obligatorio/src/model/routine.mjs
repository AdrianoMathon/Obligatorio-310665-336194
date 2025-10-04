import mongoose from "mongoose";
import routineSchema from "./schema/routineSchema.mjs";

const routine = mongoose.model("Routine", routineSchema);

export default routine;