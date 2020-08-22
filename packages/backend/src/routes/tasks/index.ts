import express from 'express';
import * as controller from "routes/tasks/tasks.controller";

const router = express.Router();

router.get('/', controller.getAllTasks);
router.post('/', controller.createNewTask);

export default router;
