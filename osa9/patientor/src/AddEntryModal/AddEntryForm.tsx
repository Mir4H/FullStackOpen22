import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  TextField,
  SelectField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import {
  Type,
  HealthCheckRating,
  EntryFormValues,
  TypeOption,
  RatingOption,
} from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.HealthCheck, label: "Health Check" },
  { value: Type.Hospital, label: "Hospital" },
  { value: Type.OccupationalHealthcare, label: "Occupational Healthcare" },
];

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating["Healthy"], label: "Healthy" },
  { value: HealthCheckRating["LowRisk"], label: "LowRisk" },
  { value: HealthCheckRating["HighRisk"], label: "HighRisk" },
  { value: HealthCheckRating["CriticalRisk"], label: "CriticalRisk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const date = new Date();
  const [{ diagnoses }] = useStateValue();

  const baseValues = {
    description: "",
    date: date.toISOString().substring(0, 10),
    specialist: "",
    type: Type.HealthCheck,
    diagnosisCodes: [],
    healthCheckRating: HealthCheckRating["Healthy"],
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
    discharge: {
      date: "",
      criteria: "",
    },
  };

  return (
    <Formik
      initialValues={baseValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const startDate = values.sickLeave.startDate;
        const endDate = values.sickLeave.endDate;
        const dischargeDate = values.discharge.date;
        const criteria = values.discharge.criteria;
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === Type.OccupationalHealthcare) {
          if (!values.employerName) errors.employerName = requiredError;
          if (
            (startDate && !Date.parse(startDate)) ||
            (endDate && !startDate)
          ) {
            errors.sickLeave = "Provide start date in date format";
          }
          if (startDate && (!endDate || !Date.parse(endDate))) {
            errors.sickLeave = "Provide end date in date format";
          }
        }
        if (values.type === Type.Hospital) {
          if (
            (dischargeDate && !Date.parse(dischargeDate)) ||
            (!dischargeDate && criteria)
          ) {
            errors.discharge = "Provide discharge date in date format";
          }
          if (dischargeDate && !criteria) {
            errors.discharge = "Provide discharge criteria";
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        const errorStyle = {
          color: "red",
          fontFamily: "arial",
          fontSize: "14px",
        };
        return (
          <Form className="form ui">
            <SelectField label="Visit Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === Type.HealthCheck ? (
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            ) : null}
            {values.type === Type.Hospital ? (
              <>
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <>
                  <ErrorMessage name="discharge" component="div">
                    {(msg) => <span style={errorStyle}>{msg}</span>}
                  </ErrorMessage>
                  <Field
                    label="Discharge criteria"
                    placeholder="Discharge criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </>
              </>
            ) : null}
            {values.type === Type.OccupationalHealthcare ? (
              <>
                <Field
                  label="Employer"
                  placeholder="Employer"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="SickLeave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <>
                  <ErrorMessage name="sickLeave" component="div">
                    {(msg) => <span style={errorStyle}>{msg}</span>}
                  </ErrorMessage>
                  <Field
                    label="SickLeave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </>
              </>
            ) : null}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
