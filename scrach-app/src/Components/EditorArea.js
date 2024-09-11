import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { FaPlayCircle } from "react-icons/fa";

const EditArea = ({ playRotation, setCoords }) => {
  const [droppedMotion, setDroppedMotion] = useState([]);
  const [count, setCount] = useState(15);

  // Define the drop target behavior
  const [{ isOver }, drop] = useDrop({
    accept: "item",
    drop: useCallback((item) => handleMotionDrop(item), []),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleMotionDrop = useCallback((item) => {
    setDroppedMotion((prevItems) => [
      ...prevItems,
      { id: item.id, jsx: item.jsx },
    ]);
  }, []);

  const handleMovement = useCallback(() => {
    setCoords((prevCoords) => ({
      xPos: prevCoords.xPos + 50,
      yPos: prevCoords.yPos + 50,
    }));
  }, [setCoords]);
  const handleMovesteps = useCallback(() => {
    setCoords((prevCoords) => ({
      xPos: prevCoords.xPos + 10,
      yPos: prevCoords.yPos + 10,
    }));
  }, [setCoords]);

  const handleRotate = useCallback(
    (direction) => {
      setCount((prevCount) => prevCount + 15);
      const degreeInput = count;
      const stepSize = 10;
      playRotation(direction, degreeInput, stepSize);
    },
    [count, playRotation]
  );

  const handlePlay = useCallback(() => {
    const lastItem = droppedMotion[droppedMotion.length - 1];
    if (lastItem) {
      if (lastItem.id === "turn-right" || lastItem.id === "turn-left") {
        handleRotate(lastItem.id === "turn-right" ? "right" : "left");
      } else if (lastItem.id === "go-to") {
        handleMovement();
      } else if (lastItem.id === "move-steps") {
        handleMovesteps();
      }
    }
  }, [droppedMotion, handleRotate, handleMovement, handleMovesteps]);

  return (
    <div
      ref={drop}
      className={`border-2 border-gray-950-dashed p-5 ${
        isOver ? "bg-green-200" : "bg-white"
      } min-h-[200px] w-1/2`}
    >
      <h2 className="font-bold text-black">Editor Area</h2>
      {droppedMotion.length > 0 ? (
        droppedMotion.map((item, index) => (
          <div
            key={index}
            className="dropped-motion bg-blue-600 px-3 flex flex-row flex-wrap text-white py-1 my-4 text-sm cursor-pointer"
          >
            {item.jsx}
          </div>
        ))
      ) : (
        <p>Drag and drop character here!</p>
      )}
      <button onClick={handlePlay} className="m-0 mx-auto flex justify-center">
        <FaPlayCircle className="w-10 h-10" />
      </button>
    </div>
  );
};

export default EditArea;
