import User from "../../model/user.mjs";

const userMongoRepository = {

    async createUser(data) {
        try {
            const user = new User(data)
            const userCreado = await user.save();
            delete userCreado._doc.password;
            return userCreado;
        } catch (error) {
            console.log('No se pudo crear la tarea en mongo', error)
        }
    },

    //obtiene todos los usuario
    async getUsers() {
        return User.find();
    },

    //posiblemente para obtener datos de un usuario
    async getUserById(data) {
        return User.findById(data).select("-password");
    },

    //usuario con su password
    async getUserByEmail(data) {
        console.log('data', data)
        return User.findOne(data);
    },


    //actualiza el usuario
    async updateUser(userId, updateData) {
        return User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
    },

}

export default userMongoRepository;