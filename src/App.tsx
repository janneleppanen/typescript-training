import * as React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";

import { addTask, removeTask } from "./Redux/TasksReducer";

interface State {
  newTask: string;
}

interface Props {
  tasks: Array<Task>;
  addTask(name: string): any;
  removeTask(name: string): any;
}

class App extends React.Component<Props, State> {
  state = {
    newTask: ""
  };

  public render() {
    return (
      <div className="App">
        <h1>Todo App</h1>

        <h2>My Tasks</h2>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onTaskChange} value={this.state.newTask} />
          <button type="submit">Add task</button>
        </form>

        <h2>Tasks</h2>
        <ul>
          {this.props.tasks.map((task: Task) => (
            <li key={task.name} onClick={() => this.onTaskClick(task)}>
              {task.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  onTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTask: e.target.value });
  };

  onTaskClick = (task: Task) => {
    this.props.removeTask(task.name);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addTask(this.state.newTask);
    this.setState({ newTask: "" });
  };
}

const mapStateToProps = (state: GlobalState) => {
  return {
    tasks: state.tasks
  };
};

export default connect(
  mapStateToProps,
  { addTask, removeTask }
)(App);
