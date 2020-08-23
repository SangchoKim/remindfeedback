import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  Avatar,
  message,
  Menu,
  Dropdown,
  Button,
  Breadcrumb,
  Typography,
  Tooltip,
  Empty,
} from "antd";
import GetFeedbackContents from "./getFeedbackContents";
import GetFeedbackCategory from "./getFeedbackCategory";

const { Title } = Typography;

const getFeedback = ({ requestedFeedback }) => {
  const dispatch = useDispatch();
  const [inProgress, setInProgress] = useState(false);
  const [reqFeedbackCategoryVisble, setReqFeedbackCategoryVisible] = useState(
    false
  );

  const handleFilter = () => {
    setInProgress(!inProgress);
  };

  const reqFeedbackCategoryHandleCancel = () => {
    setReqFeedbackCategoryVisible(false);
  };

  return (
    <>
      <Col
        span={24}
        style={{
          textAlign: "center",
          marginTop: 15,
          fontStyle: "italic",
          textShadow: "2px 2px 2px gray",
        }}
      >
        <Title level={2}>
          <strong>요청받은 피드백</strong>
        </Title>
      </Col>
      <Col span={24} style={{ marginTop: 20, textAlign: "right" }}></Col>
      {requestedFeedback && requestedFeedback.length >= 1 ? (
        !inProgress ? (
          <div>
            <Button
              onClick={handleFilter}
              type="primary"
              icon="loading"
              shape="round"
            >
              <strong> 진행중</strong>
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={handleFilter}
              type="primary"
              icon="check"
              shape="round"
            >
              <strong> 진행완료 </strong>
            </Button>
          </div>
        )
      ) : (
        <div></div>
      )}
      <div>
        <GetFeedbackContents
          myFeedback={requestedFeedback}
          inProgress={inProgress}
        />
      </div>
      <GetFeedbackCategory
        reqFeedbackCategoryVisble={reqFeedbackCategoryVisble}
        reqFeedbackCategoryHandleCancel={reqFeedbackCategoryHandleCancel}
      />
    </>
  );
};

export default getFeedback;
