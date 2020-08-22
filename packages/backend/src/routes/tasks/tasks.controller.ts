import {CreateNewTaskDTO, GetAllTasksDTO} from "@nextjs-fullstack/common/dist/dto/api";
import {TASK_STATUS_ENUM} from "@nextjs-fullstack/common/dist/model/task";
import Debug from "debug";
import express from "express";
import Task from "routes/tasks/tasks.model";

const debug = Debug('api:routes:tasks');

export const getAllTasks = async (req: express.Request, res: express.Response) => {
    debug('getAllTasks');

    try {
        const tasks = await Task.find();

        const getAllTasksDTO: GetAllTasksDTO = {
            tasks
        };

        res.status(200).send(getAllTasksDTO);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

export const createNewTask = async (req: express.Request, res: express.Response) => {
    debug('createNewTask');

    try {
        const {title, description} = req.body;

        const newTask = await Task.create({
            title,
            description,
            status: TASK_STATUS_ENUM.NEW
        });

        const createNewTask: CreateNewTaskDTO = {
            task: newTask
        };

        res.status(201).send(createNewTask);

    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};