import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclePicker } from "react-color";
import Icon from "@ant-design/icons";
import { Modal, Layout, Form, Input, Button, Col, Typography, Row } from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/Subject";
import { FEEDBACK_SUB_UPDATE_REQUEST } from "../reducers/feedbackSubject";

const { Content } = Layout;
const { Title } = Typography;

const updateSubject = ({
  updateVisible,
  handleUpdateCancel,
  title,
  category_id,
}) => {
  const dispath = useDispatch();
  const { isUpdatingSubject } = useSelector((state) => state.feedbackSubject);

  const [category_color, setColor] = useState();
  const [category_title, setTitle] = useState();

  useEffect(() => {
    if (title) {
      setTitle(title);
    }
  }, [title && title]);

  const _onsubmit = useCallback(() => {
    dispath({
      type: FEEDBACK_SUB_UPDATE_REQUEST,
      data: {
        category_color,
        category_title,
        category_id,
      },
    });
  }, [category_color, category_title]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handleChange = (color) => {
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
        key="updateSubjectModal"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>주제 수정</Title>
          </div>
        }
        visible={updateVisible}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={handleUpdateCancel}
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
              loading={isUpdatingSubject}
              style={{ width: "100%" }}
            >
              <strong>주제 수정</strong>
            </Button>
          </div>,
        ]}
        onCancel={handleUpdateCancel}
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
                    placeholder="제목"
                    onChange={handleTitle}
                    value={category_title}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={<strong>색상 설정</strong>}>
                  <CirclePicker
                    colors={category_colors}
                    color={category_color}
                    onChangeComplete={handleChangeComplete}
                    onChange={handleChange}
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

export default updateSubject;
