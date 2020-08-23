import React, { useState } from "react";
import Link from "next/link";
import Icon from "@ant-design/icons";
import {
  Popconfirm,
  Card,
  Input,
  Button,
  Col,
  Typography,
  Row,
  Avatar,
} from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/Subject";

const { Title } = Typography;
const { Meta } = Card;

const alert = ({ alertVisible, alerthHandleCancel, alerthHandleOk }) => {
  const item = (
    <Row style={{ width: 500 }}>
      <Col span={24} style={{ textAlign: "center", marginBottom: 10 }}>
        <Title level={4} style={{ color: "red" }}>
          <Icon type="alert" /> 알림
        </Title>
      </Col>
      <Col span={24}>
        <Link href="/feedbackdetail">
          <a>
            <Card>
              <Meta
                avatar={<Avatar>U</Avatar>}
                title="test"
                description="Description"
              />
            </Card>
          </a>
        </Link>
      </Col>
    </Row>
  );

  return (
    <>
      <Popconfirm
        key="alert"
        title={item}
        placement="bottomRight"
        visible={alertVisible}
        onConfirm={alerthHandleOk}
        icon=""
        style={{ padding: 0 }}
        // footer={[
        //     <div key="add" style={{textAlign:'center'}}>
        //         <Button key="back" onClick={alerthHandleCancel} style={{display:'none'}}>
        //             <strong>취소</strong>
        //         </Button>,
        //         <Button key="submit" type="primary" size='large' onClick={alerthHandleOk} style={{width:'100%'}}>
        //             <Link href='/updatepassword' key='2'><a><strong>확인</strong></a></Link>
        //         </Button>
        //     </div>
        // ]}
        okText="확인"
        cancelText="취소"
        onCancel={alerthHandleCancel}
      ></Popconfirm>
    </>
  );
};

export default alert;
