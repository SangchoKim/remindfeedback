import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import { Col, Card, Avatar, Button, Empty, Popconfirm } from "antd";
import moment from "moment";
import {
  FEEDBACK_DELETE_REQUEST,
  FEEDBACK_UPDATE_REQUEST,
} from "../reducers/feedback";
import { FRIENDS_MAIN_READ_REQUEST } from "../reducers/friends";
import UpdateFeedback from "../container/addFeedback";
const { Meta } = Card;

const setFeedbackContents = ({ myFeedback, inProgress, categoryId }) => {
  const dispatch = useDispatch();
  const { subject } = useSelector((state) => state.feedbackSubject);
  const { isDeletingFeedback, isUpdatedFeedback } = useSelector(
    (state) => state.feedback
  );
  const { me } = useSelector((state) => state.user);

  const [feedback_id, setFeedback_id] = useState(0);
  const [feedback_title, setFeedback_title] = useState("");
  const [feedback_adviser_uid, setFeedback_adviser_uid] = useState(0);
  const [feedback_write_date, setFeedback_write_date] = useState("");
  const [category_title, setCategory_title] = useState("");
  const [category_id, setCategory_id] = useState(0);
  const [code, setCode] = useState(false);
  const [forall, setForall] = useState(false);
  const [filteredFeedback, setMyfeedback] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isUpdatedFeedback) {
      setVisible(false);
    }
  }, [isUpdatedFeedback && isUpdatedFeedback]);

  useEffect(() => {
    if (categoryId && myFeedback.length >= 1) {
      if (categoryId === "0") {
        setCategory_id(categoryId);
        if (forall) {
          setMyfeedback(
            myFeedback.filter((v, i) => parseInt(v.complete) === 2)
          );
          // setForall(false);
          return;
        } else {
          setMyfeedback(
            myFeedback.filter((v, i) => parseInt(v.complete) !== 2)
          );
          // setForall(true);
          return;
        }
      }

      setCategory_id(categoryId);
      if (inProgress) {
        //진행완료
        if (categoryId === category_id) {
          setMyfeedback(
            filteredFeedback.filter(
              (v, i) => parseInt(v.category) === parseInt(categoryId)
            )
          );
        } else {
          const r = myFeedback.filter(
            (v, i) => parseInt(v.category) === parseInt(categoryId)
          );
          const j = r.filter((v, i) => parseInt(v.complete) === 2);
          setMyfeedback(j);
        }
      } else {
        // 진행중
        if (categoryId === category_id) {
          setMyfeedback(
            filteredFeedback.filter(
              (v, i) => parseInt(v.category) === parseInt(categoryId)
            )
          );
        } else {
          const r = myFeedback.filter(
            (v, i) => parseInt(v.category) === parseInt(categoryId)
          );
          const j = r.filter((v, i) => parseInt(v.complete) !== 2);
          setMyfeedback(j);
          setCode(true);
        }
      }
    }
  }, [categoryId && categoryId, myFeedback && myFeedback]);

  useEffect(() => {
    if (myFeedback) {
      if (myFeedback.length >= 1) {
        if (category_id === "0") {
          if (inProgress) {
            setMyfeedback(
              myFeedback.filter((v, i) => parseInt(v.complete) === 2)
            );
            return;
          } else {
            setMyfeedback(
              myFeedback.filter((v, i) => parseInt(v.complete) !== 2)
            );
            return;
          }
        }

        if (inProgress) {
          //진행완료
          if (code) {
            const r = myFeedback.filter(
              (v, i) => parseInt(v.category) === parseInt(category_id)
            );
            const j = r.filter((v, i) => parseInt(v.complete) === 2);
            setMyfeedback(j);
          } else {
            setMyfeedback(
              myFeedback.filter((v, i) => parseInt(v.complete) === 2)
            );
          }

          setForall(true);
        } else {
          //진행중
          if (code) {
            const r = myFeedback.filter(
              (v, i) => parseInt(v.category) === parseInt(category_id)
            );
            const j = r.filter((v, i) => parseInt(v.complete) !== 2);
            setMyfeedback(j);
          } else {
            setMyfeedback(
              myFeedback.filter((v, i) => parseInt(v.complete) !== 2)
            );
          }
          setForall(false);
        }
      }
    }
  }, [inProgress && inProgress, myFeedback && myFeedback]);

  useEffect(() => {
    if (myFeedback) {
      if (myFeedback.length >= 1) {
        setMyfeedback(myFeedback.filter((v, i) => parseInt(v.complete) !== 2));
      }
    }
  }, [myFeedback && myFeedback]);

  const setColor = (val) => {
    const index = subject.findIndex(
      (v, i) => parseInt(v.category_id) === parseInt(val)
    );
    const color = subject[index].category_color;
    return color;
  };

  const handleDelete = () => {
    feedback_id &&
      dispatch({
        type: FEEDBACK_DELETE_REQUEST,
        feedback_id,
      });
  };

  const dDay = (createdAt, write_date) => {
    const c = moment(createdAt, "YYYY-MM-DD");
    const w = moment(write_date, "YYYY-MM-DD");
    const today = moment().format("YYYY-MM-DD");
    const diff = w.diff(c, "days");
    return w.diff(c, "days");
  };

  const handleConfirm = (e) => {
    setFeedback_id(e.target.id);
  };

  const showModal = async (e) => {
    e.preventDefault();
    dispatch({
      type: FRIENDS_MAIN_READ_REQUEST,
    });
    setFeedback_id(e.target.id);
    const [
      { adviser_uid, title, createdAt, category, myfeedback },
    ] = await myFeedback.filter(
      (v, i) => parseInt(e.target.id) === parseInt(v.id)
    );
    await setFeedback_adviser_uid(adviser_uid);
    await setFeedback_title(title);
    await setFeedback_write_date(createdAt);
    const [{ category_title }] = await subject.filter(
      (v, i) => v.category_id === category
    );
    await setCategory_title(category_title);
    await setVisible(true);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  return (
    <>
      {filteredFeedback.length >= 1 ? (
        filteredFeedback.map((v, i) => (
          <Card
            key={v.id}
            style={{ marginTop: 15, background: setColor(v.category) }}
            cover={
              <div>
                <div
                  style={{
                    background: "#DCDCDC",
                    fontSize: 12,
                    textAlign: "right",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    paddingRight: 15,
                  }}
                >
                  {moment(v.createdAt).format("YYYY MMMM Do")}
                </div>
                {v.complete === 1 && (
                  <Col
                    span={24}
                    style={{
                      background: "#DCDCDC",
                      fontSize: 12,
                      textAlign: "right",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      paddingRight: 15,
                    }}
                  >
                    <Col span={18} />
                    <Col
                      span={6}
                      style={{
                        color: "red",
                        backgroundColor: "white",
                        textAlign: "center",
                        borderRadius: 30,
                      }}
                    >
                      {v.complete === 1 && "요청중"}
                    </Col>
                  </Col>
                )}
              </div>
            }
            actions={[
              <Button
                disabled={v.complete >= 1 ? true : false}
                id={v.id}
                onClick={showModal}
                type="dashed"
              >
                <Icon type="edit" style={{ fontSize: "18px", color: "#08c" }} />
              </Button>,
              <Popconfirm
                key={v.id}
                title="정말로 삭제하시겠습니까?"
                onConfirm={handleDelete}
                okText="네"
                cancelText="아니오"
                loading={isDeletingFeedback}
              >
                <Button
                  disabled={v.complete >= 1 ? true : false}
                  id={v.id}
                  onClick={handleConfirm}
                  type="dashed"
                >
                  <Icon
                    type="delete"
                    style={{ fontSize: "18px", color: "#08c" }}
                  />
                </Button>
              </Popconfirm>,
            ]}
          >
            <Link
              key={v.id}
              as={`/feedbackdetail/${v.id}`}
              href={`/feedbackdetail?id=${v.id}`}
            >
              <a>
                <Meta
                  avatar={
                    <div>
                      <Avatar
                        src={
                          v.adviser !== null
                            ? v.adviser.portrait &&
                              `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.adviser.portrait}`
                            : "#"
                        }
                      >
                        {v.adviser !== null
                          ? !v.adviser.portrait &&
                            v.adviser.nickname.split("")[0]
                          : me.nickname.split("")[0]}
                      </Avatar>
                      <p style={{ color: "black" }}>
                        <strong>
                          {v.adviser !== null
                            ? v.adviser.nickname
                            : me.nickname}
                        </strong>
                      </p>
                    </div>
                  }
                  title={
                    <>
                      <Col
                        span={7}
                        style={{
                          background: "#FFFFFF",
                          textAlign: "center",
                          margin: 5,
                          borderRadius: 100,
                          color: "red",
                        }}
                      >
                        <strong>
                          {moment().isAfter(moment(v.write_date)) ? "D+" : "D-"}
                        </strong>
                        {dDay(v.createdAt, v.write_date)}
                      </Col>
                      <Col span={17} />
                      <Col span={24} style={{ fontSize: 23 }}>
                        <strong>{v.title}</strong>
                      </Col>
                    </>
                  }
                />
              </a>
            </Link>
          </Card>
        ))
      ) : (
        <Col span={24} style={{ marginTop: 30 }}>
          <Empty
            description={
              <span>
                <strong>
                  피드백이 없습니다.
                  <br />
                  피드백을 생성해 주세요
                </strong>
              </span>
            }
          />
        </Col>
      )}
      <div>
        <UpdateFeedback
          order={FEEDBACK_UPDATE_REQUEST}
          feedback_id={feedback_id}
          feedback_titles={feedback_title}
          feedback_adviser_uid={feedback_adviser_uid}
          feedback_write_date={feedback_write_date}
          category_titles={category_title}
          handleCancel={handleCancel}
          handleOk={handleOk}
          visible={visible}
        />
      </div>
    </>
  );
};

export default setFeedbackContents;
