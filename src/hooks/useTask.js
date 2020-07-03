import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { modifyTask, removeTask } from '../store/actions/task.js';
import { useToasts } from 'react-toast-notifications';

const useTask = (task) => {
   const dispatch = useDispatch();
   const [text, setText] = useState('');
   const [dropdownOpen, setOpen] = useState(false);
   const [editable, setEditable] = useState(false);
   const [deleting, setDeleting] = useState(false);
   const toggleDropdown = () => setOpen(!dropdownOpen);
   const toggleDeleting = () => setDeleting(!deleting);
   const textareaRef = useRef(null);
   const { addToast } = useToasts();
   const showConnectionError = () => addToast(
     'Network error, please verify your internet connection',
     { appearance: 'error' });

   useEffect(() => {
    if(editable &&  textareaRef && textareaRef.current)
     textareaRef.current.focus();
   }, [editable]);

   const assignTo = (userId) => {
     dispatch(modifyTask({
       assignedTo: userId,
       taskId: task._id,
       success: () => addToast('Task updated', {
         appearance: 'success', autoDismiss: true
       }),
       failed: showConnectionError
     }));
   };
   
   const edit = () => {
     setEditable(true);
   }

   const save = () => {
     setEditable(false);
     dispatch(modifyTask({
       taskId: task._id,
       text: text,
       success: () => addToast('Task saved', {
         appearance: 'success', autoDismiss: true 
       }),
       failed: showConnectionError
     }));
   };

   const deleteFunc = () => {
     dispatch(removeTask({
       _id: task._id,
       success: () => addToast('Task deleted', {
        appearance: 'success', autoDismiss: true
       }),
       failed: showConnectionError
     }));
     toggleDeleting();
   };
  
   return {
     text,
     setText,
     editable,
     edit,
     save,
     dropdownOpen,
     toggleDropdown,
     assignTo,
     deleting,
     toggleDeleting,
     deleteFunc,
     textareaRef 
   }
};

export default useTask;
