import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Col,
  Divider,
  Pagination,
  Button,
  Comment,
  Tooltip,
  Avatar,
  Input,
  Form,
  Popconfirm,
  Empty,
} from "antd";
import moment from "moment";
import {
  FEEDBACK_ITEM_COMMENT_REQUEST,
  FEEDBACK_ITEM_COMPLETE_REQ_REQUEST,
  FEEDBACK_ITEM_COMMENT_ADD_REQUEST,
  FEEDBACK_ITEM_COMMENT_DELETE_REQUEST,
  FEEDBACK_ITEM_COMMENT_UPDATE_REQUEST,
} from "../reducers/feedback";

const { TextArea } = Input;
const { Group } = Button;

const feedBackDetailComment = ({ board_ids, feedback_id }) => {
  const dispatch = useDispatch();

  const commentReferenece = useRef();
  const commentIdReference = useRef();

  const {
    feedbackComment,
    feedbackItem,
    feedback,
    isCompleted_req_Feedback,
    count,
    isAddedFeedbackComment,
    isDeletedFeedbackComment,
  } = useSelector((state) => state.feedback);
  const { feedbackMode } = useSelector((state) => state.feedbackMode);

  const [comment_content, setComments] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const [board_id, setBoard_id] = useState(0);
  const [commentId, setCommentId] = useState(0);
  const [changeMode, setChangeMode] = useState(0);
  const [changeWrite, setChangeWrite] = useState(false);
  const [changeDo, setChangeDo] = useState(true);
  const [completeValue, setCompleteValue] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(1);

  useEffect(() => {
    if (isDeletedFeedbackComment) {
      dispatch({
        type: FEEDBACK_ITEM_COMMENT_REQUEST,
        data: {
          page,
          board_id,
        },
      });
    }
  }, [isDeletedFeedbackComment && isDeletedFeedbackComment]);

  useEffect(() => {
    if (isAddedFeedbackComment) {
      dispatch({
        type: FEEDBACK_ITEM_COMMENT_REQUEST,
        data: {
          page,
          board_id,
          sort,
        },
      });
    }
  }, [isAddedFeedbackComment && isAddedFeedbackComment]);

  useEffect(() => {
    if (board_ids) {
      setBoard_id(board_ids);
    }
  }, [board_ids && board_ids]);

  useEffect(() => {
    if (feedbackItem.length >= 1) {
      setBoard_id(feedbackItem[0].id);
    }
  }, [feedbackItem && feedbackItem]);

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
    (board_ids && board_ids) ||
      (isCompleted_req_Feedback && isCompleted_req_Feedback),
  ]);

  const handleCommentUpdate = () => {
    if (changeWrite) {
      // 서버로 보낸다.
      dispatch({
        type: FEEDBACK_ITEM_COMMENT_UPDATE_REQUEST,
        data: {
          comment_id: commentId,
          comment_content: updateComment,
        },
      });
      setChangeWrite(false);
      setChangeDo(true);
    } else {
      setChangeWrite(true);
    }
  };

  const handleCommentWirte = (e) => {
    setUpdateComment(e.target.value);
  };

  const handleCommentId = (e) => {
    const { id, name } = e.target;
    if (name === "update") {
      setChangeMode(1);
      setChangeDo(false);
      if (changeDo) {
        setUpdateComment(
          feedbackComment.find((v, i) => parseInt(v.id) === parseInt(id))
            .comment_content
        );
      }
    } else if (name === "delete") {
      setChangeMode(2);
    } else {
      setChangeMode(3);
    }
    setCommentId(id);
  };

  const handleCommentDelete = (e) => {
    e.preventDefault();
    dispatch({
      type: FEEDBACK_ITEM_COMMENT_DELETE_REQUEST,
      data: commentId,
    });
  };

  const handleBack = () => {
    setChangeWrite(false);
    setChangeDo(true);
  };

  const _onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!comment_content) {
        return alert("댓글을 써주세요");
      }
      dispatch({
        type: FEEDBACK_ITEM_COMMENT_ADD_REQUEST,
        data: {
          comment_content,
          board_id,
        },
      });
      setComments("");
      commentReferenece.current.focus();
    },
    [comment_content]
  );

  const handleComplete = (e) => {
    const type = e.target.name;
    if (type) {
      dispatch({
        type: FEEDBACK_ITEM_COMPLETE_REQ_REQUEST,
        data: {
          feedback_id,
          type,
        },
      });
    }
  };

  const handlePage = (page) => {
    setPage(page);
    dispatch({
      type: FEEDBACK_ITEM_COMMENT_REQUEST,
      data: {
        page,
        board_id,
        sort,
      },
    });
  };

  const handleFilter = (sort) => {
    setSort(sort);
    console.log(sort);
    dispatch({
      type: FEEDBACK_ITEM_COMMENT_REQUEST,
      data: {
        page,
        board_id,
        sort,
      },
    });
  };

  const comments =
    feedbackComment &&
    feedbackComment.map((v, i) => (
      <Comment
        // style={{border:"1px solid #000000", padding:10}}
        actions={[
          <div key="comment-update-delete">
            <Popconfirm
              title={
                changeMode === 1
                  ? "정말로 수정하시겠습니까?"
                  : changeMode === 2
                  ? "정말로 삭제하시겠습니까?"
                  : "정말로 취소하시겠습니까?"
              }
              onConfirm={
                changeMode === 1
                  ? handleCommentUpdate
                  : changeMode === 2
                  ? handleCommentDelete
                  : handleBack
              }
              okText="네"
              cancelText="아니오"
            >
              <Group>
                <Button
                  type="dashed"
                  name="update"
                  id={v.id}
                  size="small"
                  icon="edit"
                  onClick={handleCommentId}
                />
                {changeWrite && parseInt(v.id) === parseInt(commentId) ? (
                  <Button
                    type="dashed"
                    name="back"
                    id={v.id}
                    size="small"
                    icon="arrow-left"
                    onClick={handleCommentId}
                  />
                ) : (
                  <Button
                    type="dashed"
                    name="delete"
                    id={v.id}
                    size="small"
                    icon="delete"
                    onClick={handleCommentId}
                  />
                )}
              </Group>
            </Popconfirm>
          </div>,
        ]}
        key={v.fk_user_uid + v.id}
        name={v.id}
        author={<a>{v.user.nickname}</a>}
        avatar={
          <Avatar
            src={
              v.user.portrait &&
              `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v.user.portrait}`
            }
          >
            {!v.user.portrait && v.user.nickname.split("")[0]}
          </Avatar>
        }
        content={
          changeWrite && parseInt(v.id) === parseInt(commentId) ? (
            <TextArea value={updateComment} onChange={handleCommentWirte} />
          ) : (
            <p>{v.comment_content}</p>
          )
        }
        datetime={
          <Tooltip title={moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment(v.createdAt).format("YYYY-MM-DD HH:mm:ss")}</span>
          </Tooltip>
        }
      />
    ));

  const emptyCard = (
    <Empty
      description={
        <span>
          <strong>
            댓글이 없습니다.
            <br />
            댓글을 써 주세요
          </strong>
        </span>
      }
    />
  );

  const handleComments = (e) => {
    setComments(e.target.value);
  };

  return (
    <>
      <Col span={12}>
        {feedbackComment.length >= 1 ? (
          <>
            <Col span={22} style={{ textAlign: "right" }}>
              <Button.Group size="small">
                <Button
                  type="dashed"
                  size="small"
                  onClick={handleFilter.bind(this, 1)}
                >
                  <Icon type="arrow-up" />
                  최신순
                </Button>
                <Button
                  type="dashed"
                  size="small"
                  onClick={handleFilter.bind(this, 0)}
                >
                  오래된순
                  <Icon type="arrow-down" />
                </Button>
              </Button.Group>
            </Col>
            <Col span={22}>
              {comments}
              <Col style={{ textAlign: "center", padding: 15 }}>
                <Pagination
                  total={count}
                  defaultCurrent={1}
                  defaultPageSize={5}
                  onChange={handlePage}
                />
              </Col>
            </Col>
          </>
        ) : (
          <Col span={22} style={{ marginBottom: 20 }}>
            {emptyCard}
          </Col>
        )}

        <Col span={22} style={{ padding: 0, margin: 0 }}>
          <Form onSubmit={_onSubmit}>
            <Form.Item>
              <Tooltip title="피드백에 관한 코멘트를 작성해주세요!">
                <TextArea
                  disabled={completeValue >= 1 ? true : false}
                  ref={commentReferenece}
                  key="comments"
                  onChange={handleComments}
                  value={comment_content}
                  rows={3}
                />
              </Tooltip>
            </Form.Item>
            <Form.Item style={{ textAlign: "right" }}>
              <Button
                htmlType="submit"
                type="primary"
                disabled={completeValue >= 1 ? true : false}
              >
                댓글등록
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {feedbackMode ? (
          <Col span={22} style={{ textAlign: "center" }}>
            {completeValue >= 2 ? (
              <div style={{ width: "100%" }}>
                <Button
                  disabled={true}
                  style={{
                    width: "100%",
                    background: "gray",
                    color: "#FFFFFF",
                  }}
                  name="complete"
                  size="large"
                >
                  완료
                </Button>
              </div>
            ) : (
              <Group style={{ width: "100%" }}>
                <Button
                  disabled={completeValue < 1 ? true : false}
                  style={{
                    width: "50%",
                    background: completeValue < 1 ? "gray" : "#0B4E92",
                    color: "#FFFFFF",
                  }}
                  name="accept"
                  size="large"
                  onClick={handleComplete}
                >
                  수락
                </Button>
                <Button
                  disabled={completeValue < 1 ? true : false}
                  style={{
                    width: "50%",
                    background: completeValue < 1 ? "gray" : "red",
                    color: "#FFFFFF",
                  }}
                  name="reject"
                  size="large"
                  onClick={handleComplete}
                >
                  거절
                </Button>
              </Group>
            )}
          </Col>
        ) : (
          <Col span={22} style={{ textAlign: "center" }}>
            <div style={{ width: "100%" }}>
              <Button
                disabled={completeValue >= 1 ? true : false}
                style={{
                  width: "100%",
                  background: completeValue >= 1 ? "gray" : "#0B4E92",
                  color: "#FFFFFF",
                }}
                name="request"
                size="large"
                onClick={handleComplete}
              >
                {completeValue === 1
                  ? "완료 요청 중"
                  : completeValue === 2
                  ? "완료"
                  : "완료 요청"}
              </Button>
            </div>
          </Col>
        )}
        <Col offset={1} />
      </Col>
    </>
  );
};

export default feedBackDetailComment;
