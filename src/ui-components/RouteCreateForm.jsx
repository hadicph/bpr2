/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Route } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function RouteCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    route_name: "",
    status: "",
    date: "",
    optimized: false,
    hasStarted: false,
    estimated_time: "",
    estimated_distance: "",
    owner: "",
    type: "",
  };
  const [route_name, setRoute_name] = React.useState(initialValues.route_name);
  const [status, setStatus] = React.useState(initialValues.status);
  const [date, setDate] = React.useState(initialValues.date);
  const [optimized, setOptimized] = React.useState(initialValues.optimized);
  const [hasStarted, setHasStarted] = React.useState(initialValues.hasStarted);
  const [estimated_time, setEstimated_time] = React.useState(
    initialValues.estimated_time
  );
  const [estimated_distance, setEstimated_distance] = React.useState(
    initialValues.estimated_distance
  );
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [type, setType] = React.useState(initialValues.type);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRoute_name(initialValues.route_name);
    setStatus(initialValues.status);
    setDate(initialValues.date);
    setOptimized(initialValues.optimized);
    setHasStarted(initialValues.hasStarted);
    setEstimated_time(initialValues.estimated_time);
    setEstimated_distance(initialValues.estimated_distance);
    setOwner(initialValues.owner);
    setType(initialValues.type);
    setErrors({});
  };
  const validations = {
    route_name: [{ type: "Required" }],
    status: [{ type: "Required" }],
    date: [{ type: "Required" }],
    optimized: [{ type: "Required" }],
    hasStarted: [{ type: "Required" }],
    estimated_time: [{ type: "Required" }],
    estimated_distance: [{ type: "Required" }],
    owner: [],
    type: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          route_name,
          status,
          date,
          optimized,
          hasStarted,
          estimated_time,
          estimated_distance,
          owner,
          type,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Route(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "RouteCreateForm")}
      {...rest}
    >
      <TextField
        label="Route name"
        isRequired={true}
        isReadOnly={false}
        value={route_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              route_name: value,
              status,
              date,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.route_name ?? value;
          }
          if (errors.route_name?.hasError) {
            runValidationTasks("route_name", value);
          }
          setRoute_name(value);
        }}
        onBlur={() => runValidationTasks("route_name", route_name)}
        errorMessage={errors.route_name?.errorMessage}
        hasError={errors.route_name?.hasError}
        {...getOverrideProps(overrides, "route_name")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={true}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              route_name,
              status: value,
              date,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={true}
        isReadOnly={false}
        type="date"
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date: value,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <SwitchField
        label="Optimized"
        defaultChecked={false}
        isDisabled={false}
        isChecked={optimized}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized: value,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.optimized ?? value;
          }
          if (errors.optimized?.hasError) {
            runValidationTasks("optimized", value);
          }
          setOptimized(value);
        }}
        onBlur={() => runValidationTasks("optimized", optimized)}
        errorMessage={errors.optimized?.errorMessage}
        hasError={errors.optimized?.hasError}
        {...getOverrideProps(overrides, "optimized")}
      ></SwitchField>
      <SwitchField
        label="Has started"
        defaultChecked={false}
        isDisabled={false}
        isChecked={hasStarted}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized,
              hasStarted: value,
              estimated_time,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.hasStarted ?? value;
          }
          if (errors.hasStarted?.hasError) {
            runValidationTasks("hasStarted", value);
          }
          setHasStarted(value);
        }}
        onBlur={() => runValidationTasks("hasStarted", hasStarted)}
        errorMessage={errors.hasStarted?.errorMessage}
        hasError={errors.hasStarted?.hasError}
        {...getOverrideProps(overrides, "hasStarted")}
      ></SwitchField>
      <TextField
        label="Estimated time"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimated_time}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized,
              hasStarted,
              estimated_time: value,
              estimated_distance,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.estimated_time ?? value;
          }
          if (errors.estimated_time?.hasError) {
            runValidationTasks("estimated_time", value);
          }
          setEstimated_time(value);
        }}
        onBlur={() => runValidationTasks("estimated_time", estimated_time)}
        errorMessage={errors.estimated_time?.errorMessage}
        hasError={errors.estimated_time?.hasError}
        {...getOverrideProps(overrides, "estimated_time")}
      ></TextField>
      <TextField
        label="Estimated distance"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={estimated_distance}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance: value,
              owner,
              type,
            };
            const result = onChange(modelFields);
            value = result?.estimated_distance ?? value;
          }
          if (errors.estimated_distance?.hasError) {
            runValidationTasks("estimated_distance", value);
          }
          setEstimated_distance(value);
        }}
        onBlur={() =>
          runValidationTasks("estimated_distance", estimated_distance)
        }
        errorMessage={errors.estimated_distance?.errorMessage}
        hasError={errors.estimated_distance?.hasError}
        {...getOverrideProps(overrides, "estimated_distance")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner: value,
              type,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              route_name,
              status,
              date,
              optimized,
              hasStarted,
              estimated_time,
              estimated_distance,
              owner,
              type: value,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
