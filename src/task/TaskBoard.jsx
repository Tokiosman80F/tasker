import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "React",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["React", "Javascript", "api"],
    priority: "High",
    isFav: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  function handleAddClick(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        }),
      );
    }
    setShowTaskModal(false);
  }

  function handleEdit(task) {
    console.log("hello edit", task);
    setEditTask(task);
    setShowTaskModal(true);
  }

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {showTaskModal && (
          <TaskModal onSave={handleAddClick} onTaskEdit={handleEdit} />
        )}
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddClick={() => setShowTaskModal(true)} />
          <TaskList tasks={tasks} onEditClick={handleEdit} />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
