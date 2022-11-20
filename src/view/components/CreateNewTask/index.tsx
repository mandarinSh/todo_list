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

export const CreateNewTask: React.FC<TasksViewProps> = ({

}) => {


    return (
        
            
    );
};
