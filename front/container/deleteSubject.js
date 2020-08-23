import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import { Popover, Button, Popconfirm } from "antd";
import { FEEDBACK_SUB_DELETE_REQUEST } from "../reducers/feedbackSubject";

const deleteSubject = ({
  update,
  PopupUpdateSubject,
  popOverVisible,
  handleVisible,
}) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    setId(e.target.id);
  };

  const handleConfirm = useCallback(() => {
    dispatch({
      type: FEEDBACK_SUB_DELETE_REQUEST,
      id,
    });
  }, [id]);

  return update.map((update) => {
    return (
      <Popover
        // onVisibleChange={handleVisible}
        // visible={popOverVisible}
        key={update.category_id}
        title={update.category_title}
        placement="rightBottom"
        overlayStyle={{ textAlign: "center" }}
        content={
          <>
            <div
              id={update.category_id}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button
                key="modify"
                id={update.category_id}
                type="primary"
                size="small"
                onClick={PopupUpdateSubject}
              >
                수정
              </Button>
              <Popconfirm
                key={update.category_id}
                onConfirm={handleConfirm}
                title={
                  <div>
                    해당 주제를 삭제할 시, 주제 내 모든 피드백 정보는 default
                    주제로 이동됩니다.
                    <br />
                    정말로 삭제하시겠습니까?
                  </div>
                }
                okText="네"
                cancelText="아니오"
              >
                <Button
                  type="danger"
                  id={update.category_id}
                  onClick={handleDelete}
                  size="small"
                >
                  삭제
                </Button>
              </Popconfirm>
            </div>
          </>
        }
        trigger="click"
      >
        <Button type="link" key={update}>
          <Icon type="more" key={update} />
        </Button>
      </Popover>
    );
  });
};

export default deleteSubject;
