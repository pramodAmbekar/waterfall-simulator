import { Tabs, Box, Tab } from "@mui/material";
import React from "react";
import { TabType } from "../../Services/Types/models";

interface TabsProps {
  tabs: TabType[];
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const BasicTabs: React.FC<TabsProps> = (props) => {

  const { tabs, value, handleChange } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((item: TabType, index: number) => (
            <Tab label={item.label} {...item.a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default BasicTabs
