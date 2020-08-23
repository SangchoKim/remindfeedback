import React, { useState } from "react";
import Icon from "@ant-design/icons";
import { Menu, Button, Row, Modal, Col } from "antd";
import CheckPassword from "../container/checkPassword";
import Link from "next/link";
const { SubMenu } = Menu;
import { useDispatch, useSelector } from "react-redux";
import { UNREGISTER_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import AppTutorial from "../components/TutorialMain";

const newFeedBack = {
  fontSize: 17,
  fontWeight: "bold",
};

const Sidebar = {
  margin: 7,
  padding: 5,
};

const AppMypageSidebar = () => {
  const dispatch = useDispatch();

  const [buttonNumber, setButtonNumber] = useState("1");
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [firstSubject, setFirstSubject] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [visiblePaner, setVisiblePaner] = useState(false);

  const PopupUpdatePassword = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handeleButton = (e) => {
    console.log(e.key);
    if (e.key === "2") {
      PopupUpdatePassword();
    } else if (e.key === "3") {
      //회원탈퇴
      confirm("정말로 탈퇴하시겠습니까?") &&
        dispatch({
          type: UNREGISTER_REQUEST,
        });
      dispatch({
        type: LOG_OUT_REQUEST,
      });
    }
    setButtonNumber(e.key);
  };

  // 비밀번호 변경
  const next = () => {
    const currents = current + 1;
    setCurrent(currents);
    setVisiblePaner(false);
  };

  const handleStart = () => {
    setVisible(false);
    setFirstSubject("");
    setCurrent(0);
  };

  const handleCancel = () => {
    if (current === 3) {
      setVisible(false);
      setFirstSubject("");
      setCurrent(0);
      return;
    }

    if (window.confirm("나가시면 처음부터 시작하셔야 합니다.")) {
      setVisible(false);
      setFirstSubject("");
      setCurrent(0);
      setButtonNumber("1");
    }
  };

  const handleFindPw = async (e) => {
    await dispatch({
      type: MOVE_TO_SIGNUP,
    });
    setVisible(true);
  };

  const handleSetEmail = (e) => {
    setFirstSubject(e.target.value);
  };

  const handleSetNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmitEamil = (current) => {
    if (!firstSubject) {
      return alert("먼저 해당 내용을 입력해주세요~");
    }

    if (current === 1) {
      // 이메일 보내기
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
        data: {
          current,
          email: firstSubject,
        },
      });
    } else if (current === 2) {
      // 토큰 보내기
      if (!newPassword) {
        return alert("먼저 해당 내용을 입력해주세요~");
      }

      const newPasswords = CryptoJS(password + process.env.PASSWORD).toString();
      // 변경할 비밀번호 보내기
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
        data: {
          current,
          token: firstSubject,
          password: newPasswords,
        },
      });
    } else {
      console.error("에러발생");
    }
    setFirstSubject("");
    setNewPassword("");
  };

  return (
    <>
      <Col span={24} style={Sidebar}>
        <Menu
          theme="light"
          style={{
            width: "100%",
            borderRight: "2px solid black",
            height: "100%",
          }}
          selectedKeys={[buttonNumber]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
        >
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
                <span style={{ color: "black", fontWeight: "bold" }}>
                  마이페이지
                </span>
              </span>
            }
          >
            <Menu.Item key="1" onClick={handeleButton}>
              <Icon type="edit" />내 정보 수정
              <Link href="/mypage" key="1">
                <a></a>
              </Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={handeleButton}>
              <Icon type="lock" />
              비밀번호 변경
            </Menu.Item>
            <Menu.Item key="3" onClick={handeleButton}>
              <Icon type="api" />
              회원 탈퇴
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
      <AppTutorial
        next={next}
        current={current}
        handleStart={handleStart}
        handleCancel={handleCancel}
        handleOk={handleFindPw}
        visible={visible}
        firstSubject={firstSubject}
        handleSetFirstSubject={handleSetEmail}
        newPassword={newPassword}
        handleSetNewPassword={handleSetNewPassword}
        secondHandleFunction={handleSubmitEamil}
        secondTitle={"이메일 확인"}
        thirdTitle={"토큰 확인"}
        thirdSubTitle={"토큰 입력하기 & 변경할 비밀번호 입력하기"}
        fourthTitle={"완료"}
        fourthSubTitle={"변경할 비밀번호 입력하기"}
        secondSubTitle={"이메일 입력하기"}
        secondSubPlaceHolder={"이메일을 입력해주세요"}
        firstContentTitle={"Remind Feedback 비밀번호 찾기를 시작합니다."}
        secondContentTitle={"등록하신 이메일을 입력해주세요."}
        thirdContentTitle={"이메일에서 받으신 내용을 입력해주세요"}
        fourthContentTitle={"비밀번호가 정상적으로 변경되었습니다."}
        thirdSubPlaceHolder={"이메일에서 받으신 내용을 입력해주세요"}
        thirdSub2_PlaceHolder={"변경하실 비밀번호를 입력해주세요"}
        code={false}
        visiblePaner={visiblePaner}
      />
    </>
  );
};

export default AppMypageSidebar;
