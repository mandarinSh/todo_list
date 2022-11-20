import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface TasksViewProps {
    id: string;
    title: string;
    checked: boolean;
    onDone: (id: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
    onChecked: (id: string, checked: boolean) => void;
};

export const TasksView: React.FC<TasksViewProps> = ({
    id,
    title,
    checked,
    onDone,
    onEdited,
    onRemoved,
    onChecked,
}) => {

    const [isChecked, setChecked] = useState(checked);
    const [value, setValue] = useState(title);
    const [isEditMode, setisEditMode] = useState(false);
    const editTitleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditMode) {
            editTitleRef?.current?.focus();
        }
    }, [isEditMode]);

    return (
        <div className={styles.tasksView}>
            <label className={styles.tasksViewLabel}>
                <input
                    type="checkbox"
                    disabled={isEditMode}
                    checked={isChecked}
                    className={styles.tasksViewCheckbox}
                    onChange={(e) => {
                        setChecked(e.target.checked);
                        onChecked(id, e.target.checked);
                    }}
                />
                {isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleRef}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        className={styles.tasksViewTitleEdit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEdited(id, value);
                                setisEditMode(false);
                            }
                        }}
                    />
                ) :
                    (
                        <h3
                            onClick={() => setisEditMode(true)}
                            className={styles.tasksViewTitle}
                        >
                            {title}
                        </h3>
                    )}
            </label>
            {isEditMode ? (
                <button
                    aria-label="Save"
                    className={styles.tasksViewSave}
                    onClick={() => {
                        onEdited(id, value);
                        setisEditMode(false);
                    }}
                />
            ) : (
                <button
                    aria-label="Edit"
                    className={styles.tasksViewEdit}
                    onClick={() => {
                        setisEditMode(true);
                    }}
                />
            )}
            <button
                aria-label="Remove"
                className={styles.tasksViewRemove}
                onClick={() => {
                    if (!checked && confirm('Are you sure?')) {
                        onRemoved(id);
                    } else {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    );
};