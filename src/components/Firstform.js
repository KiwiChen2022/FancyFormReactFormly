import React, { useState } from "react";
import {
  createForm,
  registerValidateFormats,
  setValidateLanguage,
  registerValidateLocale,
  onFieldChange,
} from "@formily/core";
import {
  FormProvider,
  FormConsumer,
  Field,
  createSchemaField,
} from "@formily/react";
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
} from "@formily/antd";

const form = createForm();

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
  },
});

const style = {
  placeholder: "请输入",
  style: {
    width: 160,
  },
};

registerValidateFormats({
  address_format: /^0x[0-9a-fA-F]{40}$/,
});

setValidateLanguage("en-US");

function FirstForm() {
  const [loadings, setLoadings] = useState(false);
  const enterLoading = () => {
    setLoadings((prevLoadings) => {
      const newLoadings = !prevLoadings;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = !prevLoadings;
        console.log(form.values.address);
        console.log(form.values.amount);
        console.log(form.values.otp);
        alert("Successful Submission!");
        form.values.address = "";
        form.values.amount = "";
        form.values.otp = "";
        return newLoadings;
      });
    }, 2000);
  };

  return (
    <FormProvider form={form}>
      <h1>Transaction Form</h1>
      <SchemaField>
        <SchemaField.String
          name="address"
          title="ETH Address"
          required
          x-validator={{
            format: "address_format",
            message: "Not Valid❎",
          }}
          x-component="Input"
          x-decorator="FormItem"
          x-decorator-props={{
            colon: false,
            size: "large",
          }}
        />

        <SchemaField.String
          name="amount"
          title="Amount to send"
          required
          x-validator={"number"}
          x-component="Input"
          x-decorator="FormItem"
          x-decorator-props={{
            colon: false,
            size: "large",
          }}
        />
        <SchemaField.String
          name="otp"
          title="OTP Authentication"
          required
          x-component="Input"
          x-decorator="FormItem"
          x-decorator-props={{
            colon: false,
            size: "large",
          }}
        />
      </SchemaField>

      <FormButtonGroup>
        <Submit onSubmit={() => enterLoading()} size="large" loading={loadings}>
          submit
        </Submit>
      </FormButtonGroup>
    </FormProvider>
  );
}

export default FirstForm;
