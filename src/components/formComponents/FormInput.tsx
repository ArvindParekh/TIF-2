import React from "react";
import { Input } from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import {useData, initialValues} from "@src/containers/home/DataProvider"

const FormInput = React.forwardRef<HTMLInputElement, IFormInputProps>(
  (
    {
      name,
      label,
      placeholder,
      type,
      value,
      onChange,
      onBlur,
      error,
      touched,
      inputProps = {},
      children,
      helperText,
      wrapperProps = {},
    },
    ref
  ) => {
    const { state, setState } = useData() || {
      state: initialValues,
      setState: () => {},
     };
     
     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const updatedValues = { ...state };
     
      if (name === "requisitionTitle") {
        updatedValues.requisitionDetails[name] = value;
      } else if (name === "noOfOpenings") {
        updatedValues.requisitionDetails[name] = +value;
      } else if (
        name === "jobDetails" ||
        name === "jobLocation" ||
        name === "jobTitle"
      ) {
        updatedValues.jobDetails[name] = value;
      }
     
      setState(updatedValues);
      onChange && onChange(event);
     };
     
    return (
      <FormWrapper
        isInvalid={Boolean(error && touched)}
        wrapperProps={wrapperProps}
        helperText={helperText}
        label={label}
        touched={touched}
        error={error as string}
      >
        <Input
          name={name}
          placeholder={placeholder}
          type={type}
          value={name === "requisitionTitle" || name === "noOfOpenings" ? (state.requisitionDetails[name]): state.jobDetails[name as keyof typeof state.jobDetails]}
          onChange={handleChange}
          onBlur={onBlur}
          // styles
          width="100%"
          maxHeight="none !important"
          minW="272px"
          height="45px"
          fontSize="0.875rem"
          fontWeight="500"
          px="20px"
          border="1px solid #c0bcd7"
          bg="inputBg"
          borderRadius="10px"
          focusBorderColor="primary"
          errorBorderColor="errorRed"
          _placeholder={{
            color: "text.placeholder",
          }}
          ref={ref}
          {...inputProps}
        />
        {children}
      </FormWrapper>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
