import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Button,
  Card,
  Avatar,
  Popover,
  Popconfirm,
  Empty,
  AutoComplete,
} from "antd";
import AddFriends from "../container/addFriends";
import RequestFriends from "../container/requestFriends";
import ProfileFriends from "../components/ProfileFriends";
import BlockedFriends from "../container/blockedFriends";
import {
  FRIENDS_MAIN_SEARCH_REQUEST,
  FRIENDS_BLOCK_READ_REQUEST,
  FRIENDS_ADD_READ_REQUEST,
  FRIENDS_BLOCK_REQUEST,
  FRIENDS_RQ_READ_REQUEST,
  FRIENDS_MAIN_READ_REQUEST,
  FRIENDS_SEARCH_LOCAL,
  FRIENDS_ARRANGE_DATE,
} from "../reducers/friends";

const ButtonGroup = Button.Group;
const { Meta } = Card;
const { Search } = Input;

const Friends = () => {
  const dispatch = useDispatch();
  const {
    registerdFriends,
    message,
    Add_Modal_isLoadingFriends,
    RQ_Modal_isLoadingFriends,
    RQ_Modal_isAddedFriends,
  } = useSelector((state) => state.friends);

  const [addVisible, setAddVisible] = useState(false);
  const [requestVisible, setRequestVisible] = useState(false);
  const [blockedVisible, setBlockedVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePortrait, setProfilePortrait] = useState("");
  const [profileIntro, setProfileIntro] = useState("");
  const [nickNameList, setNicknameList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState("");
  const [blockFriend, setBlockFriend] = useState(false);
  const [blockCheck, setBlockCheck] = useState(false);
  const [user_uid, setUser_uid] = useState("");

  useEffect(() => {
    if (RQ_Modal_isAddedFriends) {
      dispatch({
        type: FRIENDS_MAIN_READ_REQUEST,
      });
    }
  }, [RQ_Modal_isAddedFriends && RQ_Modal_isAddedFriends]);

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message && message]);

  useEffect(() => {
    if (registerdFriends) {
      setNicknameList(registerdFriends.map((v, i) => v.nickname));
    }
  }, [registerdFriends && registerdFriends]);

  useEffect(() => {
    return () => {
      dispatch({
        type: FRIENDS_ARRANGE_DATE,
      });
    };
  }, []);

  // 친구 차단 하기
  const handleConfirm = useCallback(() => {
    const friend_id = registerdFriends.find((v, i) => v.user_uid === id).id;
    dispatch({
      type: FRIENDS_BLOCK_REQUEST,
      data: {
        friend_uid: id,
        friend_id,
      },
    });
    setBlockFriend(false);
    setBlockCheck(false);
  }, [id]);

  const handleBlockCancel = () => {
    setBlockFriend(false);
  };

  const handleBlock = (e) => {
    setId(e.target.name);
    setBlockFriend(true);
  };

  // 친구 차단 목록 보기
  const PopupBlockeFriends = async () => {
    await dispatch({
      type: FRIENDS_BLOCK_READ_REQUEST,
    });
    await setBlockedVisible(true);
  };

  const blockedHandleOk = () => {
    setBlockedVisible(false);
  };

  const blockedHandleCancel = () => {
    setBlockedVisible(false);
  };

  // 친구 추가
  const PopupAddFriends = async () => {
    await dispatch({
      type: FRIENDS_ADD_READ_REQUEST,
    });
    await setAddVisible(true);
  };

  const addHandleOk = () => {
    setAddVisible(false);
  };

  const addHandleCancel = () => {
    setAddVisible(false);
  };

  // 친구 요청
  const PopupRequestFriends = async () => {
    await dispatch({
      type: FRIENDS_RQ_READ_REQUEST,
    });
    await setRequestVisible(true);
  };

  const requestHandleOk = () => {
    setRequestVisible(false);
  };

  const requestHandleCancel = () => {
    setRequestVisible(false);
  };

  // 프로필 보기
  const PopupProfile = async (e) => {
    const { id } = e.target;

    const {
      email,
      nickname,
      portrait,
      introduction,
    } = await registerdFriends.find((v, i) => id === v.user_uid);
    setProfileName(nickname);
    setProfileEmail(email);
    setProfilePortrait(portrait);
    setProfileIntro(introduction);
    await setProfileVisible(true);
  };

  const profileHandleOk = () => {
    setProfileVisible(false);
  };

  const profileHandleCancel = () => {
    setProfileVisible(false);
  };

  const handleBlockCheck = (e) => {
    setBlockCheck(!blockCheck);
    if (e.target) {
      setUser_uid(e.target.name);
    }
  };

  // 친구 검색
  const handleSearch = useCallback((v) => {
    setSearchValue(v);
  }, []);

  const handleSelect = (v) => {
    setSearchValue(v);
  };

  const onClickSearch = () => {
    if (!searchValue) {
      dispatch({
        type: FRIENDS_MAIN_READ_REQUEST,
      });
    }

    dispatch({
      type: FRIENDS_SEARCH_LOCAL,
      data: searchValue,
    });
  };

  const Item =
    registerdFriends &&
    registerdFriends.map((v, i) => {
      return (
        <Card
          key={v.user_uid}
          extra={
            <Popover
              key={v.user_uid}
              title={v.nickname}
              onVisibleChange={handleBlockCheck}
              placement="rightBottom"
              overlayStyle={{ textAlign: "center" }}
              visible={user_uid === v.user_uid && blockCheck}
              content={
                <>
                  <div
                    id={v.user_uid}
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Popconfirm
                      onConfirm={handleConfirm}
                      title="정말로 차단하시겠습니까?"
                      okText="네"
                      cancelText="아니오"
                      onCancel={handleBlockCancel}
                      visible={blockFriend}
                    >
                      <Button
                        key="block"
                        type="danger"
                        name={v.user_uid}
                        onClick={handleBlock}
                        size="small"
                      >
                        차단
                      </Button>
                    </Popconfirm>
                  </div>
                </>
              }
              trigger="click"
            >
              <Button
                type="link"
                key={v.user_uid}
                name={v.user_uid}
                onClick={handleBlockCheck}
              >
                <Icon type="more" key={v.user_uid} />
              </Button>
            </Popover>
          }
        >
          <Meta
            avatar={
              <Button
                onClick={PopupProfile}
                shape="circle-outline"
                key={v.user_uid}
                id={v.user_uid}
                name={v.nickname}
              >
                <Avatar
                  src={
                    v.portrait &&
                    `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.portrait}`
                  }
                >
                  {!v.portrait && v.nickname.split("")[0]}
                </Avatar>
              </Button>
            }
            title={v.nickname}
            description={<p>{v.introduction}</p>}
          />
        </Card>
      );
    });

  return (
    <>
      <Row>
        <Col span={6}></Col>
        <Col span={12} style={{ marginTop: 20 }}>
          <Col span={24} style={{ textAlign: "right", marginBottom: 15 }}>
            <ButtonGroup>
              <Button
                type="primary"
                size="defalut"
                onClick={PopupAddFriends}
                loading={Add_Modal_isLoadingFriends}
              >
                <Icon type="plus" style={{ marginRight: 3 }}></Icon>
                <strong>추가 목록</strong>
              </Button>
              <Button
                type="primary"
                size="defalut"
                onClick={PopupRequestFriends}
                loading={RQ_Modal_isLoadingFriends}
              >
                <Icon type="shrink" style={{ marginRight: 3 }}></Icon>
                <strong>요청 목록</strong>
              </Button>
              <Button
                type="danger"
                size="defalut"
                onClick={PopupBlockeFriends}
                loading={RQ_Modal_isLoadingFriends}
              >
                <Icon type="close-circle" style={{ marginRight: 3 }}></Icon>
                <strong>차단 목록</strong>
              </Button>
            </ButtonGroup>
          </Col>
          <Col span={24} style={{ marginBottom: 15 }}>
            {!registerdFriends || registerdFriends.length < 1 ? (
              <Col span={24} style={{ marginTop: 30 }}>
                <Empty
                  description={
                    <span>
                      <strong>
                        친구가 없습니다.
                        <br />
                        친구를 등록해 주세요
                      </strong>
                    </span>
                  }
                />
              </Col>
            ) : (
              <AutoComplete
                placeholder="닉네임을 검색하세요"
                enterButton="검색"
                size="large"
                dataSource={nickNameList}
                style={{ width: "100%" }}
                onSelect={handleSelect}
                onSearch={handleSearch}
                filterOption={(inputValue, option) =>
                  option.props.children
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input
                  suffix={
                    <Button
                      className="search-btn"
                      style={{ marginRight: -12 }}
                      size="large"
                      type="primary"
                      onClick={onClickSearch}
                    >
                      <Icon type="search" />
                    </Button>
                  }
                />
              </AutoComplete>
            )}
          </Col>
          <Col span={24}>{registerdFriends && Item}</Col>
        </Col>
        <Col span={6}></Col>
      </Row>
      <div>
        <AddFriends
          addVisible={addVisible}
          addHandleOk={addHandleOk}
          addHandleCancel={addHandleCancel}
        />
      </div>
      <div>
        <RequestFriends
          requestVisible={requestVisible}
          requestHandleOk={requestHandleOk}
          requestHandleCancel={requestHandleCancel}
        />
      </div>
      <div>
        <BlockedFriends
          blockedVisible={blockedVisible}
          blockedHandleOk={blockedHandleOk}
          blockedHandleCancel={blockedHandleCancel}
        />
      </div>
      <div>
        <ProfileFriends
          profileVisible={profileVisible}
          profileHandleOk={profileHandleOk}
          profileHandleCancel={profileHandleCancel}
          profileName={profileName}
          profileIntro={profileIntro}
          profileEmail={profileEmail}
          profilePortrait={profilePortrait}
        />
      </div>
    </>
  );
};

export default Friends;
