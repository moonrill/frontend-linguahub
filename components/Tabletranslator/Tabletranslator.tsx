// components/Services.js
import React from "react";
import { Table, Typography } from "antd";

const { Title } = Typography;

const Tabletranslator = ({ dataSource, columns }) => {
  return (
    <div className="mb-6">
      <Title level={4}>Services</Title>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  );
};

export default Tabletranslator;
