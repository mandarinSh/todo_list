import create, { State, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
    checked: boolean;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    setTaskStatus: (id: string, checked: boolean) => void;
}

function isToDoStore(object: any): object is ToDoStore {
    return 'tasks' in object;
}

const getCurrentState = () => {
    try {
        const currentState = JSON.parse(window.localStorage.getItem('tasks') || '[]') as Task[];
        return currentState;
    } catch (err) {
        window.localStorage.setItem('tasks', '[]');
    }
    return [];
};

const localStorageUpdate = <T extends State>(config: StateCreator<T>):
    StateCreator<T> =>
    (set, get, api) =>
        config((nextState, ...args) => {
            if (isToDoStore(nextState)) {
                window.localStorage.setItem('tasks', JSON.stringify(
                    nextState.tasks
                ))
            }
            set(nextState, ...args);
        }, get, api);

export const useToDoStore = create<ToDoStore>(localStorageUpdate
    (devtools((set, get) => ({
        tasks: getCurrentState(),
        createTask: (title: string) => {
            const { tasks } = get();
            const newTask = {
                title: title,
                id: generateId(),
                createdAt: Date.now(),
                checked: false,
            };

            set({
                tasks: [newTask].concat(tasks),
            });
        },
        setTaskStatus: (id: string, checked: boolean) => {
            const { tasks } = get();
            set({
                tasks: tasks.map((task) => ({
                    ...task,
                    checked: task.id === id ? checked : task.checked,
                })),
            });
        },
        updateTask: (id: string, title: string) => {
            const { tasks } = get();
            set({
                tasks: tasks.map((task) => ({
                    ...task,
                    title: task.id === id ? title : task.title,
                })),
            });
        },
        removeTask: (id: string) => {
            const { tasks } = get();
            set({
                tasks: tasks.filter((task) => task.id !== id),
            });
        },
    }))));
