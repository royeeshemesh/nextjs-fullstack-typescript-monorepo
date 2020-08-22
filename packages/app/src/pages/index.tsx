import {CreateNewTaskDTO, GetAllTasksDTO} from "@nextjs-fullstack/common/dist/dto/api";
import {ITask} from "@nextjs-fullstack/common/dist/model/task";
import {typedFetch} from "network";
import React, {useState} from 'react';

interface NewTaskPanelProps {
    onTaskAdded: (value: ITask) => void
}

const NewTaskPanel: React.FC<NewTaskPanelProps> = (props) => {
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');

    const handleSave = async () => {
        const response: CreateNewTaskDTO = await typedFetch<CreateNewTaskDTO>('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: taskTitle,
                description: taskDescription
            })
        });

        props.onTaskAdded(response.task);

        setTaskTitle('');
        setTaskDescription('')
    };

    return (
        <div className="create-new-panel">
            {/*language=CSS*/}
            <style jsx>{`
              .create-new-panel {
                border: 1px solid lightgray;
                padding: 10px;
              }

              section {
                margin-bottom: 10px;
              }

              section .title {
                margin-top: 0;
              }

              section label {
                display: block;
              }

            `}</style>

            <h3 className="title">Create New Task</h3>
            <section>
                <label>Title</label>
                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
            </section>
            <section>
                <label>Description</label>
                <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}/>
            </section>
            <section>
                <button type="button" onClick={handleSave}>Save</button>
            </section>
        </div>
    );
};

interface IndexProps {
    tasks: ITask[]
}

const Index: React.FC<IndexProps> = (props) => {
    const [tasks, setTasks] = useState<ITask[]>(props.tasks);

    const handleTaskAdded = (newTask: ITask) => {
        console.info(newTask);
        setTasks([newTask, ...tasks]);
    };

    return (
        <div>
            <h1>Tasks</h1>

            <NewTaskPanel onTaskAdded={handleTaskAdded}/>

            {(tasks && !!tasks.length) &&
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task: ITask) => {
                    return (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>}
        </div>
    );
};

export const getServerSideProps = async (context) => {
    let tasks: ITask[] = [];

    try {
        const response: GetAllTasksDTO = await typedFetch<GetAllTasksDTO>(`${context.req.proxyServer}/api/tasks`);
        tasks = response.tasks;
    } catch (e) {
        console.error(e);
    }

    return {props: {tasks}}
};

export default Index;