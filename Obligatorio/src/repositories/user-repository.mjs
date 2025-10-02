import userMongoRepository from "./mongo-repository/user-mongo-repository.mjs";
import userJsonRepository from "./json-repository/user-json-repository.mjs";
import { baseConstant } from "../constant/base-constant.mjs";
import "dotenv/config";

let userRepository;

if (process.env.DB_TYPE == baseConstant.MONGO) {
    userRepository = userMongoRepository;
} else if (process.env.DB_TYPE == baseConstant.JSON) {
    userRepository = userJsonRepository;
}

export default userRepository;