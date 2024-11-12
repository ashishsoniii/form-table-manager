"use client";

import styles from "./page.module.css";
import { Button, Col, Row, Table } from "antd";
import Modals from "./Components/Modal";
import { FormData } from "./types/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [formData, setFormData] = useState<FormData[]>([
    {
      id: uuidv4(), // Automatically generating ID
      name: "Ashish Soni",
      phone: "9660688940",
      email: "ashishsoni2002@gmail.com",
      gender: "Male",
      message: "This is my Quite small msg",
    },
    {
      id: uuidv4(), // Automatically generating ID
      name: "Ashish Soni 2",
      phone: "9660688940",
      email: "ashishsoni2002@gmail.com",
      gender: "Male",
      message: "This is my Quite small msg",
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // to store selected row keys

  const columns = [
    {
      title: "Select",
      dataIndex: "select",
      key: "select",
      render: (text: any, record: any) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => handleRowSelection(record.id)}
        />
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  const dataSource = [...formData];

  const handleAddData = (newData: FormData) => {
    setFormData((prev) => [...prev, newData]);
  };

  const handleDelete = () => {
    const newData = formData.filter(
      (item) => !selectedRowKeys.includes(item.id)
    ); // Remove selected items
    setFormData(newData);
    setSelectedRowKeys([]); // Clear selected rows after deletion
  };

  const handleRowSelection = (id: string) => {
    const newSelectedKeys = selectedRowKeys.includes(id)
      ? selectedRowKeys.filter((key) => key !== id) // Deselect
      : [...selectedRowKeys, id]; // Select

    setSelectedRowKeys(newSelectedKeys);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Row justify="space-between" style={{ marginBottom: "20px" }}>
        <Col>
          <Modals onSubmit={handleAddData} />
        </Col>
        <Col>
          <Button
            type="primary"
            danger
            onClick={handleDelete}
            disabled={selectedRowKeys.length === 0}
          >
            Delete Selected
          </Button>
        </Col>
      </Row>

      {/* <Button
        color="danger"
        variant="outlined"
        onClick={handleDelete}
        disabled={selectedRowKeys.length === 0}
      >
        Delete Selected
      </Button> */}

      <div
        style={{
          padding: "10px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="id"
        />
      </div>
    </div>
  );
}
