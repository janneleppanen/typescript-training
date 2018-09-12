export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

export const addTask = (taskName: string) => ({
  type: ADD_TASK,
  payload: taskName
});

export const removeTask = (name: string) => ({
  type: REMOVE_TASK,
  payload: name
});

const STATE: Array<Task> = [
  { name: "Read a book", done: false },
  { name: "Buy milk", done: false }
];

export const TasksReducer = (state = STATE, action: any) => {
  switch (action.type) {
    case ADD_TASK:
      return handleAddTask(state, action);
    case REMOVE_TASK:
      return handleRemoveTask(state, action);
    default:
      return state;
  }
};

interface addTaskAction {
  type: string;
  payload: string;
}

interface removeTaskAction {
  type: string;
  payload: string;
}

const handleAddTask = (state: Array<Task>, action: addTaskAction) => {
  const newTask = { name: action.payload, done: false };
  return [...state, newTask];
};

const handleRemoveTask = (state: Array<Task>, action: removeTaskAction) => {
  return state.filter((task: Task) => task.name !== action.payload);
};
