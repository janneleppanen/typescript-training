import { createActions, handleActions } from "redux-actions";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";

const STATE: Array<Task> = [
  { name: "Read a book", done: false },
  { name: "Buy milk", done: false }
];

interface basicAction {
  type: string;
  payload: string;
}

export const { addTask, removeTask, toggleTask } = createActions({
  ADD_TASK: (taskName: string) => taskName,
  REMOVE_TASK: (taskName: string) => taskName,
  [TOGGLE_TASK]: (taskName: string) => taskName
});

export const TasksReducer = handleActions(
  {
    [addTask.toString()]: (state: Array<Task>, action: basicAction) => {
      const newTask = { name: action.payload, done: false };
      return [...state, newTask];
    },
    [removeTask.toString()]: (state: Array<Task>, action: basicAction) => {
      return state.filter((task: Task) => task.name !== action.payload);
    },
    [TOGGLE_TASK]: (state: Array<Task>, action: basicAction) => {
      return [...state].filter((task: Task) => {
        if (task.name === action.payload) {
          task.done = !task.done;
        }
        return task;
      });
    }
  },
  STATE
);
