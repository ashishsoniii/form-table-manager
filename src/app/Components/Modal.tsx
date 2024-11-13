"use client";

import React from "react";
import { Modal, Button, Form, Input, Select } from "antd";
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

  const [form] = Form.useForm();

  // Validation and submission handler
  const handleSubmit = async () => {
    try {
      const formData = await form.validateFields();
      formData.id = uuidv4(); // it adds unique id to formData
      onSubmit(formData);
      setIsVisible(false);
      form.resetFields(); // resets form
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
        }}
        okText="Submit"
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
            <Input type="number" />
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
        </Form>
      </Modal>
    </>
  );
};

export default FormModal;
