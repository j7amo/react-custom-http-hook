import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-fetch';

// we move this outside the component to avoid re-creation between component re-renders
const requestConfig = {
  url: 'https://react-movies-b2487-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, error, fetchTasks] = useFetch();

  const applyData = useCallback((data) => {
    const loadedTasks = [];
    Object.values(data).forEach(({ text }) => loadedTasks.push({ text }));

    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    fetchTasks(requestConfig, applyData);
  }, [fetchTasks]);

  const taskAddHandler = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  const fetchTasksHandler = useCallback(() => {
    fetchTasks(requestConfig, applyData);
  }, [fetchTasks]);

  return (
    <>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasksHandler}
      />
    </>
  );
}

export default App;
