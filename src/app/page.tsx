"use client";

import styles from "./page.module.css";
import { Table } from "antd";
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

  return (
    <div className={styles.page}>
      {/* modal for form */}
      <Modals onSubmit={handleAddData} />

      {/* Antd table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
