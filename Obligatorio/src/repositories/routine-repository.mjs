import routineMongoRepository from "./mongo-repository/routine-mongo-repository.mjs";
import "dotenv/config";
import { baseConstant } from "../constant/base-constant.mjs";

let routineRepository;

if (process.env.DB_TYPE == baseConstant.MONGO) {
    routineRepository = routineMongoRepository;
}

export default routineRepository;
