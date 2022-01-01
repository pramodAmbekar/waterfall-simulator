import { Button, InputLabel } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import SingleRangeSliderComponent from "../../Components/RangeBar";
import { gridType } from "../../Services/Types/models";
import styled from "styled-components";
import GridCreator from "../../Components/GridCreator";
import DragAbleDiv from "../../Components/DragAbleDiv";

interface OptionBar {}

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

const OptionBar: React.FC<OptionBar> = (props) => {
  const initialGrid: gridType = {
    rows: 0,
    columns: 0,
    obstructions: 0,
  };
  const [isSelected, setIsSelect] = useState<boolean>(false);
  const [blockedDivId, setBlockedDivId] = useState<string[]>([]);
  const [grid, setGrid] = useState<gridType>(initialGrid);

  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  function drop(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let targetId: any = document.getElementById(ev.target.id);
    let dragingId: any = document.getElementById(data);
    targetId.style.backgroundColor = "#000000";
    dragingId.style.backgroundColor = "grey";
    dragingId.draggable = false;
    setBlockedDivId((old) => [...old, ev.target.id]);
  }

  const onSelect = (e: any) => {
    let rowCol: string[] = [e.target.id];
    let rowColLocal: string[] = e.target.id.split(" ");

    if (!isSelected) {
      for (let i = 0; i < grid.columns; i++) {
        if (!blockedDivId.includes(`0 ${i}`)) {
          const xyz: any = document.getElementById(`0 ${i}`);
          xyz.style.backgroundColor = "white";
        }
      }

      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.columns; col++) {
          if (
            grid.obstructions === 0 &&
            rowCol.length > 0 &&
            parseInt(rowColLocal[1]) === col
          ) {
            colorDiv(row, col);
          } else {
            if (grid.obstructions > 0 && rowCol.length > 0) {
              for (let rc in rowCol) {
                const splitRowCol: string[] = rowCol[rc].split(" ");
                if (parseInt(splitRowCol[1]) === col) {
                  colorDiv(row, col);

                  rowCol = storeRowColFirst(
                    row,
                    col,
                    rowCol,
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

  const storeRowColFirst = (
    row: number,
    col: number,
    rowCol: string[],
    splitRowCol: string
  ): string[] => {
    if (blockedDivId.includes(`${row + 1} ${col}`)) {
      const indexOf = rowCol.indexOf(splitRowCol);
      rowCol.splice(indexOf, 1);
      if (col > 0 && !blockedDivId.includes(`${row} ${col - 1}`)) {
        rowCol.push(`${row} ${col - 1}`);
        colorDiv(row, col - 1);
      }
      if (
        col !== grid.columns - 1 &&
        !blockedDivId.includes(`${row} ${col + 1}`)
      ) {
        rowCol.push(`${row} ${col + 1}`);
        colorDiv(row, col + 1);
      }
      return rowCol;
    }
    return rowCol;
  };

  const clearAll = (e: any): void => {
    e.preventDefault();
    setIsSelect(false);
    setBlockedDivId([]);
    setGrid(initialGrid);
  };
  const colorDiv = (row: number, col: number): void => {
    const xyz: any = document.getElementById(`${row} ${col}`);
    xyz.style.backgroundColor = "#1976d2";
  };
  function drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  const onChangeRow = (e: any) => {
    if (!isSelected) setGrid((old) => ({ ...old, rows: e }));
  };
  const onChangeColumn = (e: any) => {
    if (!isSelected) setGrid((old) => ({ ...old, columns: e }));
  };
  const onChangeObstruction = (e: any) => {
    if (!isSelected) setGrid((old) => ({ ...old, obstructions: e }));
  };
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
