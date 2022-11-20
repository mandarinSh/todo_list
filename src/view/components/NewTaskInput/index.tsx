import React, { useCallback, useState } from 'react';
import { TextField, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import styles from './index.module.scss';

interface NewTaskInputProps {
    onAdd: (title: string) => void,
};

export const NewTaskInput: React.FC<NewTaskInputProps> = ({
    onAdd,
}) => {
    const [inputValues, setInputValue] = useState('');
    const addTask = useCallback(() => {
        onAdd(inputValues);
        setInputValue('');
    }, [inputValues]);
    return (
        <div 
        className={styles.newTaskInput}
        >
            <TextField
                id="new-task-input"
                className={styles.newTaskInputValue}
                label="New Task"
                variant="outlined"
                size="small"
                value={inputValues}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Type here..."
            >

            </TextField>
            <Button
                onClick={addTask}
                aria-label="Add"
                size="small"
                variant="contained"
                startIcon={<AddIcon fontSize="large"/>}
                // className={styles.newTaskInputButton}
            ></Button>
        </div>
    );
}
