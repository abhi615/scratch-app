import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { id, jsx: children, degreeInput: 15 }, // Pass all necessary data
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="bg-blue-600 px-3 flex flex-row flex-wrap text-white py-1 my-4 text-sm"
    >
      {children}
    </div>
  );
};

export default DraggableItem;
