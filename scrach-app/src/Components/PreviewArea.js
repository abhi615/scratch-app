import React, { useMemo } from "react";
import Draggable from "react-draggable";

const Previewarea = ({
  selectedCharcter,
  spriteRotation,
  spriteIndex,
  onDragUpdate,
  coords,
}) => {
  // Memoize the transform style to avoid recalculating on every render
  const transformStyle = useMemo(
    () =>
      `rotate(${spriteRotation}deg) translate(${coords.xPos}px, ${coords.yPos}px)`,
    [spriteRotation, coords]
  );

  return (
    <div>
      {selectedCharcter.map((srcImg, idx) => (
        <Draggable key={idx} onDrag={onDragUpdate}>
          <div>
            <img
              src={srcImg}
              alt={`img-${idx}`}
              className="w-32 h-32 object-fill"
              style={{
                transform: transformStyle,
                transition: "transform 0.3s",
              }}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default React.memo(Previewarea);
