import * as React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Layout, List, Checkbox, Button, Input } from "antd";

import { addTask, removeTask, toggleTask } from "./Redux/TasksReducer";

const { Content } = Layout;

interface State {
  newTask: string;
}

interface Props {
  tasks: Array<Task>;
  addTask(name: string): any;
  removeTask(name: string): any;
  toggleTask(name: string): any;
}

class App extends React.Component<Props, State> {
  state = {
    newTask: ""
  };

  public render() {
    const tasks = this.props.tasks.filter((task: Task) => !task.done);
    const archivedTasks = this.props.tasks.filter((task: Task) => task.done);

    return (
      <Content style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Todo App</h1>

        <h2>My Tasks</h2>
        <form
          onSubmit={this.onSubmit}
          style={{ marginBottom: "1rem", display: "flex" }}
        >
          <Input
            onChange={this.onTaskChange}
            value={this.state.newTask}
            style={{ marginRight: ".5rem" }}
          />

          <Button htmlType="submit" type="primary">
            Add task
          </Button>
        </form>

        {this.renderList("Tasks", tasks)}
        {this.renderList("Done", archivedTasks)}
      </Content>
    );
  }

  renderList = (title: string, tasks: Array<Task>) => {
    if (tasks.length === 0) return null;

    return (
      <React.Fragment>
        <h2>{title}</h2>
        <List
          size="small"
          dataSource={tasks}
          renderItem={(task: Task) => (
            <List.Item>
              <label style={{ width: "100%" }}>
                <Checkbox
                  onChange={() => this.onTaskCheck(task)}
                  checked={task.done}
                  style={{ marginRight: ".5rem" }}
                />
                {task.name}
              </label>
            </List.Item>
          )}
        />
      </React.Fragment>
    );
  };

  onTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTask: e.target.value });
  };

  onTaskCheck = (task: Task) => {
    this.props.toggleTask(task.name);
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
  { addTask, removeTask, toggleTask }
)(App);
