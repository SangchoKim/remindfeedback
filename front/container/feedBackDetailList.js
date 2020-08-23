import React, { useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import {
  Col,
  Button,
  Breadcrumb,
  Card,
  Popover,
  Pagination,
  Tooltip,
  Empty,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import AppWrite from "../container/feedBackDetailWrite";
import AppPhoto from "../container/feedBackPhoto";
import AppVideo from "../container/feedBackDetailVideo";
import AppRecord from "../container/feedBackDetailRecord";
import ImageContents from "../components/ImagesContents";
import {
  FEEDBACK_ITEM_COMMENT_REQUEST,
  FEEDBACK_ITEM_ADD_REQUEST,
} from "../reducers/feedback";

const { Group } = Button;

const feedBackDetailList = ({ feedback_id, handleComment }) => {
  const dispatch = useDispatch();
  const {
    feedbackItem,
    feedback,
    message,
    isCompleted_req_Feedback,
  } = useSelector((state) => state.feedback);

  const { feedbackMode } = useSelector((state) => state.feedbackMode);

  const [name, setName] = useState(false);
  const [adviser_uid, setAdviser_uid] = useState("");
  const [feedBackItemId, setFeedBackItemId] = useState();
  const [board_id, setBoard_id] = useState(0);
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [Visible, setVisible] = useState(false);
  const [writeVisible, setWriteVisible] = useState(false);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [recordVisible, setRecordVisible] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [completeValue, setCompleteValue] = useState(0);
  const [feedbackItems, setFeedbackItems] = useState([]);

  useEffect(() => {
    if (feedbackMode) {
      if (feedback.yourFeedback) {
        if (feedback.yourFeedback.owner) {
          setAdviser_uid(
            feedback.yourFeedback.find(
              (v, i) => parseInt(v.id) === parseInt(feedback_id)
            ).owner.nickname
          );
        }

        setCreatedAt(
          feedback.yourFeedback.find(
            (v, i) => parseInt(v.id) === parseInt(feedback_id)
          ).createdAt
        );
      }
    } else {
      if (feedback.myFeedback) {
        if (feedback.myFeedback.adviser) {
          setAdviser_uid(
            feedback.myFeedback.find(
              (v, i) => parseInt(v.id) === parseInt(feedback_id)
            ).adviser.nickname
          );
        }

        setCreatedAt(
          feedback.myFeedback.find(
            (v, i) => parseInt(v.id) === parseInt(feedback_id)
          ).createdAt
        );
        const r = feedbackItem.map((v, i) => {
          return {
            board_file1: v.board_file1,
            board_file2: v.board_file2,
            board_file3: v.board_file3,
          };
        });
      }
    }
  }, []);

  useEffect(() => {
    if (feedbackMode) {
      if (feedback.yourFeedback) {
        const value = feedback.yourFeedback.find(
          (v, i) => parseInt(v.id) === parseInt(feedback_id)
        ).complete;
        setCompleteValue(value);
      }
    } else {
      if (feedback.myFeedback) {
        const value = feedback.myFeedback.find(
          (v, i) => parseInt(v.id) === parseInt(feedback_id)
        ).complete;
        setCompleteValue(value);
      }
    }
  }, [
    (handleComment && handleComment) ||
      (isCompleted_req_Feedback && isCompleted_req_Feedback),
  ]);

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message && message]);

  useEffect(() => {
    if (feedbackItem.length >= 1) {
      setBoard_id(feedbackItem[0].id);
    }
  }, [feedbackItem && feedbackItem]);

  useEffect(() => {
    if (feedbackItem.length >= 1) {
      setFeedbackItems(feedbackItem);
    }
  }, [feedbackItem && feedbackItem]);

  // Popover 추가하기
  const popUpAdd = () => {
    setVisible(!Visible);
  };

  // 글
  const writeHandleCancel = () => {
    console.log("FeedBackDetail writeHandleCancel");
    setWriteVisible(false);
  };

  // 사진
  const photoHandleCancel = () => {
    console.log("FeedBackDetail photoHandleCancel");
    setPhotoVisible(false);
  };

  // 비디오
  const videoHandleCancel = () => {
    console.log("FeedBackDetail videoHandleCancel");
    setVideoVisible(false);
  };

  // 녹음
  const recordHandleCancel = () => {
    console.log("FeedBackDetail recordHandleCancel");
    setRecordVisible(false);
  };

  const popUpModal = (e) => {
    setName(e.target.name);
    setVisible(false);
    if (e.target.name === "TEXT") {
      setWriteVisible(true);
    } else if (e.target.name === "PHOTO") {
      setPhotoVisible(true);
    } else if (e.target.name === "VIDEO") {
      setVideoVisible(true);
    } else if (e.target.name === "RECORD") {
      setRecordVisible(true);
    }
  };

  const handleUpdate = (e) => {
    setFeedBackItemId(e.target.id);
    const type = feedbackItem.find(
      (v, i) => parseInt(e.target.id) === parseInt(v.id)
    ).board_category;
    switch (type) {
      case 0:
        return setName("TEXT_UPDATE"), setWriteVisible(true);
      case 1:
        return setName("PHOTO_UPDATE"), setPhotoVisible(true);
      case 2:
        return setName("VIDEO_UPDATE"), setVideoVisible(true);
      case 3:
        return setName("RECORD_UPDATE"), setRecordVisible(true);
      default:
        return;
    }
  };

  const _onMouseOver = () => {
    setMouseOver(true);
  };
  const _onMouseLeave = () => {
    setMouseOver(false);
  };
  const handleList = (e) => {
    const board_id = e.target.id;
    const sort = 1;
    dispatch({
      type: FEEDBACK_ITEM_COMMENT_REQUEST,
      data: { board_id: board_id, sort: sort },
    });
    setBoard_id(board_id);
    handleComment(board_id);
  };

  const handleFilter = (name) => {
    if (feedbackItem.length >= 1) {
      if (name === "all") {
        console.log("all");
        setFeedbackItems(feedbackItem);
      } else if (name === "write") {
        console.log("write");
        setFeedbackItems(
          feedbackItem.filter((v, i) => parseInt(v.board_category) === 0)
        );
      } else if (name === "photo") {
        console.log("photo");
        setFeedbackItems(
          feedbackItem.filter((v, i) => parseInt(v.board_category) === 1)
        );
      } else {
        console.log("Noting");
      }
    }
  };

  const ItemCard = feedbackItems.map((v, i) => (
    <Card
      onMouseOver={_onMouseOver}
      onMouseLeave={_onMouseLeave}
      key={v.id}
      title={<strong>{v.board_title}</strong>}
      extra={
        <div>
          <Group>
            <Button
              disabled={completeValue >= 1 ? true : false}
              id={v.id}
              type="dashed"
              onClick={handleList}
            >
              <Icon type="check" style={{ fontSize: "18px", color: "#08c" }} />
            </Button>
            <Button
              disabled={completeValue >= 1 ? true : false}
              id={v.id}
              type="dashed"
              onClick={handleUpdate}
            >
              <Icon type="edit" style={{ fontSize: "18px", color: "#08c" }} />
            </Button>
          </Group>
          {/* <Tooltip title="더 자세한 사항을 보려면 More 버튼을 클릭해주세요!"><a href="#">More</a></Tooltip> */}
        </div>
      }
      style={{
        width: "100%",
        border: parseInt(board_id) === parseInt(v.id) && "solid blue 3px",
        borderRadius:
          parseInt(board_id) === parseInt(board_id) && "25px 25px 25px 25px",
        boxShadow: parseInt(board_id) === parseInt(board_id) && "5px 10px 20px",
      }}
    >
      <ImageContents v={v} />
      <div style={{ color: "#000000", marginTop: 10 }}>
        <p>{v.board_content ? v.board_content : "내용이 없습니다."}</p>
      </div>
      <div style={{ textAlign: "right", marginTop: 15 }}>
        <p style={{ fontSize: 10 }}>
          {moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
    </Card>
  ));

  const emptyCard = (
    <Col span={24} style={{ marginTop: 30 }}>
      <Empty
        description={
          <span>
            <strong>
              게시글이 없습니다.
              <br />
              게시글을 생성해 주세요
            </strong>
          </span>
        }
      />
    </Col>
  );

  return (
    <>
      <Col span={12} style={{ width: "50%" }}>
        <Col offset={1} />
        {!feedbackMode && (
          <Col span={22} style={{ textAlign: "right", marginBottom: 10 }}>
            <Popover
              key="addModal"
              visible={Visible}
              content={
                <Group>
                  <Button
                    type="primary"
                    name="TEXT"
                    onClick={popUpModal}
                    icon="file-text"
                  >
                    글
                  </Button>
                  <Button
                    type="primary"
                    name="PHOTO"
                    onClick={popUpModal}
                    icon="picture"
                  >
                    사진
                  </Button>
                  {/* <Button type="primary" name="VIDEO" onClick={popUpModal} icon="video-camera">동영상</Button>
                            <Button type="primary" name="RECORD" onClick={popUpModal} icon="audio">녹음</Button> */}
                </Group>
              }
              trigger="click"
            >
              <Button
                disabled={completeValue >= 1 ? true : false}
                type="primary"
                onClick={popUpAdd}
              >
                <strong>추가하기</strong>
              </Button>
            </Popover>
          </Col>
        )}
        <Col offset={1} />
        <Col offset={1} />
        <Col span={22} style={{ textAlign: "right", marginBottom: 10 }}>
          <Breadcrumb>
            <Breadcrumb.Item
              disabled={completeValue >= 1 ? true : false}
              href="#"
              onClick={handleFilter.bind(this, "all")}
            >
              <Icon type="appstore" />
              <span>전체</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              disabled={completeValue >= 1 ? true : false}
              href="#"
              onClick={handleFilter.bind(this, "write")}
            >
              <Icon type="read" />
              <span>글</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item
              disabled={completeValue >= 1 ? true : false}
              href="#"
              onClick={handleFilter.bind(this, "photo")}
            >
              <Icon type="camera" />
              <span>사진</span>
            </Breadcrumb.Item>
            {/* <Breadcrumb.Item href="#">
                            <Icon type="home" /><span>동영상</span>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            <Icon type="home" /><span>녹음</span>
                        </Breadcrumb.Item> */}
          </Breadcrumb>
        </Col>
        <Col offset={1} />
        <Col offset={1} />
        <Col span={22} style={{ marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: 20, color: "#000000", marginRight: 5 }}>
              <strong>조언자:</strong>
            </span>
            <span>{adviser_uid ? adviser_uid : "본인"}</span>
          </div>
          <div>
            <span style={{ fontSize: 15, color: "#000000", marginRight: 5 }}>
              <strong>생성일:</strong>
            </span>
            <span>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
          </div>
        </Col>
        <Col offset={1} />
        <Col offset={1} />
        <Col span={22}>{feedbackItem.length !== 0 ? ItemCard : emptyCard}</Col>
        <Col offset={1} />
      </Col>
      <div>
        <AppWrite
          writeVisible={writeVisible}
          writeHandleCancel={writeHandleCancel}
          name={name}
          feedback_id={feedback_id}
          feedBackItemId={feedBackItemId}
        />
      </div>
      <div>
        <AppPhoto
          photoVisible={photoVisible}
          photoHandleCancel={photoHandleCancel}
          name={name}
          feedback_id={feedback_id}
          feedBackItemId={feedBackItemId}
          mode={FEEDBACK_ITEM_ADD_REQUEST}
        />
      </div>
      <div>
        <AppVideo
          videoVisible={videoVisible}
          videoHandleCancel={videoHandleCancel}
          name={name}
          feedback_id={feedback_id}
          feedBackItemId={feedBackItemId}
        />
      </div>
      <div>
        <AppRecord
          recordVisible={recordVisible}
          recordHandleCancel={recordHandleCancel}
          name={name}
          feedback_id={feedback_id}
          feedBackItemId={feedBackItemId}
        />
      </div>
    </>
  );
};

export default feedBackDetailList;
