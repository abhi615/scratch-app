import React, { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { FaPlayCircle } from "react-icons/fa";

const EditArea = ({ playRotation, setCoords, handlePlay, handleMovements }) => {
  const [droppedMotion, setDroppedMotion] = useState([]);
  const [count, setCount] = useState(15);

  const [{ isOver }, drop] = useDrop({
    accept: "item",
    drop: (item) => handleMotionDrop(item),
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
      ...prevCoords,
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

  const handleSpritePlay = useCallback(() => {
    const lastItem = droppedMotion[droppedMotion.length - 1];
    if (lastItem) {
      if (lastItem.id === "turn-right" || lastItem.id === "turn-left") {
        console.log("handle rrog");
        handleRotate(lastItem.id === "turn-right" ? "right" : "left");
      } else if (lastItem.id === "go-to") {
        console.log("movem");
        handleMovement();
      } else if (lastItem.id === "move-steps") {
        console.log("hgcvgvg");
        handleMovesteps();
        handlePlay();
      }
    }
    console.log(handlePlay, "adc");
  }, [
    droppedMotion,
    handleRotate,
    handleMovement,
    handleMovesteps,
    handlePlay,
    handleMovements,
  ]);

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
      <button
        onClick={handleSpritePlay}
        className="m-0 mx-auto flex justify-center"
      >
        <FaPlayCircle className="w-10 h-10" />
      </button>
    </div>
  );
};

export default EditArea;
