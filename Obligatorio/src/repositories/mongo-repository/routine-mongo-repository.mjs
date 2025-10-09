import Routine from "../../model/routine.mjs";

const routineMongoRepository = {
    async createRoutine(data) {
        try {
            const routine = new Routine(data)
            const routineCreada = await routine.save();
            return routineCreada;
        } catch (error) {
            throw error; 
        }
    },

    async getRoutines() {
        try {
            return await Routine.find();
        } catch (error) {
            throw error; 
        }
    },

    async getRoutineById(id) {
        try {
            return await Routine.findById(id);
        } catch (error) {
            throw error; 
        }
    },

    async getRoutineByUserId(userId) {
        try {
            return await Routine.find({ userId: userId });
        } catch (error) {
            throw error; 
        }
    },

    async countRoutinesByUserId(data) {
        try {
            return await Routine.countDocuments({ userId: data });
        } catch (error) {
            throw error;
        }
    },

    async updateRoutine(id, data) {
        try {
            return await Routine.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw error;
        }
    },
    
    async deleteRoutine(id) {
        try {
            return await Routine.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default routineMongoRepository;