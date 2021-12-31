import React from "react";
import styled from "styled-components";

interface DragAbleDivProps {
  obstructions: number;
  drag: (e: any) => void;
}
const GridContainer = styled.div`
  display: grid;
  padding: 10px;
`;
const GridItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 50px;
  margin: 10px;
  font-size: 30px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const DragAbleDiv: React.FC<DragAbleDivProps> = (props) => {
  return (
    <div>
      <GridContainer style={{ gridTemplateColumns: "auto auto auto" }}>
        {Array.apply(null, new Array(props.obstructions)).map(
          (item: any, obstruction: number) => {
            return (
              <GridItem
                id={`obstruction-${obstruction}`}
                onDragStart={props.drag}
                draggable="true"
              />
            );
          }
        )}
      </GridContainer>
    </div>
  );
};

export default DragAbleDiv;
