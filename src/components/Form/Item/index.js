import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { Form } from "antd";
import styled from "styled-components";

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-children,
  .ant-form-item-label,
  .ant-form-item-label {
    .ant-typography,
    label {
      display: block;
    }
  }
`;

const FormikFormItem = ({
  name,
  showValidateSuccess,
  children,
  hideErrors,
  ...props
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.error !== undefined;
  const isValid = meta.touched && !meta.error;

  return (
    <StyledFormItem
      validateStatus={
        meta.error && meta.touched
          ? "error"
          : isValid && showValidateSuccess
          ? "success"
          : undefined
      }
      hasFeedback={isValid}
      help={hasError && meta.touched && !hideErrors && <>{meta.error}</>}
      {...props}
    >
      {children}
    </StyledFormItem>
  );
};

const FormItem = ({ showValidateSuccess, children, name, ...props }) => {
  if (name) {
    return (
      <FormikFormItem
        name={name}
        showValidateSuccess={showValidateSuccess}
        {...props}
      >
        {children}
      </FormikFormItem>
    );
  }
  return <StyledFormItem {...props}>{children}</StyledFormItem>;
};

FormikFormItem.propTypes = {
  name: PropTypes.string,
  showValidateSuccess: PropTypes.bool
};

FormItem.propTypes = {
  name: PropTypes.string,
  showValidateSuccess: PropTypes.bool,
  children: PropTypes.node,
  hideErrors: PropTypes.bool
};

export default FormItem;
