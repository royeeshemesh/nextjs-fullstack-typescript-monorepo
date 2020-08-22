export enum TASK_STATUS_ENUM {
    NEW = "New",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
}

export interface ITask {
    _id?: string,
    title: string,
    description: string,
    status: TASK_STATUS_ENUM

}