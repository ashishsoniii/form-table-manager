"use client";

import { Button, Col, Row, Table } from "antd";
import Modals from "./Components/Modal";
import { FormData } from "./types/types";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [formData, setFormData] = useState<FormData[]>([
    {
      id: uuidv4(),
      name: "Ashish Soni",
      phone: "9660688940",
      email: "ashishsoni2002@gmail.com",
      gender: "Male",
      message: "This is my Quite small msg",
      age: 22,
      position: "Intern",
      mentorName: "Santosh"
    },
    {
      id: uuidv4(),
      name: "Santosh",
      phone: "987654321",
      email: "santosh@gmail.com",
      gender: "Male",
      message: "This is my Quite small msg",
      age: 22,
      position:"Engineer"
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Mentor Name",
      dataIndex: "mentorName",
      key: "mentorName",
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
    setSelectedRowKeys([]); // Clear selected rows 
  };

  //
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
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
          rowSelection={rowSelection} // this Ant Design's rowSelection (takes React.key[])
          bordered
        />
      </div>
    </div>
  );
}
