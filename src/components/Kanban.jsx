import { useState } from "react";
const Kanban = () => {
  const [coloumns, setColoumns] = useState({
    todo: {
      name: "ToDo",
      items: [
        {
          id: 1,
          content: "Design UI",
        },
        {
          id: 2,
          content: "Push the code",
        },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [
        {
          id: 3,
          content: "Board of Kanban",
        },
      ],
    },
    done: {
      name: "Done",
      items: [
        {
          id: 4,
          content: "Setup a repositariry",
        },
      ],
    },
  });
  const [newTask, setNewTask] = useState("");
  const [activeColoumn, setActiveColoumn] = useState("todo");

  // adding the new task
  const addNewtask = () => {
    if (newTask.trim() === "") return;
    const updatedColoumns = { ...coloumns };
    updatedColoumns[activeColoumn].items.push({
      id: Date.now(),
      content: newTask,
    });
    setColoumns(updatedColoumns);
    setNewTask("");
  };

  // Deleting the particular task
  const deleteTask = (coloumnId, taskId) => {
    const updatedColoumns = { ...coloumns };
    updatedColoumns[coloumnId].items = updatedColoumns[coloumnId].items.filter(
      (item) => item.id !== taskId
    );
    setColoumns(updatedColoumns);
  };
  return (
    <div className={"container"}>
      <div>
        <input
          className={"input"}
          type="text"
          placeholder={"Type your task here"}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className={"input"}
          value={activeColoumn}
          onChange={(e) => setActiveColoumn(e.target.value)}
        >
          {/* Options Mapping */}
          {Object.keys(coloumns).map((coloumnId) => (
            <option className={"input"} value={coloumnId} key={coloumnId}>
              {coloumns[coloumnId].name}
            </option>
          ))}
        </select>
        <button onClick={addNewtask}>Add New Task</button>
      </div>
      {/* for the Grid items */}
      <div className={"gridContainer"}>
        {Object.keys(coloumns).map((coloumnId) => (
          <div key={coloumnId}>
            <span>{coloumns[coloumnId].name}</span>
            {coloumns[coloumnId].items.length == 0 ? (
              <span>Drop Your task here</span>
            ) : (
              <div className={"item"}>
                {coloumns[coloumnId].items.map((data) => (
                  <div>
                    <div key={data.id}>{data.content}</div>
                    <button onClick={() => deleteTask(coloumnId, data.id)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Kanban;
