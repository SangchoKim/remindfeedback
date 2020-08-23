import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import { Modal, Layout, Form, Input, Button, Col, Typography, Row } from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/Subject";

const { Content } = Layout;
const { Title } = Typography;

const feedBackDetailRecord = ({ recordVisible, recordHandleCancel, name }) => {
  const [color, setColor] = useState();

  const _onsubmit = () => {};

  return (
    <>
      <Modal
        key="feedBackDetailRecord"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>녹음</Title>
          </div>
        }
        visible={recordVisible}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={recordHandleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              size="large"
              style={{ width: "100%" }}
            >
              <strong>추가</strong>
            </Button>
          </div>,
        ]}
        onCancel={recordHandleCancel}
        centered={true}
      >
        <Content style={backgroundWhite}>
          <Form {...formItemLayout} onSubmit={_onsubmit}>
            <Row>
              <Col span={24}>
                <Form.Item label={<strong>비밀번호 입력</strong>}>
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="비밀번호를 입력해주세요"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Content>
      </Modal>
    </>
  );
};

export default feedBackDetailRecord;
