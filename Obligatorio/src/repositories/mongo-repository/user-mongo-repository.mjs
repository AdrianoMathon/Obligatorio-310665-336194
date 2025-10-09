import User from "../../model/user.mjs";

const userMongoRepository = {

    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            throw error;
        }
    },

    //obtiene todos los usuario
    async getUsers() {
        try {
            return await User.find();
        } catch (error) {
            throw error;
        }
    },

    //posiblemente para obtener datos de un usuario
    async getUserById(data) {
        try {
            return await User.findById(data).select("-password");
        } catch (error) {
            throw error;
        }
    },

    //usuario con su password
    async getUserByEmail(data) {
        try {
            return await User.findOne(data);
        } catch (error) {
            throw error;
        }
    },

    //actualiza el usuario
    async updateUser(userId, updateData) {
        try {
            return await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
        } catch (error) {
            throw error;
        }
    },

}

export default userMongoRepository;