import React, { useCallback } from 'react';
import * as PropTypes from 'prop-types';

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useFetch from '../../hooks/use-fetch';

function NewTask(props) {
  const { onAddTask } = props;
  const [isLoading, error, sendRequest] = useFetch();

  const applyData = useCallback(
    (taskText) => (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      onAddTask(createdTask);
    },
    [onAddTask],
  );

  const enterTaskHandler = useCallback(
    (taskText) => {
      const requestConfig = {
        url: 'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: taskText }),
      };

      sendRequest(requestConfig, applyData(taskText));
    },
    [applyData, sendRequest],
  );

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
}

NewTask.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTask;
