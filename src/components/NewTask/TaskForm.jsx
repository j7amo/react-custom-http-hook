import React, { useRef } from 'react';
import * as PropTypes from 'prop-types';

import classes from './TaskForm.module.css';

function TaskForm(props) {
  const { onEnterTask, loading } = props;

  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button type="submit">{loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
}

TaskForm.propTypes = {
  onEnterTask: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TaskForm;
