import React from "react";
import InputRange from "react-input-range";
import styled from "styled-components";
import "react-input-range/lib/css/index.css";

interface RangeSliderComponent {
  getRangeValue: (e: any) => void;
  value: number;
  // onMouseUp: () => void;
}
const RangeSliderContainer = styled.div`
  .input-range__track--active,
  .input-range__slider {
    background: ${(props) => props.color};
    border-color: ${(props) => props.color};
  }
`;
const Form = styled.form`
  margin: auto 0;
  padding: 20px;
  width: 500px;
`;

const SingleRangeSliderComponent: React.FC<RangeSliderComponent> = (props) => {
  return (
    <Form>
      <RangeSliderContainer color="#fca827">
        <InputRange
          maxValue={10}
          minValue={0}
          value={props.value}
          onChange={props.getRangeValue}
        />
      </RangeSliderContainer>
    </Form>
  );
};
export default SingleRangeSliderComponent;
