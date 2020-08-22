import {ITask, TASK_STATUS_ENUM} from "@nextjs-fullstack/common/dist/model/task";
import mongoose from 'mongoose';

export interface ITaskSchema extends Omit<ITask, '_id'>, mongoose.Document {
}


const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {type: String, default: TASK_STATUS_ENUM.NEW}
}, {
    timestamps: true
});


const Task = mongoose.model<ITaskSchema>('Task', TaskSchema);
export default Task;