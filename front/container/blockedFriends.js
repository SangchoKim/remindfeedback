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
import { FRIENDS_BLOCK_UPDATE_REQUEST } from "../reducers/friends";

const { Group } = Button;
const { Text, Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

const blockedFriends = ({
  blockedVisible,
  blockedHandleOk,
  blockedHandleCancel,
}) => {
  const dispatch = useDispatch();
  const { blockedFriends } = useSelector((state) => state.friends);

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
            <Button type="primary" name="unblock" id={ing} onClick={_onsubmit}>
              차단해제
            </Button>
          </Group>
        </>
      ),
    },
  ];

  const data =
    blockedFriends &&
    blockedFriends.map((v, i) => {
      return {
        key: v.user_uid,
        number: i + 1,
        name: v.nickname,
        email: v.email,
        ing: v.user_uid,
      };
    });

  const _onsubmit = useCallback((e) => {
    const friend_uid = e.target.id;
    const friend_id = blockedFriends.find((v, i) => v.user_uid === friend_uid)
      .id;
    dispatch({
      type: FRIENDS_BLOCK_UPDATE_REQUEST,
      data: {
        friend_uid,
        friend_id,
      },
    });
    blockedHandleCancel();
  });

  return (
    <>
      <Modal
        key="addFriends"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>친구 차단 목록</Title>
          </div>
        }
        visible={blockedVisible}
        onOk={blockedHandleOk}
        onCancel={blockedHandleCancel}
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
              onClick={blockedHandleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={blockedHandleOk}
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
                <strong>친구 차단 목록</strong>
              </Text>
              <Divider style={{ border: "#000000 solid 1px", marginTop: 10 }} />
            </Col>
            {!blockedFriends || blockedFriends.length < 1 ? (
              <Col span={24} style={{ margin: 1 }}>
                <Empty
                  description={
                    <span>
                      <strong>차단한 친구가 없습니다.</strong>
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

export default blockedFriends;
