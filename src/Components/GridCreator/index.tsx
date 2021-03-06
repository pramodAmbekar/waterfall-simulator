import React from "react";
import styled from "styled-components";
import { gridType } from "../../Services/Types/models";

const GridContainer = styled.div`
  display: grid;

  padding: 10px;
`;
const GridItem = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 50px;
  font-size: 30px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  transition-duration: 2s;
  // transition-delay: 1s;
`;

interface GridCreatorProps {
  gridTemplateColumns: string;
  grid: gridType;
  allowDrop: (e: any) => void;
  drop: (e: any) => void;
  onSelect: (e: any) => void;
  blockedDivId: string[];
  isSelected: boolean;
}

const GridCreator: React.FC<GridCreatorProps> = (props) => {
  return (
    <div>
      <GridContainer style={{ gridTemplateColumns: props.gridTemplateColumns }}>
        {Array.apply(null, new Array(props.grid.rows)).map(
          (item: any, row: number) => {
            return Array.apply(null, new Array(props.grid.columns)).map(
              (col: any, column: number) => (
                <GridItem
                  style={{
                    backgroundColor:
                      row === 0 &&
                      props.blockedDivId.length === props.grid.obstructions &&
                      !props.blockedDivId.includes(`${row} ${column}`)
                        ? "#82b5e7"
                        : "white",
                  }}
                  onClick={
                    row === 0 &&
                    props.blockedDivId.length === props.grid.obstructions &&
                    !props.blockedDivId.includes(`${row} ${column}`)
                      ? props.onSelect
                      : () => {}
                  }
                  id={`${row} ${column}`}
                  onDrop={props.drop}
                  onDragOver={props.allowDrop}
                />
              )
            );
          }
        )}
      </GridContainer>
    </div>
  );
};

export default GridCreator;
