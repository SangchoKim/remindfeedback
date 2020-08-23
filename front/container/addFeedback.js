import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Icon from "@ant-design/icons";
import {
  Modal,
  Layout,
  Form,
  Input,
  Tooltip,
  Menu,
  Button,
  Col,
  Typography,
  DatePicker,
  Select,
  Comment,
  Avatar,
  AutoComplete,
} from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { subjectBtn, feedbackItemLayout, formItemLayout } from "../css/Main";
import {
  FEEDBACK_ADD_REQUEST,
  FEEDBACK_UPDATE_REQUEST,
} from "../reducers/feedback";
import { FRIENDS_ADD_SEARCH_REQUEST } from "../reducers/friends";

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

const addFeedback = ({
  visible,
  handleCancel,
  handleOk,
  feedback_titles,
  feedback_adviser_uid,
  feedback_write_date,
  category_titles,
  order,
  feedback_id,
}) => {
  const dispatch = useDispatch();
  const {
    isAdddingFeedback,
    isAddedFeedback,
    isUpdatingFeedback,
  } = useSelector((state) => state.feedback);
  const { searchedFriends, registerdFriends } = useSelector(
    (state) => state.friends
  );

  const { subject } = useSelector((state) => state.feedbackSubject);

  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [write_date, setWrite_date] = useState(moment());
  const [adviser, setAdvisor] = useState("");
  const [check, setCheck] = useState(false);
  const [emailList, setEmailList] = useState([]);

  const _onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!title) {
        return alert("피드백 제목을 입력해 주세요");
      }
      if (!write_date) {
        return alert("피드백 날짜를 선택해 주세요");
      }

      if (FEEDBACK_UPDATE_REQUEST === order) {
        const category =
          (await subject) &&
          subject.findIndex((v, i) => v.category_title === category_titles);
        await dispatch({
          type: FEEDBACK_UPDATE_REQUEST,
          data: {
            category,
            title,
            write_date,
            adviser,
            feedback_id,
          },
        });
      } else if (FEEDBACK_ADD_REQUEST === order) {
        let advisers = "";
        if (adviser) {
          advisers = registerdFriends.find((v, i) => v.email === adviser)
            .user_uid;
          if (!advisers) {
            return alert("조언자를 다시 등록해 주시기 바랍니다.");
          }
        }
        dispatch({
          type: FEEDBACK_ADD_REQUEST,
          data: {
            category,
            title,
            write_date,
            adviser: advisers,
          },
        });
      }
    },
    [category, title, write_date, adviser]
  );

  const handleSubject = (value) => {
    setCategory(value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleData = (e) => {
    if (e !== null) {
      setWrite_date(e._d);
    }
  };

  const handleAdvisor = (e) => {
    setAdvisor(e.target.value);
  };

  const handleSearch = (v) => {
    setAdvisor(v);
  };

  const registerAdvisor = (e) => {
    setAdvisor(e.target.name);
    setCheck(false);
  };

  const handleSearchOk = () => {
    if (!adviser) {
      return alert("조언자의 이메일을 입력하세요");
    }
    const email = adviser;
    dispatch({
      type: FRIENDS_ADD_SEARCH_REQUEST,
      data: {
        email,
      },
    });
    setAdvisor("");
    setCheck(true);
  };

  useEffect(() => {
    if (!registerdFriends) {
      setEmailList(["조언자가 없습니다."]);
    } else {
      setEmailList(registerdFriends.map((v, i) => v.email));
    }
  }, [registerdFriends && registerdFriends]);

  useEffect(() => {
    if (isAddedFeedback) {
      setCategory("");
      setAdvisor("");
      setTitle("");
      setWrite_date(null);
      handleCancel();
    }
  }, [isAdddingFeedback && isAdddingFeedback]);

  useEffect(() => {
    if (
      feedback_titles ||
      category_titles ||
      feedback_adviser_uid ||
      feedback_write_date
    ) {
      if (order === FEEDBACK_UPDATE_REQUEST) {
        setTitle(feedback_titles);
        setCategory(category_titles);
        setAdvisor(feedback_adviser_uid);
        setWrite_date(feedback_write_date);
      }
    }
  }, [
    feedback_titles,
    category_titles,
    feedback_adviser_uid,
    feedback_write_date,
  ]);

  const feedback_dateInfo = (
    <strong>피드백의 만료 날짜를 선택해 주세요.</strong>
  );
  const feedback_advisorInfo = order && (
    <strong>피드백을 통해 조언을 받고 싶은 조언자를 검색해주세요</strong>
  );

  return (
    <>
      <Modal
        key="addFeedback"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>
              {order === FEEDBACK_UPDATE_REQUEST
                ? "수정할 피드백"
                : "새로운 피드백"}
            </Title>
          </div>
        }
        visible={visible}
        onOk={handleOk}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={handleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            <Button
              key="submit"
              type="primary"
              size="large"
              style={{ width: "100%" }}
              onClick={_onSubmit}
              loading={
                isUpdatingFeedback ? isUpdatingFeedback : isAdddingFeedback
              }
            >
              {order === FEEDBACK_UPDATE_REQUEST ? (
                <strong>피드백 수정</strong>
              ) : (
                <strong>피드백 생성</strong>
              )}
            </Button>
          </div>,
        ]}
        onCancel={handleCancel}
        centered={true}
      >
        <Content style={backgroundWhite}>
          <Form {...feedbackItemLayout}>
            {subject && subject.length >= 1 && (
              <Form.Item label={<strong>주제선택</strong>}>
                <Col span={24}>
                  <Select
                    value={category ? category : subject[0].category_title}
                    onChange={handleSubject}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {subject ? (
                      subject.length >= 1 &&
                      subject.map((v, i) => (
                        <Select.Option
                          key={v.category_id}
                          value={v.category_id}
                          style={{ color: v.category_color }}
                        >
                          <strong>{v.category_title}</strong>
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option
                        value="default"
                        style={{ color: "#FFFFFF" }}
                      >
                        <strong>Default</strong>
                      </Select.Option>
                    )}
                  </Select>
                </Col>
              </Form.Item>
            )}
            {
              <Form.Item label={<strong>제목</strong>}>
                <Col span={24}>
                  <Input
                    onChange={handleTitle}
                    value={title}
                    suffix={
                      <Icon type="form" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="피드백 제목"
                    required
                  />
                </Col>
              </Form.Item>
            }
            {
              <Form.Item
                label={
                  <>
                    <Tooltip title={feedback_dateInfo}>
                      <Icon type="question-circle" />
                    </Tooltip>
                    <strong>만료날짜</strong>
                  </>
                }
              >
                <Col span={24} style={{ width: "100%" }}>
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={handleData}
                    placeholder="날짜 선택"
                    value={write_date ? moment(write_date) : write_date}
                  />
                </Col>
              </Form.Item>
            }
            {
              <Form.Item
                label={
                  <>
                    <Tooltip title={feedback_advisorInfo}>
                      <Icon type="question-circle" />
                    </Tooltip>
                    <strong>조언자</strong>
                  </>
                }
              >
                <Col span={24}>
                  <AutoComplete
                    placeholder="조언자 이메일을 입력하세요"
                    enterButton="검색"
                    size="large"
                    dataSource={emailList}
                    style={{ width: "100%" }}
                    onSelect={handleSearch}
                    // onSearch={handleSearchOk}
                    filterOption={(inputValue, option) =>
                      option.props.children
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  ></AutoComplete>
                </Col>
              </Form.Item>
            }
          </Form>
        </Content>
      </Modal>
    </>
  );
};

export default addFeedback;
