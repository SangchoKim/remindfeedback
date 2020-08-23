import React, { useState } from "react";
import Icon from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Avatar,
  Empty,
  Typography,
  Button,
  Timeline,
  Input,
} from "antd";
import { layoutCenter } from "../css/UpdatePassword";

const { Text } = Typography;

const updatePassword = () => {
  const _updatePassword = () => {
    console.log("updatePassword");
  };

  return (
    <>
      <Row style={layoutCenter}>
        <Col span={8} />
        <Col span={8} style={{ marginTop: 20 }}>
          <Form onSubmit={_updatePassword}>
            <Form.Item label={<strong>비밀번호</strong>} colon={false}>
              <Col span={24} style={{ textAlign: "center", marginTop: 5 }}>
                <Input placeholder="비밀번호를 입력해주세요" />
              </Col>
            </Form.Item>
            <Form.Item label={<strong>한번 더</strong>} colon={false}>
              <Col span={24} style={{ textAlign: "center", marginTop: 5 }}>
                <Input placeholder="비밀번호를 한번 더 입력해주세요" />
              </Col>
            </Form.Item>
            <Col span={24} style={{ textAlign: "right", marginBottom: 15 }}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
                size="large"
              >
                <strong>SAVE</strong>
              </Button>
            </Col>
          </Form>
        </Col>
        <Col span={8} />
      </Row>
    </>
  );
};

export default updatePassword;
