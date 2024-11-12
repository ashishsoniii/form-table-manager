"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { FormData } from "../types/types";
import { v4 as uuidv4 } from "uuid";

// Better way is this pass like this as Provides type safety, auto-completion, and better tooling support in TypeScript and and
// interface FormModalProps {
//   onSubmit: (data: FormData) => void;
// }

const FormModal: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Unified form state
  const [formData, setFormData] = useState<FormData>({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
    message: "",
    gender: "",
    age: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gender: "",
    age: "",
  });

  // Field change handler
  const handleFieldChange = (field: string) => {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => {
      setFormData((prevState) => {
        return {
          ...prevState,
          [field]: typeof e === "string" ? e : e.target.value,
        };
      });
    };
  };

  // Validation function
  const validateFields = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
      gender: "",
      age: "",
    };

    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Please enter your name";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Please enter your phone number";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    if (formData.message && formData.message.length < 10) {
      newErrors.message = "Length of Message should be at least 10 characters";
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    }
    if (formData.age === 0 && formData.age <= 101) {
      newErrors.age = "Please Enter correct Age";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit(formData);
      setIsVisible(false);
      resetForm();
    }
  };

  // Reset form fields and errors
  const resetForm = () => {
    setFormData({
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
      message: "",
      gender: "",
      age: 22,
    });
    setErrors({
      name: "",
      email: "",
      phone: "",
      message: "",
      gender: "",
      age: "",
    });
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
          resetForm();
        }}
        okText="Submit"
      >
        <Form layout="vertical">
          <Form.Item
            label="Name"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
            <Input value={formData.name} onChange={handleFieldChange("name")} />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email}
          >
            <Input
              value={formData.email}
              onChange={handleFieldChange("email")}
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone}
          >
            <Input
              value={formData.phone}
              onChange={handleFieldChange("phone")}
            />
          </Form.Item>

          <Form.Item
            label="Age"
            validateStatus={errors.age ? "error" : ""}
            help={errors.age}
          >
            <Input value={formData.age} onChange={handleFieldChange("age")} />
          </Form.Item>

          <Form.Item
            label="Message"
            validateStatus={errors.message ? "error" : ""}
            help={errors.message}
          >
            <Input.TextArea
              rows={4}
              value={formData.message}
              onChange={handleFieldChange("message")}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            validateStatus={errors.gender ? "error" : ""}
            help={errors.gender}
          >
            <Select
              showSearch
              placeholder="Select a gender"
              value={formData.gender}
              onChange={handleFieldChange("gender")}
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
