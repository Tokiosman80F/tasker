import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "Integration API",
  description:
    "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
  priority: "High",
  tags: ["Web", "Python", "API"],
  isFav: false,
};
/**
 * add task ✅
 *  in add task modal create a error state ✅
 *  add a cancel btn ✅
 * edit a task
 *  clear the input field
 * search function
 * delete
 * delete all
 * */
function TaskBoard() {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) return newTask;
          return task;
        }),
      );
    }
    setShowModal(false);
    setEditTask(null);
  }

  function handleEdit(task) {
    setEditTask(task);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditTask(null);
  }

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <TaskModal
          onSave={handleAddTask}
          onClose={handleCloseModal}
          taskToEdit={editTask}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAdd={() => setShowModal(true)} />
          <TaskList tasks={tasks} onEditClick={handleEdit} />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
