import React from "react";
import { Formik, useFormik } from "formik";
import {
  FormType,
  PersonalDetails,
  Project,
  TabType,
  WorkExperience,
} from "../../../Services/Types/models";
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
} from "../../../Services/Constants/constants";
import BasicTabs from "../../../Components/Tabs";
import TabPanel from "../../../Components/TabPanel";
import PersonalInfo from "../Components/PersonalInfo";

const ResumeBuilderCenter: React.FC<any> = (props) => {
  const [value, setValue] = React.useState(0);
  const date: Date = new Date();
  const personalDetails: PersonalDetails = {
    name: EMPTY_STRING,
    description: EMPTY_STRING,
    designation: EMPTY_STRING,
    photo: {},
    socialMedia: {
      email: EMPTY_STRING,
      phoneNumber: NaN,
      address: EMPTY_STRING,
      linkedIn: EMPTY_STRING,
    },
  };
  const emptyProjectObject: Project = {
    projectName: EMPTY_STRING,
    role: EMPTY_STRING,
    startDate: EMPTY_STRING,
    endDate: EMPTY_STRING,
    current: false,
    description: EMPTY_STRING,
  };
  const workExperience: WorkExperience = {
    companyName: EMPTY_STRING,
    location: EMPTY_STRING,
    startDate: EMPTY_STRING,
    endDate: EMPTY_STRING,
    current: false,
    designation: EMPTY_STRING,
    projects: [emptyProjectObject],
  };
  const initialValues: FormType = {
    personalDetails,
    workExperience,
    skills: EMPTY_ARRAY,
    education: EMPTY_ARRAY,
    achivements: EMPTY_ARRAY,
    interests: EMPTY_ARRAY,
    certificates: EMPTY_ARRAY,
  };

  const onSubmit = (value: FormType) => {
    console.log(value);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs: TabType[] = [
    {
      label: "Personal info",
      a11yProps,
    },
  ];
  return (
    <div>
      <BasicTabs tabs={tabs} value={value} handleChange={handleChange} />
      <PersonalInfo
        data={formik.values.personalDetails}
        onChange={formik.handleChange}
        tabValue={value}
        errorObject={formik.errors}
      />
    </div>
  );
};

export default ResumeBuilderCenter;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
