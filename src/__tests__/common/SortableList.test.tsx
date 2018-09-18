import * as React from "react";
import * as enzyme from "enzyme";

import SortableList from "../../common/SortableList";

const tasks = [
  { id: 1, name: "Buy milk", done: false },
  { id: 2, name: "Read a book", done: false },
  { id: 3, name: "Pay bills", done: false }
];

it("renders list", () => {
  const wrapper = enzyme.shallow(
    <SortableList
      items={tasks}
      onChange={(items: Array<Task>) => {}}
      isItemVisible={(task: Task) => true}
      renderListItem={(item: Task) => <li>{item.name}</li>}
    />
  );
  expect(wrapper.find("li").length).toBe(3); // Why not?
});
