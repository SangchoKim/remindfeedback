import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Alert,
} from "antd";
import { layoutCenter, LoginFormRow } from "../css/Common";
import { signUpBtn, shadowBorder, SignUpFormCol } from "../css/Signup";
import Router from "next/router";
import Link from "next/link";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { MOVE_TO_SIGNUP } from "../reducers/user";
import { CHECK_EMAIL_REQUEST } from "../reducers/user";
import CryptoJS from "crypto-js/sha256";
import Term from "../components/Term";
import { FirstTerm, SecondTerm } from "../constant/Term";
import { makeGridSize } from "../css/responsive/_respondTo";
import CustomButton from "../components/CustomButton";

const { Title, Text } = Typography;

const signup = () => {
  const dispatch = useDispatch();
  const {
    isSigningUp,
    me,
    isSignedUp,
    hasMessage,
    success,
    message,
  } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstTerm, setFristTerm] = useState(false);
  const [secondTerm, setSecondTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");

  const handleAuthEmail = () => {
    if (!email) {
      return alert("이메일을 기입하세요");
    }
    // 이메일 보내기
    dispatch({
      type: CHECK_EMAIL_REQUEST,
      data: {
        email,
      },
    });
  };

  const onChangeSetToken = (e) => {
    setToken(e.target.value);
  };
  const onChangeSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeSetNickName = (e) => {
    setNickname(e.target.value);
  };
  const onChangeSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeSetRePassword = (e) => {
    setRe_password(e.target.value);
  };

  const showDrawer = (id) => {
    if (id === 1) {
      setTitle("서비스 이용약관");
      setDescription(id);
    } else {
      setTitle("개인 정보 수집 및 이용동의");
      setDescription(id);
    }

    setDrawer(true);
  };

  const onClose = (stuats) => {
    if (stuats === "firstChecked") {
      setTermError(false);
      setFristTerm(true);
    }

    if (stuats === "secondChecked") {
      setTermError(false);
      setSecondTerm(true);
    }

    setDrawer(false);
  };

  const emailForm = (
    <div>
      <label htmlFor="user-email">이메일</label>
      <div>
        {/* 인풋 공통으로 빼기 */}
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onChangeSetEmail}
          suffix={<Icon type="smile" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="이메일을 기입해주세요"
          required
        />

        {/* 버튼 공통으로 뺴기 */}

        <Button onClick={handleAuthEmail} type="dashed">
          이메일 인증
        </Button>
      </div>
    </div>
  );

  const TokenInput = (
    <div>
      <label htmlFor="user-nickname">인증코드</label>
      <div>
        <Input
          type="text"
          name="tokenNum"
          value={token}
          onChange={onChangeSetToken}
          placeholder="인증코드를 입력해주세요"
          required
        />
      </div>
    </div>
  );
  const nicknameForm = (
    <div>
      <label htmlFor="user-nickname">닉네임</label>
      <div>
        <Input
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChangeSetNickName}
          suffix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="닉네임을 입력해주세요"
          required
        />
      </div>
    </div>
  );
  const passwordForm = (
    <div>
      <label htmlFor="user-password">비밀번호</label>
      <div>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChangeSetPassword}
          suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="최소 1개의 특수문자 + 영문 대소문자를 6 ~ 20자리 입력"
          required
        />
      </div>
    </div>
  );

  const re_passwordForm = (
    <div>
      <label htmlFor="user-re_password">비밀번호 재입력</label>
      <div>
        <Input
          type="password"
          name="re_password"
          value={re_password}
          onChange={onChangeSetRePassword}
          suffix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="비밀번호를 한번 더 입력해주세요"
          required
        />
      </div>
    </div>
  );

  const onChangeFirstTerm = () => {
    if (!firstTerm) {
      return alert("자세히보기를 클릭해주세요");
    }
  };

  const onChangeSecondTerm = () => {
    if (!secondTerm) {
      return alert("자세히보기를 클릭해주세요");
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message && message]);

  useEffect(() => {
    if (!hasMessage && isSignedUp) {
      alert(me.msg);
      dispatch({
        type: MOVE_TO_SIGNUP,
      });
      Router.push("/login");
    }
  }, [isSignedUp && isSignedUp]);

  useEffect(() => {
    if (hasMessage) {
      alert(me.msg);
      setEmail("");
      setNickname("");
      setPassword("");
      setRe_password("");
      setFristTerm(false);
      setSecondTerm(false);
      dispatch({
        type: MOVE_TO_SIGNUP,
      });
    }
  }, [hasMessage && hasMessage]);

  const isEmail = (email) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(email);
  };

  const isPassword = (password) => {
    const regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    return regExp.test(password);
  };

  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(token, email);
      if (!token) {
        alert("이메일 인증을 먼저 해주세요");

        setToken("");
        return;
      }
      if (!isEmail(email)) {
        alert("이메일 형식에 맞지 않습니다. 다시 입력해 주세요");
        setEmail("");
        return;
      }

      if (!isPassword(password)) {
        alert(
          "비밀번호는 최소 1개의 숫자 특수문자를 포함해야 하며 영문 대소문자를 6 ~ 20자리 입력해주세요"
        );
        setPassword("");
        setRe_password("");
        return;
      }

      if (password !== re_password) {
        alert("비밀번호가 다릅니다.");
        setPassword("");
        setRe_password("");
        return;
      }
      if (!firstTerm || !secondTerm) {
        alert("약관동의를 클릭해주세요");
        return setTermError(true);
      }

      const passwords = CryptoJS(password + process.env.PASSWORD).toString();

      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          email,
          password: passwords,
          nickname,
          token,
        },
      });
    },
    [email, password, nickname, firstTerm, re_password, token, secondTerm]
  );

  const gridSize = {
    first: makeGridSize(2, 4, 6, 8),
    second: makeGridSize(20, 16, 12, 10),
    third: makeGridSize(2, 4, 6, 8),
  };

  return (
    <LoginFormRow>
      <Col {...gridSize.first}></Col>
      <SignUpFormCol
        {...gridSize.second}
        range="10px 10px 5px grey"
        grid_templeate_row="0.1fr 1.5fr 0.1fr"
      >
        <Col>
          <Title>회원가입</Title>
          <Col>
            <Text className="test-bold">Remind Feedback</Text>
            <Text>
              에 오신 것을 환영합니다. <br /> 회원가입을 통해 서비스를 이용하실
              수 있습니다.
            </Text>
          </Col>
        </Col>
        <Form onSubmit={_onSubmit} className="signUp-form">
          {emailForm}
          {TokenInput}
          {nicknameForm}
          {passwordForm}
          {re_passwordForm}
          <Col
            span={24}
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "",
            }}
          >
            <Checkbox
              checked={firstTerm}
              style={{ fontWeight: "bold", flexGrow: 1 }}
              onChange={onChangeFirstTerm}
            >
              서비스 이용약관 동의(필수)
            </Checkbox>
            <Button
              type="dashed"
              onClick={showDrawer.bind(this, 1)}
              style={{
                fontWeight: "bold",
              }}
            >
              자세히보기 <Icon type="right" />
            </Button>
          </Col>
          <Col
            span={24}
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "",
            }}
          >
            <Checkbox
              checked={secondTerm}
              style={{ fontWeight: "bold", flexGrow: 1 }}
              onChange={onChangeSecondTerm}
            >
              개인 정보 수집 및 이용 동의(필수)
            </Checkbox>
            <Button
              type="dashed"
              onClick={showDrawer.bind(this, 2)}
              style={{
                fontWeight: "bold",
              }}
            >
              자세히보기 <Icon type="right" />
            </Button>
          </Col>
          <Col span={24} style={{ marginTop: 15 }}>
            <Button
              size="large"
              htmlType="submit"
              className="signup-form-button"
              style={signUpBtn}
              loading={isSigningUp}
            >
              회원가입
            </Button>
          </Col>
        </Form>
        <Col span={24} style={{ marginTop: 15, textAlign: "center" }}>
          <span>계정을 이미 가지고 있으신가요? </span>
          <Link href="/login">
            <a>
              <strong>로그인</strong>
            </a>
          </Link>
        </Col>

        <CustomButton color="blueviolet" outline>
          Test
        </CustomButton>
      </SignUpFormCol>
      <Col {...gridSize.third}></Col>
      <Term
        onClose={onClose}
        drawer={drawer}
        title={title}
        description={
          description === 1 ? (
            <FirstTerm handleFirstTerm={onClose.bind(this, "firstChecked")} />
          ) : (
            <SecondTerm
              handleSeocndTerm={onClose.bind(this, "secondChecked")}
            />
          )
        }
      />
    </LoginFormRow>
  );
};

export default signup;
