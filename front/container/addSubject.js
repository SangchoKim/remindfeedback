import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclePicker } from "react-color";
import Icon from "@ant-design/icons";
import { Modal, Layout, Form, Input, Button, Col, Typography, Row } from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/Subject";
import { FEEDBACK_SUB_ADD_REQUEST } from "../reducers/feedbackSubject";

const { Content } = Layout;
const { Title } = Typography;

const addSubject = ({ visible, handleCancel }) => {
  const dispath = useDispatch();
  const { isAddingSubject } = useSelector((state) => state.feedbackSubject);
  const [category_color, setColor] = useState();
  const [category_title, setTitle] = useState();

  const _onsubmit = useCallback(() => {
    dispath({
      type: FEEDBACK_SUB_ADD_REQUEST,
      data: {
        category_color,
        category_title,
      },
    });
  }, [category_color, category_title]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handleColor = (color) => {
    setColor(color.hex);
  };

  const category_colors = [
    "#E51C23",
    "#FF5722",
    "#FFFF00",
    "#259B24",
    "#18FFFF",
    "#3F51B5",
    "#9C27B0",
    "#FF4081",
    "#000000",
  ];

  return (
    <>
      <Modal
        key="addSubject"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>새로운 주제</Title>
          </div>
        }
        visible={visible}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={handleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={_onsubmit}
              style={{ width: "100%" }}
              loading={isAddingSubject}
            >
              <strong>주제 추가</strong>
            </Button>
          </div>,
        ]}
        onCancel={handleCancel}
        centered={true}
      >
        <Content style={backgroundWhite}>
          <Form {...formItemLayout}>
            <Row>
              <Col span={24}>
                <Form.Item label={<strong>주제 이름</strong>}>
                  <Input
                    prefix={
                      <Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    onChange={handleTitle}
                    value={category_title}
                    placeholder="제목"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={<strong>색상 설정</strong>}>
                  <CirclePicker
                    colors={category_colors}
                    color={category_color}
                    onChangeComplete={handleChangeComplete}
                    onChange={handleColor}
                    width="10"
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

export default addSubject;
