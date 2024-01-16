import React from "react";
import { useTheme } from "@chakra-ui/react";
import FromWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import ReactSelect, { Props } from "react-select";
import {useData, initialValues} from "@src/containers/home/DataProvider"

interface IFormSelectProps
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[] | any;
  selectProps?: Props;
  onChange?: any;
  onBlur?: any;
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme();

  const { state, setState } = useData() ?? {
    state: initialValues,
    setState: () => {},
  };

  let propertyName = "";
  const handleChange = (value: any) => {
    const updatedValues = { ...state };


    if (label) {
      propertyName =
        typeof label === "string"
          ? label
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
                return index === 0 ? word.toLowerCase() : word.toUpperCase();
              })
              .replace(/\s+/g, "")
          : "";
    }

    if (propertyName === "gender" || propertyName === "urgency") {
      updatedValues.requisitionDetails[propertyName] = value.value;
    } else if (
      propertyName === "interviewDuration" ||
      propertyName === "interviewLanguage" ||
      propertyName === "interviewMode"
    ) {
      updatedValues.interviewSettings[propertyName] = value.value;
    }

    setState(updatedValues);
    onChange && onChange(name, value?.value);
  };

  const handleBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        // value={state.requisitionDetails[propertyName as keyof typeof state.requisitionDetails] || state.interviewSettings[propertyName]}
        value={options.find((item: { value: string }) => item?.value === (name === "gender" || name === "urgency" ? state.requisitionDetails[name as keyof typeof state.requisitionDetails] : state.interviewSettings[name as keyof typeof state.interviewSettings]))}       
        // value={options.find((item: { value: string }) => item?.value === state.requisitionDetails[name as keyof typeof state.requisitionDetails])}       
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        menuPosition={"fixed"}
        // styles
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
            height: "auto",
            maxHeight: "none",
            minHeight: "none",
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: "100%",
            minWidth: "272px",
            // zIndex: "40",
            height: "45px",
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : "1px solid #c0bcd7",
            backgroundColor: theme.colors.inputBg,
            borderRadius: "10px",
            fontSize: ".875rem",
            fontWeight: "500",
            "&:hover": {
              border: `1px solid ${theme.colors.primary}`,
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
            zIndex: "1",
          }),
        }}
        {...selectProps}
      />
      {children}
    </FromWrapper>
  );
};

export default FormSelect;
