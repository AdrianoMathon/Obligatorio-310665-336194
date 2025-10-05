import Routine from "../../model/routine.mjs";

const routineMongoRepository = {
    async createRoutine(data) {
        try {
            const routine = new Routine(data)
            const routineCreada = await routine.save();
            return routineCreada;
        } catch (error) {
            console.log('No se pudo crear la rutina en mongo', error)
        }
    },

    async getRoutines() {
        try {
            return await Routine.find();
        } catch (error) {
            console.log('No se pudieron obtener las rutinas en mongo', error);
        }

    },

    async getRoutineById(id) {
        try {
            return await Routine.findById(id);
        } catch (error) {
            console.log('No se pudo obtener la rutina por id en mongo', error);
        }

    },

    async getRoutineByUserId(userId) {
        try {
            return await Routine.find({ userId: userId });
        } catch (error) {
            console.log('No se pudo obtener la rutina por userId en mongo', error);
        }

    },

    async countRoutinesByUserId(data) {
        try {
            return await Routine.countDocuments({ userId: data });
        } catch (error) {
            console.log('No se pudieron contar las rutinas por userId en mongo', error);
        }
    },

    async updateRoutine(id, data) {
        try {
            return await Routine.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.log('No se pudo actualizar la rutina en mongo', error);
        }
    },
    
    async deleteRoutine(id) {
        try {
            return await Routine.findByIdAndDelete(id);
        } catch (error) {
            console.log('No se pudo eliminar la rutina en mongo', error);
        }
    }
}

export default routineMongoRepository;