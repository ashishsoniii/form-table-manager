"use client";

import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Select, InputNumber, Checkbox } from "antd";
import { FormData } from "../types/types";
import { v4 as uuidv4 } from "uuid";

// Better way is this pass props like this as this Provides type safety, auto-completion, and better tooling support in TypeScript and readability
// interface FormModalProps {
//   onSubmit: (data: FormData) => void;
// }

const FormModal: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [submittable, setSubmittable] = React.useState<boolean>(false); // State to control submit button

  const [form] = Form.useForm();

  // useWatch  -> monitors any changes in the form & triggers the validation check every time form field updates , if not useWatch then we have to add event listener
  const values = Form.useWatch([], form);

  // check form validity whenever form values change
  useEffect(() => {
    const validateForm = async () => {
      try {
        await form.validateFields({ validateOnly: true });
        setSubmittable(true);
      } catch {
        setSubmittable(false);
      }
    };
    validateForm();
  }, [values, form]);

  // Validation and submission handler
  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      formData.id = uuidv4(); // it adds unique id to formData
      onSubmit(formData);
      setIsVisible(false);
      form.resetFields(); // resets form
      setSubmittable(false); // Reset submit button state
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsVisible(true)}>
        Add New User
      </Button>
      <Modal
        title="Submit Your Details"
        open={isVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsVisible(false);
          form.resetFields(); // resets form on close
          setSubmittable(false); // Reset submit button state when modal is closed
        }}
        okText="Submit"
        okButtonProps={{ disabled: !submittable }}
      >
        <Form form={form} layout="vertical" initialValues={{ age: 22 }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please select your Position" }]}
          >
            <Select
              placeholder="Select Position"
              options={[
                { value: "Intern", label: "Intern" },
                { value: "Engineer", label: "Engineer" },
              ]}
            />
          </Form.Item>

          {values?.position === "Intern" && (
            <Form.Item
              label="Mentor Name"
              name="mentorName"
              rules={[
                { required: true, message: "Please enter your Mentor's name" },
              ]}
            >
              <Input placeholder="Enter your Mentor name" />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                max: 100,
                message: "Please enter a valid age between 1 and 100",
              },
            ]}
          >
            <InputNumber type="number" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[
              {
                min: 10,
                message: "Length of Message should be at least 10 characters",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select a gender" }]}
          >
            <Select
              showSearch
              placeholder="Select a gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
          </Form.Item>

          {/* hobbies  */}
          <Form.Item
            label="Hobbies"
            name="hobbies"
            rules={[
              { type: "array", message: "Please select at least one hobby" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select your hobbies"
              options={[
                { value: "Reading", label: "Reading" },
                { value: "Traveling", label: "Traveling" },
                { value: "Gaming", label: "Gaming" },
                { value: "Cooking", label: "Cooking" },
              ]}
            />
          </Form.Item>

          {/* checkbox for isActive | true/false */}
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox>Is Active</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
