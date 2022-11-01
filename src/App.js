import { useEffect, useState } from "react";
import ForwardCounter from "./components/ForwardCounter";
import BackwardCounter from "./components/BackwardCounter";
import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import Card from "./components/Card";
import useHttp from "./hooks/useHttp";

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks({
      url: "https://react-http-a24fd-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      transformTasks,
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <>
      <Card>useCounter:</Card>
      <ForwardCounter />
      <BackwardCounter />

      <br />
      <Card>useHttp:</Card>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </>
  );
}

export default App;
