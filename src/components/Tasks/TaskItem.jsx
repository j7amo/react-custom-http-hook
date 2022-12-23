import React from 'react';
import * as PropTypes from 'prop-types';

import classes from './TaskItem.module.css';

function TaskItem(props) {
  const { children } = props;

  return <li className={classes.task}>{children}</li>;
}

TaskItem.propTypes = {
  children: PropTypes.func.isRequired,
};

export default TaskItem;
