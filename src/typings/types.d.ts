declare interface GlobalState {
  tasks: Array<Task>;
}

declare interface Task {
  id?: number;
  name: string;
  done: boolean;
}
