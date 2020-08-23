import React from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Button,
  Card,
  Avatar,
  Popover,
  Popconfirm,
} from "antd";

const font = {
  color: "#FFFFFF",
  fontSize: 10,
};

const AppFooter = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Breadcrumb style={{ fontWeight: "bold" }}>
            <Breadcrumb.Item href="#" style={font}>
              <span>서비스이용약관</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" style={font}>
              <span>개인정보취급방침</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" style={font}>
              <span>위치기반서비스약관</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Breadcrumb style={{ fontWeight: "bold", color: "#FFFFFF" }}>
            <Breadcrumb.Item style={font}>
              <span>서울특별시 ...</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={font}>
              <span>대표 ...</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={font}>
              <span>사업자등록번호 000-00-000000</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={font}>
              <span>통신판매업신고번호 000-00-000000</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </>
  );
};

export default AppFooter;
