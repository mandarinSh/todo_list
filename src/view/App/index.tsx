import React from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore';
import { NewTaskInput } from '../components/NewTaskInput';
import { TasksView } from '../components/TasksView';

import styles from './index.module.scss';

export const App: React.FC = () => {
    const [tasks, createTask, updateTask, removeTask, setTaskStatus] = useToDoStore((state) => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
        state.setTaskStatus,
    ]);

    return (
        <>
            <header 
            className={styles.articleHeader}
            >
                <h1>
                    ToDoApp
                </h1>
                <div>
                    Today
                </div>
                <div>
                    <NewTaskInput
                        onAdd={(title) => {
                            if (title) {
                                createTask(title)
                            }
                        }}
                    />
                </div>
            </header>
            <article className={styles.article}>
                <section className={styles.articleSection}>
                    <>
                        {!tasks.length && (
                            <p className={styles.articleText}>There are no tasks yet.</p>
                        )}
                        {tasks.map((task) => (
                            <TasksView
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                checked={task.checked}
                                onDone={removeTask}
                                onEdited={updateTask}
                                onRemoved={removeTask}
                                onChecked={setTaskStatus}
                            />
                        ))}
                    </>
                </section>
            </article>
        </>

        // <article className={styles.article}>
        //     <h1 className={styles.articleTitle}>To-do App</h1>
        //     <section className={styles.articleSection}>
        // <NewTaskInput
        //     onAdd={(title) => {
        //         if (title) {
        //             createTask(title)
        //         }
        //     }}
        // />
        //     </section>
        // <section className={styles.articleSection}>
        //     <>
        //         {!tasks.length && (
        //             <p className={styles.articleText}>There are no tasks yet.</p>
        //         )}
        //         {tasks.map((task) => (
        //             <TasksView
        //                 key={task.id}
        //                 id={task.id}
        //                 title={task.title}
        //                 onDone={removeTask}
        //                 onEdited={updateTask}
        //                 onRemoved={removeTask}
        //             />
        //         ))}
        //     </>
        // </section>
        // </article>
    );
}
