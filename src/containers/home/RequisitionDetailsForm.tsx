import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik, Form, Formik, Field } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { PageNumbers } from "@src/interface/home";

const RequisitionDetailsForm: React.FC<{
  handleScreen: (n: PageNumbers) => void;
}> = ({ handleScreen }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      //  Go to Next Step
      handleScreen(1);
    },
  });


  // handleChange(event);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <Formik
          initialValues={{ requisitionTitle: '', noOfOpenings: '', gender: '', urgency: '' }}
          onSubmit={(values) => {
            // handle form submission
            handleScreen(1);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="requisitionTitle">
                {({ field }) => (
                  <FormInput
                    label="Requisition Title"
                    placeholder="Enter requisition title"
                    {...field}
                    error={errors.requisitionTitle && touched.requisitionTitle ? errors.requisitionTitle : null}
                  />
                )}
              </Field>
              <Field name="noOfOpenings">
                {({ field }) => (
                  <FormInput
                    label="Number of openings"
                    placeholder="Enter number of openings"
                    {...field}
                    error={errors.noOfOpenings && touched.noOfOpenings ? errors.noOfOpenings : null}
                  />
                )}
              </Field>
              <Field name="gender">
                {({ field }) => (
                  <FormSelect
                    label="Gender"
                    placeholder="Select gender"
                    options={genderOptions}
                    {...field}
                    error={errors.gender && touched.gender ? errors.gender : null}
                  />
                )}
              </Field>
              <Field name="urgency">
                {({ field }) => (
                  <FormSelect
                    label="Urgency"
                    placeholder="Select urgency"
                    options={urgencyOptions}
                    {...field}
                    error={errors.urgency && touched.urgency ? errors.urgency : null}
                  />
                )}
              </Field>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <Flex w="100%" justify="flex-end" mt="4rem">
          {/* <Button colorScheme="red" onClick={handleNext} type="submit"> */}
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;
