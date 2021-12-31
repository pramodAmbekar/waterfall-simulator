export interface socialMedia {
  email: string;
  phoneNumber: number;
  address: string;
  linkedIn: string;
}

export interface PersonalDetails {
  name: string;
  designation: string;
  description: string;
  socialMedia: socialMedia;
  photo: object;
}

export interface Project {
  projectName: string;
  role: string;
  startDate: Date | string;
  endDate: Date | string;
  current: boolean;
  description: string;
}

export interface WorkExperience {
  companyName: string;
  location: string;
  startDate: Date | string;
  endDate: Date | string;
  current: boolean;
  designation: string;
  projects: Project[];
}

export interface Education {
  name: string;
  collegeName: string;
  course: string;
  startDate: Date;
  endDate: Date;
  location: string;
}
export interface Achivement {
  name: string;
  description: string;
}

export interface Certificate extends Achivement {}
export interface FormType {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience;
  skills: string[];
  education: Education[];
  achivements: Achivement[];
  interests: string[];
  certificates: Certificate[];
}

export interface InputType {
  name: string;
  label: string;
  type: any;
  id: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMessage: string;
  required: boolean;
  disabled: boolean;
  isError: boolean;
  key: string;
}

export interface TabType {
  label: string;
  a11yProps: (index: number) => object;
}

export interface gridType {
  rows: number;
  columns: number;
  obstructions: number;
}
