import { useState } from "react";

function TaskModal({ onSave, onTaskEdit }) {
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

  const [isAdd, setIsAdd] = useState(Object.is(onTaskEdit, null));

  function handleChange(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({ ...task, [name]: value });
  }

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full z-10 opacity-10 bg-gray-400"></div>
      <div className="absolute top-1/3 left-1/3 z-10 ">
        <form className="mx-auto my-10 w-full max-w-185 rounded-xl border border-[#FEFBFB]/36 bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
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
                  value={task.tags}
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
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center lg:mt-20">
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave(task, isAdd);
              }}
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskModal;
