import { Button, InputLabel } from "@mui/material";
import React, { useState } from "react";
import SingleRangeSliderComponent from "../../Components/RangeBar";
import { gridType } from "../../Services/Types/models";
import styled from "styled-components";
import GridCreator from "../../Components/GridCreator";
import DragAbleDiv from "../../Components/DragAbleDiv";
import { BLUE_COLOR } from "../../Services/Constants/constants";

interface OptionBarProps {}

const Div = styled.div`
  width: 50%;
`;
const H4 = styled.h4`
  text-align: center;
`;

const DivForFilters = styled.div`
  display: flex;
  justify-content: center;
`;

const initialGrid: gridType = {
  rows: 0,
  columns: 0,
  obstructions: 0,
};
const OptionBar: React.FC<OptionBarProps> = (props) => {
  const [isSelected, setIsSelect] = useState<boolean>(false);
  const [blockedDivId, setBlockedDivId] = useState<string[]>([]);
  const [grid, setGrid] = useState<gridType>(initialGrid);

  const onChangeRow = (e: any): void => {
    if (!isSelected) setGrid((old) => ({ ...old, rows: e }));
  };
  const onChangeColumn = (e: any): void => {
    if (!isSelected) setGrid((old) => ({ ...old, columns: e }));
  };
  const onChangeObstruction = (e: any): void => {
    if (!isSelected) setGrid((old) => ({ ...old, obstructions: e }));
  };

  const allowDrop = (ev: any): void => {
    ev.preventDefault();
  };

  // Method triggered when an element is droped into the div
  const drop = (ev: any): void => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let targetId: any = document.getElementById(ev.target.id);
    let dragingId: any = document.getElementById(data);
    targetId.style.backgroundColor = "#000000";
    dragingId.style.backgroundColor = "grey";
    dragingId.draggable = false;
    setBlockedDivId((old) => [...old, ev.target.id]);
  };

  // Method is triggered when start point is selected
  const onSelect = (e: any): void => {
    //Storing  selected startpoint in array
    let SelectedRowCol: string[] = [e.target.id];
    let rowColLocal: string[] = e.target.id.split(" ");

    // checking weather the start point is selected for the first time
    if (!isSelected) {
      // Once th grid is selected, change the color back to white
      for (let i = 0; i < grid.columns; i++) {
        if (!blockedDivId.includes(`0 ${i}`)) {
          const xyz: any = document.getElementById(`0 ${i}`);
          xyz.style.backgroundColor = "white";
        }
      }

      // looping through the row and column for showing water flow simulator
      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.columns; col++) {
          // case 1: If no obstructions allow water flow in selected start point
          //and checking each row and  selected column number to add water flow
          if (
            grid.obstructions === 0 &&
            SelectedRowCol.length > 0 &&
            parseInt(rowColLocal[1]) === col
          ) {
            colorDiv(row, col);
          } else {
            // case 2: if obstructions is selected
            if (grid.obstructions > 0 && SelectedRowCol.length > 0) {
              // looping through the start point if any obstructions remove the selected slow point from the start point (rowCol) array and
              for (let rc in SelectedRowCol) {
                //Spliting the cuttent row and column id from the seletedDiv array
                const splitRowCol: string[] = SelectedRowCol[rc].split(" ");
                // If current col in the splitRowCol
                if (parseInt(splitRowCol[1]) === col) {
                  // color the div
                  colorDiv(row, col);
                  // if preseding row is in the obstructions array the remove the
                  // specific element from the seleted div array and add let and right
                  //div id in the seleced div array
                  SelectedRowCol = waterFlowSimulator(
                    row,
                    col,
                    SelectedRowCol,
                    splitRowCol.join(" ")
                  );
                }
              }
            }
          }
        }
      }
    }
    setIsSelect(true);
  };

  // Method to simulate the water flow
  const waterFlowSimulator = (
    row: number,
    col: number,
    SelectedRowCol: string[],
    splitRowCol: string
  ): string[] => {
    // if preceding row is in the blocked div array then remove the
    //div id from the selected div id from and add the right and left column id
    if (blockedDivId.includes(`${row + 1} ${col}`)) {
      const indexOf = SelectedRowCol.indexOf(splitRowCol);
      SelectedRowCol.splice(indexOf, 1);
      if (col > 0 && !blockedDivId.includes(`${row} ${col - 1}`)) {
        SelectedRowCol.push(`${row} ${col - 1}`);
        colorDiv(row, col - 1);
      }
      if (
        col !== grid.columns - 1 &&
        !blockedDivId.includes(`${row} ${col + 1}`)
      ) {
        SelectedRowCol.push(`${row} ${col + 1}`);
        colorDiv(row, col + 1);
      }
      return SelectedRowCol;
    }
    return SelectedRowCol;
  };

  // Clear all seleted options
  const clearAll = (e: any): void => {
    e.preventDefault();
    setIsSelect(false);
    setBlockedDivId([]);
    setGrid(initialGrid);
  };

  // Method to color the div
  const colorDiv = (row: number, col: number): void => {
    const xyz: any = document.getElementById(`${row} ${col}`);
    xyz.style.backgroundColor = BLUE_COLOR;
  };

  // Method to stor the  draging div in the dataTransfer method of event prototype
  function drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  return (
    <div>
      <DivForFilters>
        <div>
          <H4>Waterflow simulator</H4>
          <InputLabel>Number of Rows</InputLabel>
          <SingleRangeSliderComponent
            getRangeValue={onChangeRow}
            value={grid.rows}
          />
          <InputLabel>Number of Columns</InputLabel>
          <SingleRangeSliderComponent
            getRangeValue={onChangeColumn}
            value={grid.columns}
          />
          <InputLabel>Number of Obstructions</InputLabel>
          <SingleRangeSliderComponent
            getRangeValue={onChangeObstruction}
            value={grid.obstructions}
          />
          <Button
            style={{ width: "100%" }}
            variant="outlined"
            onClick={clearAll}
          >
            Clear
          </Button>
        </div>
      </DivForFilters>
      <H4>
        {grid.rows > 0 && grid.columns > 0
          ? blockedDivId.length === grid.obstructions
            ? "Select the Waterflow start point by clicking on any of the blue boxes"
            : "Drag the Obstrauctions and place it inside the grid."
          : ""}
      </H4>
      <div style={{ display: "flex" }}>
        <Div style={{ width: "70%" }}>
          <GridCreator
            blockedDivId={blockedDivId}
            onSelect={onSelect}
            grid={grid}
            drop={drop}
            allowDrop={allowDrop}
            isSelected={isSelected}
            gridTemplateColumns={Array.apply(null, new Array(grid.columns))
              .map((item) => "auto")
              .join(" ")}
          />
        </Div>
        <Div style={{ width: "30%" }}>
          <DragAbleDiv obstructions={grid.obstructions} drag={drag} />
        </Div>
      </div>
    </div>
  );
};

export default OptionBar;
