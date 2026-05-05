import { useState } from "react";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

const defaultTask = {
  id: crypto.randomUUID(),
  title: "React",
  description:
    "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
  tags: ["React", "Javascript", "api"],
  priority: "High",
  isFav: true,
};

function TaskBoard() {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const displayTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  function handleCloseModal() {
    setEditTask(null);
    setShowTaskModal(false);
  }

  function handleDelete(taskId) {
    // console.log("taskId :",taskId);

    const updatedTask = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTask);
  }

  function handleDeleteAll() {
    // tasks.length = 0;
    setTasks([]);
    setSearchTerm("");
  }

  function handleFavourite(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFav: !task.isFav };
        } else {
          return task;
        }
      }),
    );
  }

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {showTaskModal && (
          <TaskModal
            onSave={handleAddClick}
            onTaskEdit={editTask}
            onClose={handleCloseModal}
          />
        )}
        <div className="p-2 flex justify-end">
          <SearchTask value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => {
              setShowTaskModal(true);
            }}
            onDeleteAll={handleDeleteAll}
          />
          {displayTasks.length > 0 ? (
            <TaskList
              tasks={displayTasks}
              onEditClick={handleEdit}
              onDelete={handleDelete}
              onFav={handleFavourite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
