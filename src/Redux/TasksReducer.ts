import { createActions, handleActions } from "redux-actions";

export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const TOGGLE_TASK = "TOGGLE_TASK";
export const SET_TASKS = "SET_TASKS";

const STATE: Array<Task> = [
  { name: "Read a book", done: false },
  { name: "Buy milk", done: false }
];

interface basicAction {
  type: string;
  payload: string;
}

export const { addTask, removeTask, toggleTask, setTasks } = createActions({
  [ADD_TASK]: (taskName: string) => taskName,
  [REMOVE_TASK]: (taskName: string) => taskName,
  [TOGGLE_TASK]: (taskName: string) => taskName,
  [SET_TASKS]: (tasks: Array<Task>) => tasks
});

export const TasksReducer = handleActions(
  {
    [ADD_TASK]: (state: Array<Task>, action: basicAction) => {
      const newTask = { name: action.payload, done: false };
      return [...state, newTask];
    },
    [REMOVE_TASK]: (state: Array<Task>, action: basicAction) => {
      return state.filter((task: Task) => task.name !== action.payload);
    },
    [TOGGLE_TASK]: (state: Array<Task>, action: basicAction) => {
      return [...state].filter((task: Task) => {
        if (task.name === action.payload) {
          task.done = !task.done;
        }
        return task;
      });
    },
    [SET_TASKS]: (state: Array<Task>, action: any) => {
      return [...action.payload];
    }
  },
  STATE
);
