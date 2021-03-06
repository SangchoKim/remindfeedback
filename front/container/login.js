import React, { useState, useCallback, useEffect, useRef } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Input, Button, Typography } from "antd";
import { LoginFormRow } from "../css/Common";
import { LoginFormCol } from "../css/Login";

import Link from "next/link";
import logoImg from "../img/logo1.png";
import {
  LOG_IN_REQUEST,
  MOVE_TO_SIGNUP,
  INITALS_STATE,
} from "../reducers/user";
import { FEEDBACK_READ_REQUEST } from "../reducers/feedback";
import { FEEDBACK_SUB_READ_REQUEST } from "../reducers/feedbackSubject";
import { UPDATE_PASSWORD_REQUEST } from "../reducers/user";
import Router from "next/router";
import AppTutorial from "../components/TutorialMain";
import CryptoJS from "crypto-js/sha256";
import { makeGridSize } from "../css/responsive/_respondTo";
import CustomButton from "../components/CustomButton";

const { Text } = Typography;

const login = () => {
  const dispatch = useDispatch();
  const emailInput = useRef();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);
  const [firstSubject, setFirstSubject] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [current, setCurrent] = useState(0);
  const [visiblePaner, setVisiblePaner] = useState(false);

  const {
    me,
    isLoggedIn,
    isLoggingIn,
    message,
    hasMessage,
    success,
    isLogout,
  } = useSelector((state) => state.user);
  const { isLoadedFeedback } = useSelector((state) => state.feedback);
  const { isLoadedSubject } = useSelector((state) => state.feedbackSubject);
  const { feedbackMode } = useSelector((state) => state.feedbackMode);

  const _onsubmit = useCallback(
    (e) => {
      e.preventDefault();

      const passwords = CryptoJS(password + process.env.PASSWORD).toString();

      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          email,
          password: passwords,
        },
      });
    },
    [email, password]
  );

  useEffect(() => {
    if (isLogout) {
      window.location.reload(true);
      dispatch({
        type: MOVE_TO_SIGNUP,
      });
    }
  }, [isLogout && isLogout]);

  useEffect(() => {
    const feedbackModes = feedbackMode;
    const lastId = 0;

    if (isLoggedIn && me) {
      dispatch({
        type: INITALS_STATE,
        data: "isLoggedIn",
      });

      dispatch({
        type: FEEDBACK_READ_REQUEST,
        data: {
          feedbackModes,
          lastId,
        },
      });
      dispatch({
        type: FEEDBACK_SUB_READ_REQUEST,
      });
    }
  }, [isLoggedIn && isLoggedIn]);

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    if (isLoadedFeedback && isLoadedSubject) {
      Router.push("/main");
    }
  }, [isLoadedFeedback, isLoadedSubject]);

  useEffect(() => {
    if (hasMessage) {
      alert(me.msg);
      dispatch({
        type: MOVE_TO_SIGNUP,
      });
    }
  }, [hasMessage && hasMessage]);

  useEffect(() => {
    if (success) {
      setVisiblePaner(true);
    }
    if (message) {
      alert(message);
    }

    dispatch({
      type: MOVE_TO_SIGNUP,
    });
  }, [message && message]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    await dispatch({
      type: MOVE_TO_SIGNUP,
    });
    await Router.push("/signup");
  };

  const handleFindPw = async (e) => {
    await dispatch({
      type: MOVE_TO_SIGNUP,
    });
    setVisible(true);
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
    }
  };

  const handleStart = () => {
    setVisible(false);
    setFirstSubject("");
    setCurrent(0);
  };

  const handleSetEmail = (e) => {
    setFirstSubject(e.target.value);
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

  const next = () => {
    const currents = current + 1;
    setCurrent(currents);
    setVisiblePaner(false);
  };

  const handleSetNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const gridSize = {
    first: makeGridSize(3, 6, 9, 9),
    second: makeGridSize(18, 12, 6, 6),
    third: makeGridSize(3, 6, 9, 9),
  };

  return (
    <>
      <LoginFormRow>
        <Col {...gridSize.first}></Col>
        <LoginFormCol
          {...gridSize.second}
          range="10px 10px 5px grey"
          grid_templeate_row="0.5fr 1fr 0.5fr"
        >
          <Col>
            <img src={logoImg} />
            <Text>
              <strong>RemindFeedback</strong>
            </Text>
          </Col>
          <Form onSubmit={_onsubmit} className="login-form">
            <Col>
              <label htmlFor="user-email">
                <strong>이메일</strong>
              </label>
              <Form.Item>
                <Input
                  ref={emailInput}
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </Form.Item>
            </Col>
            <Col>
              <label htmlFor="user-password">
                <strong>비밀번호</strong>
              </label>
              <Form.Item>
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </Form.Item>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
                loading={isLoggingIn}
              >
                <strong>로그인</strong>
              </Button>
            </Col>
            <hr />
            {/* <Form.Item style={{textAlign:'center'}}>
                            <Col span={24}>
                                <Button type="danger" size="large" htmlType="submit" className="login-form-button" style={loginApple} icon="apple">
                                       <strong>Log in with Apple</strong> 
                                </Button>
                           </Col>
                           <Col span={24}>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button" style={loginGoogle} icon="google">
                                    <strong>Log in with Google</strong> 
                                </Button>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button" style={loginKakao}>
                                    <strong>Log in with kakao</strong> 
                                </Button>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button" style={loginFacebook} icon="facebook">
                                    <strong>Log in with Facebook</strong> 
                                </Button>
                            </Col>
                       </Form.Item> */}
          </Form>
          <Col>
            <Text>계정이 없으신가요?</Text>
            <Button type="ghost" onClick={handleSignUp}>
              <strong>시작하기</strong>
            </Button>
            <span>비밀번호를 잊으셨나요?</span>
            <Button type="ghost" onClick={handleFindPw}>
              <strong>비밀번호 찾기</strong>
            </Button>
          </Col>
        </LoginFormCol>
        <Col {...gridSize.third}></Col>
      </LoginFormRow>
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

export default login;
