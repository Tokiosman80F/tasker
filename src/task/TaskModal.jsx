import { useState } from "react";

function TaskModal({ onSave, onTaskEdit, onClose }) {
  const [task, setTask] = useState(
    onTaskEdit || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      priority: "",
      tags: [],
      isFav: false,
    },
  );

  const [errors, seterrors] = useState({});

  const isAdd = !onTaskEdit;

  function handleChange(e) {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "tags") {
      newValue = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    setTask((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      seterrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSave(e) {
    e.preventDefault();
    const newerrors = {};
    if (!task.title.trim()) newerrors.title = "Title is required";
    if (!task.priority) newerrors.priority = "Priority is required";
    if (Object.keys(newerrors).length > 0) {
      seterrors(newerrors);
      return;
    }

    onSave(task, isAdd);
  }

  return (
    <>
      <div className="absolute h-full w-full inset-0 z-10 bg-gray-900/60 flex items-center justify-center">
        <form className="mx-auto my-10 w-full max-w-160 rounded-xl border border-[#FEFBFB]/36 bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
          <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
            {isAdd ? " Add New Task" : " Edit Task"}
          </h2>

          <div className="space-y-9 text-white lg:space-y-10">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={handleChange}
                required
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-30 w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-45"
                type="text"
                name="description"
                id="description"
                value={task.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  id="tags"
                  value={task.tags.join(",")}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  id="priority"
                  value={task.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-400 text-sm">{errors.priority}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-evenly lg:mt-20">
            <button
              onClick={handleSave}
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskModal;
