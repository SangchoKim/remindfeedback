import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Modal,
  Layout,
  Form,
  Input,
  Button,
  Col,
  Typography,
  Row,
  Divider,
  Table,
  Pagination,
  Empty,
} from "antd";
import { formItemLayout } from "../css/Friends";
import { FRIENDS_RQ_ADD_REQUEST } from "../reducers/friends";

const { Group } = Button;
const { Text, Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

const requestFriends = ({
  requestVisible,
  requestHandleOk,
  requestHandleCancel,
}) => {
  const dispatch = useDispatch();
  const { receivedFriends } = useSelector((state) => state.friends);

  const columns = [
    {
      title: "NO",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "이메일",
      key: "email",
      dataIndex: "email",
      render: (email) => <a>{email}</a>,
    },
    {
      title: "친구요청",
      dataIndex: "ing",
      key: "ing",
      align: "center",
      render: (ing) => (
        <>
          <Group>
            <Button type="primary" name="accept" id={ing} onClick={_onsubmit}>
              수락
            </Button>
            <Button type="danger" name="reject" id={ing} onClick={_onsubmit}>
              거절
            </Button>
          </Group>
        </>
      ),
    },
  ];

  const data =
    receivedFriends &&
    receivedFriends.map((v, i) => {
      return {
        key: v.user_uid,
        number: i + 1,
        name: v.nickname,
        email: v.email,
        ing: v.user_uid,
      };
    });

  const _onsubmit = useCallback((e) => {
    const check = e.target.name;
    const friend_uid = e.target.id;
    const friend_id = receivedFriends.find((v, i) => v.user_uid === friend_uid)
      .id;
    console.log(friend_uid);
    if (check === "accept") {
      // 수락
      dispatch({
        type: FRIENDS_RQ_ADD_REQUEST,
        data: {
          check,
          user_uid: friend_uid,
          friend_id,
        },
      });
    } else {
      // 거절
      dispatch({
        type: FRIENDS_RQ_ADD_REQUEST,
        data: {
          check,
          friend_uid,
          friend_id,
        },
      });
    }
  });

  return (
    <>
      <Modal
        key="addFriends"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>친구 요청</Title>
          </div>
        }
        visible={requestVisible}
        onOk={requestHandleOk}
        onCancel={requestHandleCancel}
        bodyStyle={{
          padding: 0,
          borderTop: "#000000 solid 1px",
          borderBottom: "#000000 solid 1px",
        }}
        centered={true}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={requestHandleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={requestHandleOk}
              style={{ width: "100%" }}
            >
              <strong>닫기</strong>
            </Button>
          </div>,
        ]}
      >
        <Content>
          <Row>
            <Divider
              style={{ border: "#000000 solid 1px", marginBottom: 10 }}
            />
            <Col span={24} style={{ textAlign: "center" }}>
              <Text>
                <strong>나에게 온 친구 요청 목록</strong>
              </Text>
              <Divider style={{ border: "#000000 solid 1px", marginTop: 10 }} />
            </Col>
            {!receivedFriends || receivedFriends.length < 1 ? (
              <Col span={24} style={{ margin: 1 }}>
                <Empty
                  description={
                    <span>
                      <strong>요청을 받은 친구가 없습니다.</strong>
                    </span>
                  }
                />
              </Col>
            ) : (
              <Col span={24}>
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={<Pagination style={{ textAlign: "center" }} />}
                />
              </Col>
            )}
          </Row>
        </Content>
      </Modal>
    </>
  );
};

export default requestFriends;
