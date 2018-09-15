import * as React from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Layout, List, Checkbox, Button, Input } from "antd";

import {
  addTask,
  removeTask,
  toggleTask,
  setTasks
} from "./Redux/TasksReducer";
import SortableList from "./components/SortableList";
const { Content } = Layout;

interface State {
  newTask: string;
}

interface Props {
  tasks: Array<Task>;
  addTask(name: string): any;
  removeTask(name: string): any;
  toggleTask(name: string): any;
  setTasks(items: Array<Task>): any;
}

class App extends React.Component<Props, State> {
  state = {
    newTask: ""
  };

  public render() {
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
        {this.renderList("Tasks", this.props.tasks, (item: Task) => {
          return !item.done;
        })}
        {this.renderList(
          "Archived Tasks",
          this.props.tasks,
          (item: Task) => item.done
        )}
      </Content>
    );
  }

  renderList = (title: string, tasks: Array<Task>, isItemVisible: any) => {
    if (tasks.length === 0) return null;

    return (
      <React.Fragment>
        <h2>{title}</h2>

        <SortableList
          items={tasks}
          onChange={(items: Array<Task>) => this.props.setTasks(items)}
          isItemVisible={isItemVisible}
          renderListItem={(item: Task) => (
            <List.Item>
              <label style={{ width: "100%" }}>
                <Checkbox
                  onChange={() => this.onTaskCheck(item)}
                  checked={item.done}
                  style={{ marginRight: ".5rem" }}
                />
                {item.name}
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
  { addTask, removeTask, toggleTask, setTasks }
)(App);
