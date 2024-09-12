import React from "react";
import Draggable from "react-draggable";

const Previewarea = ({
  selectedCharcter,
  spriteRotation,
  spriteIndex,
  onDragUpdate,
  coords,
  positionsAndMovements,
}) => {
  return (
    <div>
      {selectedCharcter.map((srcImg, idx) => {
        const defaultTransformStyle = `rotate(${
          spriteRotation || 0
        }deg) translate(${coords.xPos}px, ${coords.yPos}px)`;

        const customTransformStyle = positionsAndMovements[idx]
          ? `rotate(${positionsAndMovements[idx].rotation || 0}deg) translate(${
              positionsAndMovements[idx].xPos
            }px, ${positionsAndMovements[idx].yPos}px)`
          : defaultTransformStyle;

        // Determine the transform style based on the index
        const transformStyle =
          idx === 0 ? defaultTransformStyle : customTransformStyle;
        return (
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
        );
      })}
    </div>
  );
};

export default React.memo(Previewarea);
