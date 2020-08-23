import React, { useState } from "react";
import Icon from "@ant-design/icons";
import Link from "next/link";
import {
  Drawer,
  Card,
  Input,
  Button,
  Col,
  Typography,
  Row,
  Avatar,
} from "antd";

const { Title } = Typography;
const { Meta } = Card;

const getFeedbackCategory = ({
  reqFeedbackCategoryVisble,
  reqFeedbackCategoryHandleCancel,
}) => {
  return (
    <>
      <Drawer
        key="getFeedbackCategory"
        title={<strong>피드백 요청 목록</strong>}
        placement="right"
        visible={reqFeedbackCategoryVisble}
        style={{ padding: 0 }}
        onClose={reqFeedbackCategoryHandleCancel}
      ></Drawer>
    </>
  );
};

export default getFeedbackCategory;
