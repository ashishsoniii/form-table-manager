"use client";

import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import { FormData } from "../types/types";
import { v4 as uuidv4 } from "uuid";

interface FormModalProps {
  onSubmit: (data: FormData) => void;
}

const FormModal: React.FC<FormModalProps> = ({ onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Unified form state
  const [formData, setFormData] = useState<FormData>({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
    message: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    gender: "",
  });

  // Field change handler
  const handleFieldChange = (field: keyof FormData) => {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => {
      // We update the formData state by copying the previous state and only modifying the specific field.
      setFormData((prevState) => {
        return {
          // Copy all the existing formData
          ...prevState,

          // Update the specific field (field) with the new value
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
    });
    setErrors({ name: "", email: "", phone: "", message: "", gender: "" });
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
