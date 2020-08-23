import React, { useState, useCallback, useEffect } from "react";
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
  Comment,
  List,
  Avatar,
} from "antd";
import { formItemLayout } from "../css/Friends";
import { FRIENDS_ADD_SEARCH_REQUEST } from "../reducers/friends";
import { FRIENDS_ADD_ADD_REQUEST } from "../reducers/friends";

const { Text, Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

const addFriends = ({ addVisible, addHandleOk, addHandleCancel }) => {
  const dispatch = useDispatch();
  const {
    addedFriends,
    searchedFriends,
    Add_Modal_isSearchingFriends,
  } = useSelector((state) => state.friends);
  const [email, setEmail] = useState("");

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
      title: "진행상황",
      dataIndex: "ing",
      key: "ing",
      align: "center",
      render: (ing) => <Button type="danger">{ing}</Button>,
    },
  ];

  const data =
    addedFriends.length >= 1 &&
    addedFriends.map((v, i) => {
      return {
        key: v.user_uid,
        number: i + 1,
        name: v.nickname,
        email: v.email,
        ing:
          v.type === 0
            ? "거절됨"
            : v.type === 1
            ? "요청중"
            : v.type === 2
            ? "수락됨"
            : v.type === 3
            ? "차단함"
            : v.type === 4
            ? "차단함"
            : v.type === 5
            ? "서로차단"
            : "에러 발생",
      };
    });

  const _onsubmit = useCallback(() => {
    if (!searchedFriends) {
      return alert("이메일을 입력해주세요");
    }

    dispatch({
      type: FRIENDS_ADD_ADD_REQUEST,
      data: {
        user_uid: searchedFriends.user_uid ? searchedFriends.user_uid : 0,
        nickname: searchedFriends.nickname,
      },
    });
  }, [searchedFriends && searchedFriends]);

  const handleSearch = (e) => {
    setEmail(e.target.value);
  };

  const handleSearchOk = useCallback(() => {
    if (email === "") {
      return alert("이메일을 입력해주세요");
    }

    dispatch({
      type: FRIENDS_ADD_SEARCH_REQUEST,
      data: {
        email,
      },
    });
    setEmail("");
  }, [email && email]);

  const actions = searchedFriends && [
    <span>
      <Button key="request_friends" size="small" onClick={_onsubmit}>
        친구 요청
      </Button>
    </span>,
  ];
  const author = searchedFriends && <a>{searchedFriends.nickname}</a>;
  const avatar = searchedFriends && (
    <Avatar
      src={
        searchedFriends.portrait &&
        `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${searchedFriends.portrait}`
      }
    >
      {!searchedFriends.portrait && searchedFriends.nickname.split("")[0]}
    </Avatar>
  );
  const content = searchedFriends && (
    <p>
      {searchedFriends.introduction
        ? searchedFriends.introduction
        : "자기소개글이 없습니다."}
    </p>
  );

  return (
    <>
      <Modal
        key="addFriends"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>친구 추가</Title>
          </div>
        }
        visible={addVisible}
        onOk={addHandleOk}
        bodyStyle={{
          padding: 0,
          borderTop: "#000000 solid 1px",
          borderBottom: "#000000 solid 1px",
        }}
        onCancel={addHandleCancel}
        centered={true}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={addHandleCancel}
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
              style={{ display: "none" }}
            >
              <strong>친구 요청</strong>
            </Button>
          </div>,
        ]}
      >
        <Content>
          <Row>
            <Form {...formItemLayout} style={{ marginTop: 15 }}>
              <Form.Item label={<strong>이메일</strong>}>
                <Col span={24}>
                  <Search
                    style={{ width: "100%" }}
                    placeholder="이메일을 검색하세요"
                    enterButton="검색"
                    loading={Add_Modal_isSearchingFriends}
                    value={email}
                    onChange={handleSearch}
                    onSearch={handleSearchOk}
                  />
                </Col>
              </Form.Item>
              {searchedFriends && (
                <Col span={24}>
                  <Comment
                    style={{ marginLeft: 10 }}
                    actions={actions}
                    author={author}
                    avatar={avatar}
                    content={content}
                  />
                </Col>
              )}
            </Form>
            <Divider
              style={{ border: "#000000 solid 1px", marginBottom: 10 }}
            />
            <Col span={24} style={{ textAlign: "center" }}>
              <Text>
                <strong>내가 추가한 친구목록</strong>
              </Text>
              <Divider style={{ border: "#000000 solid 1px", marginTop: 10 }} />
            </Col>
            {!addedFriends ? (
              <Col span={24} style={{ margin: 3 }}>
                <Empty
                  description={
                    <span>
                      <strong>
                        친구가 없습니다.
                        <br />
                        친구를 추가해 주세요
                      </strong>
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

export default addFriends;
