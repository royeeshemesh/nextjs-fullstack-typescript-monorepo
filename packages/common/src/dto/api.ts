import {ITask} from "model/task";

export interface GetAllTasksDTO {
    tasks: ITask[]
}

export interface CreateNewTaskDTO {
    task: ITask
}