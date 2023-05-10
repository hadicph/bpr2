/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserPreferenceCreateFormInputValues = {
    owner?: string;
    theme?: string;
};
export declare type UserPreferenceCreateFormValidationValues = {
    owner?: ValidationFunction<string>;
    theme?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPreferenceCreateFormOverridesProps = {
    UserPreferenceCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    theme?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPreferenceCreateFormProps = React.PropsWithChildren<{
    overrides?: UserPreferenceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserPreferenceCreateFormInputValues) => UserPreferenceCreateFormInputValues;
    onSuccess?: (fields: UserPreferenceCreateFormInputValues) => void;
    onError?: (fields: UserPreferenceCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPreferenceCreateFormInputValues) => UserPreferenceCreateFormInputValues;
    onValidate?: UserPreferenceCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserPreferenceCreateForm(props: UserPreferenceCreateFormProps): React.ReactElement;
