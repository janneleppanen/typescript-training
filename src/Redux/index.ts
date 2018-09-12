import { combineReducers } from "redux";

import { TasksReducer } from "./TasksReducer";

export const reducers = combineReducers({
  tasks: TasksReducer
});
