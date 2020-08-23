import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import { Modal, Layout, Form, Input, Button, Col, Typography, Row } from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/FeedbackDetail";
import {
  FEEDBACK_ITEM_ADD_REQUEST,
  FEEDBACK_ITEM_UPDATE_REQUEST,
} from "../reducers/feedback";

const { TextArea } = Input;
const { Content } = Layout;
const { Title } = Typography;

const feedBackDetailWrite = ({
  writeVisible,
  writeHandleCancel,
  name,
  feedback_id,
  feedBackItemId,
}) => {
  const dispatch = useDispatch();
  const { feedbackItem } = useSelector((state) => state.feedback);

  const [board_content, setContents] = useState("");
  const [board_title, setTitle] = useState("");

  useEffect(() => {
    if (feedBackItemId) {
      const { board_content, board_title } = feedbackItem.find(
        (v, i) => parseInt(feedBackItemId) === parseInt(v.id)
      );
      setContents(board_content);
      setTitle(board_title);
    }

    if (name === "TEXT") {
      setContents("");
      setTitle("");
    }
  }, [feedBackItemId && feedBackItemId, name && name]);

  const _onsubmit = useCallback(() => {
    if (!board_title) {
      return alert("제목을 작성해주세요");
    }
    if (!board_content) {
      return alert("내용을 작성해주세요");
    }

    if (name === "TEXT_UPDATE") {
      dispatch({
        type: FEEDBACK_ITEM_UPDATE_REQUEST,
        data: {
          board_content,
          name,
          feedBackItemId,
          board_title,
        },
      });
    } else {
      dispatch({
        type: FEEDBACK_ITEM_ADD_REQUEST,
        data: {
          board_content,
          name,
          feedback_id,
          board_title,
        },
      });
    }
    setContents("");
    setTitle("");
    writeHandleCancel();
  }, [board_content, board_title]);

  const handleChange = useCallback(
    (e) => {
      setContents(e.target.value);
    },
    [board_content]
  );

  const handleTitle = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [board_title]
  );

  return (
    <>
      <Modal
        key="feedBackDetailWrite"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>글쓰기</Title>
          </div>
        }
        visible={writeVisible}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={writeHandleCancel}
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
            >
              {name === "TEXT_UPDATE" ? (
                <strong>수정</strong>
              ) : (
                <strong>추가</strong>
              )}
            </Button>
          </div>,
        ]}
        onCancel={writeHandleCancel}
        centered={true}
      >
        <Content style={backgroundWhite}>
          <Form {...formItemLayout}>
            <Row>
              <Col span={24}>
                <Form.Item label={<strong>제목</strong>}>
                  <Input
                    required
                    placeholder="제목을 입력해주세요"
                    prefix={<Icon type="edit" />}
                    value={board_title}
                    onChange={handleTitle}
                  />
                </Form.Item>
                <Form.Item label={<strong>내용</strong>}>
                  <TextArea
                    required
                    rows={4}
                    value={board_content}
                    onChange={handleChange}
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

export default feedBackDetailWrite;
