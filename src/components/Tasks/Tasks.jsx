import React from 'react';
import * as PropTypes from 'prop-types';

import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';

function Tasks(props) {
  const {
    items, error, onFetch, loading,
  } = props;
  let taskList = <h2>No tasks found. Start adding some!</h2>;

  if (items.length > 0) {
    taskList = (
      <ul>
        {items.map((task) => (
          <TaskItem key={task.id}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (error) {
    content = (
      <button onClick={onFetch} type="button">
        Try again
      </button>
    );
  }

  if (loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
}

Tasks.defaultProps = {
  error: null,
};

Tasks.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  error: PropTypes.string,
  onFetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Tasks;
