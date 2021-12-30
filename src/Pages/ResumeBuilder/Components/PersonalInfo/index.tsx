import React from "react";
import TabPanel from "../../../../Components/TabPanel";
import { InputType, PersonalDetails } from "../../../../Services/Types/models";
import Box from "@mui/material/Box";
import Input from "../../../../Components/Input";
import { TextField } from "@mui/material";
import {
  personalDetailsClassName,
  personalDetailsLabel,
} from "../../../../Services/Constants/constants";

interface PersonalInfoProps {
  data: PersonalDetails;
  onChange: (e: any) => void;
  tabValue: number;
  errorObject: any;
}

const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const { data, tabValue, errorObject } = props;
  return (
    <TabPanel value={tabValue} index={0}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* {data.map((item: InputType, index: number) => {
          <Input data={item}/>
        })} */}
        <TextField
          error={errorObject.personalDetails?.name ? true : false}
          id="outlined"
          name={personalDetailsClassName.NAME}
          label={personalDetailsLabel.NAME}
          defaultValue={data.name}
          placeholder={personalDetailsLabel.NAME}
          value={data.name}
          helperText={
            errorObject.personalDetails?.name
              ? errorObject.personalDetails.name
              : ""
          }
          required={true}
          key={personalDetailsClassName.NAME}
        />
      </Box>
    </TabPanel>
  );
};

export default PersonalInfo;
