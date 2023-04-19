/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RouteCreateFormInputValues = {
    route_name?: string;
    status?: string;
    date?: string;
    optimized?: boolean;
    hasStarted?: boolean;
    estimated_time?: number;
    estimated_distance?: number;
    owner?: string;
    type?: string;
};
export declare type RouteCreateFormValidationValues = {
    route_name?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    optimized?: ValidationFunction<boolean>;
    hasStarted?: ValidationFunction<boolean>;
    estimated_time?: ValidationFunction<number>;
    estimated_distance?: ValidationFunction<number>;
    owner?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RouteCreateFormOverridesProps = {
    RouteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    route_name?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    optimized?: PrimitiveOverrideProps<SwitchFieldProps>;
    hasStarted?: PrimitiveOverrideProps<SwitchFieldProps>;
    estimated_time?: PrimitiveOverrideProps<TextFieldProps>;
    estimated_distance?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RouteCreateFormProps = React.PropsWithChildren<{
    overrides?: RouteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RouteCreateFormInputValues) => RouteCreateFormInputValues;
    onSuccess?: (fields: RouteCreateFormInputValues) => void;
    onError?: (fields: RouteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RouteCreateFormInputValues) => RouteCreateFormInputValues;
    onValidate?: RouteCreateFormValidationValues;
} & React.CSSProperties>;
export default function RouteCreateForm(props: RouteCreateFormProps): React.ReactElement;
