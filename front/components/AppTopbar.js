import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@ant-design/icons";
import {
  Menu,
  Input,
  Typography,
  Dropdown,
  Col,
  Row,
  Button,
  Avatar,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import AppTutorial from "../components/TutorialMain";
import AppAlert from "../container/alert";
import { FEEDBACK_READ_REQUEST, MOVE_TO_HOME } from "../reducers/feedback";
import { FEEDBACK_SUB_READ_REQUEST } from "../reducers/feedbackSubject";
import { FEEDBACK_MODE } from "../reducers/feedbackMode";
import {
  LOG_OUT_REQUEST,
  FEEDBACK_TUTORIAL_REQUEST,
  INITALS_STATE,
} from "../reducers/user";
import Router from "next/router";

const { Title, Paragraph, Text } = Typography;

const { Search } = Input;

const icon = {
  float: "right",
  textAlign: "center",
};

const commonStyle = {
  color: "#ffffff",
  fontSize: 25,
};

const AppTopbar = () => {
  const dispatch = useDispatch();
  const { me, isLogout } = useSelector((state) => state.user);
  const { switchMode, feedback, isLoadedFeedback } = useSelector(
    (state) => state.feedback
  );
  const { subject } = useSelector((state) => state.feedbackSubject);
  const { feedbackMode } = useSelector((state) => state.feedbackMode);
  const [visible, setVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [firstSubject, setFirstSubject] = useState("첫번째 피드백");
  const [current, setCurrent] = useState(0);
  const [visiblePaner, setVisiblePaner] = useState(false);

  useEffect(() => {
    if (!me.tutorial) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isLogout) {
      Router.push("/login");
    }
  }, [isLogout && isLogout]);

  const next = () => {
    const currents = current + 1;
    setCurrent(currents);
    setVisiblePaner(true);
  };

  const prev = () => {
    const currents = current - 1;
    setCurrent(currents);
    setVisiblePaner(true);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({
      type: FEEDBACK_TUTORIAL_REQUEST,
      data: me.email,
    });
    setVisible(false);
  };

  const handleSetFirstSubject = (e) => {
    setFirstSubject(e.target.value);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    dispatch({
      type: INITALS_STATE,
      data: "isLoadedSubject",
    });
    dispatch({
      type: INITALS_STATE,
      data: "isLoadedFeedback",
    });
  };

  const handleAlert = () => {
    console.log("handleAlert");
    alert("추후 업데이트 될 예정입니다.");
    // 추후 업데이트 예정
    // setAlertVisible(!alertVisible);
  };

  const alerthHandleCancel = () => {
    console.log("alerthHandleCancel");
    setAlertVisible(false);
  };

  const alerthHandleOk = () => {
    console.log("alerthHandleOk");
    setAlertVisible(false);
  };

  const handleSetting = () => {
    console.log("handleSetting");
    alert("추후 업데이트 될 예정입니다.");
    // 추후 업데이트 예정
  };

  const secondHandleFunction = (current) => {};

  const handleHome = () => {
    const feedbackModes = false;
    const lastId = 0;

    dispatch({
      type: FEEDBACK_READ_REQUEST,
      data: {
        lastId,
        feedbackModes,
      },
    });

    dispatch({
      type: FEEDBACK_SUB_READ_REQUEST,
    });

    dispatch({
      type: MOVE_TO_HOME,
      data: true,
    });
    Router.push("/main");
  };

  const items = (
    <div>
      <Menu style={{ border: "gray solid 1px" }}>
        <Menu.Item key="1">
          <Icon type="user" />
          <strong>마이페이지</strong>
          <Link href="/mypage">
            <a>></a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2" onClick={showModal}>
          <Icon type="book" />
          <strong>튜토리얼</strong>
        </Menu.Item>
        <Menu.Item key="3" onClick={handleLogout}>
          <Icon type="logout" />
          <strong>로그아웃</strong>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <Menu
        mode="horizontal"
        key="topbar"
        style={{ backgroundColor: "#0B4E92" }}
      >
        <Menu.Item key="home" onClick={handleHome}>
          <Icon type="home" style={{ fontSize: "23px", color: "#FFFFFF" }} />
        </Menu.Item>
        {/* <Menu.Item key="search" style >
                <Search
                    placeholder="input search text"
                    style={{ width: 250 }}
                /> 
            </Menu.Item> */}
        <Menu.Item
          key="subject"
          style={{ textAlign: "center", marginLeft: "40%" }}
        >
          <Row type="flex">
            <Col span={22}>
              <Typography>
                <Title style={commonStyle}>RemindFeedBack</Title>
              </Typography>
            </Col>
          </Row>
        </Menu.Item>
        <Menu.Item key="icon" style={icon}>
          <Row type="flex" gutter={30}>
            <Col span={8}>
              <Button
                onClick={handleAlert}
                shape="circle"
                ghost={true}
                style={{ border: "none" }}
              >
                <Icon type="bell" style={{ fontSize: "23px" }} />
              </Button>
              <AppAlert
                alerthHandleCancel={alerthHandleCancel}
                alerthHandleOk={alerthHandleOk}
                alertVisible={alertVisible}
              />
            </Col>
            <Col span={8}>
              <Dropdown overlay={items} trigger={["click"]}>
                <div>
                  <Button
                    shape="circle"
                    style={{ background: "gray", border: "none" }}
                  >
                    <Avatar
                      src={
                        me.portrait &&
                        `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${me.portrait}`
                      }
                    >
                      {!me.portrait && me.nickname.split("")[0]}
                    </Avatar>
                  </Button>
                </div>
              </Dropdown>
            </Col>
            <Col span={8}>
              <Button
                shape="circle"
                ghost={true}
                style={{ border: "none" }}
                onClick={handleSetting}
              >
                <Icon type="setting" style={{ fontSize: "23px" }} />
              </Button>
            </Col>
          </Row>
        </Menu.Item>
      </Menu>

      <div>
        <AppTutorial
          next={next}
          current={current}
          handleCancel={handleCancel}
          handleOk={handleOk}
          visible={visible}
          firstSubject={firstSubject}
          secondHandleFunction={secondHandleFunction}
          handleSetFirstSubject={handleSetFirstSubject}
          handleStart={handleOk}
          secondTitle={"주제선정"}
          thirdTitle={"피드백기능"}
          thirdSubTitle={""}
          fourthTitle={"조언자기능"}
          fourthSubTitle={"변경할 비밀번호 입력하기"}
          secondSubTitle={""}
          secondSubPlaceHolder={""}
          firstContentTitle={
            "Remind Feedback에 오신 여러분들을 진심으로 환영합니다."
          }
          secondContentTitle={
            "피드백에 알맞은 주제를 선정하여, 쉽고 편하게 피드백을 관리하세요."
          }
          thirdContentTitle={
            "제목,날짜,조언자,주제를 선택하여, 나만의 피드백을 만들어보세요."
          }
          fourthContentTitle={
            "나만의 조언자를 등록하여 다양한 의견들을 공유해 보세요."
          }
          thirdSubPlaceHolder={""}
          thirdSub2_PlaceHolder={""}
          visiblePaner={visiblePaner}
          code={true}
          prev={prev}
        />
      </div>
      <div></div>
    </>
  );
};

export default AppTopbar;
