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
        return Routine.find()
        // .populate('exercises') trae los documentos completos de la colección referenciada (exercises) en lugar de solo sus IDs.
    },
    
    async countRoutinesByUserId(data) {
        return Routine.countDocuments({ userId: data });
    }
    
}

export default routineMongoRepository;