import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableStateSnapshot,
  DroppableProvided
} from "react-beautiful-dnd";
import { List } from "antd";

interface Item {
  name: string;
}

interface Props {
  items: Array<Item>;
  onChange(items: Array<Item>): any;
  renderListItem(item: Item): any;
  isItemVisible(item: Item): any;
}

const reorder = (list: Array<Item>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class DragDrop extends React.Component<Props, {}> {
  onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    this.props.onChange(items);
  };

  render() {
    const { items } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div ref={provided.innerRef}>
              <List
                size="small"
                dataSource={items}
                renderItem={this.renderListItem}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  renderListItem = (item: Item, index: number) => {
    if (!this.props.isItemVisible(item)) return <div />;

    return (
      <Draggable key={item.name} draggableId={item.name} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {this.props.renderListItem(item)}
          </div>
        )}
      </Draggable>
    );
  };
}

export default DragDrop;
