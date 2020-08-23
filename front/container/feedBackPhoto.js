import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "@ant-design/icons";
import {
  Modal,
  Layout,
  Form,
  Input,
  Button,
  Col,
  Typography,
  Row,
  Upload,
} from "antd";
import { backgroundWhite, backgroundLightBlue } from "../css/Common";
import { formItemLayout } from "../css/FeedbackDetail";
import { FRIENDS_PROFILE_ADD_REQUEST } from "../reducers/friends";
import {
  FEEDBACK_ITEM_ADD_REQUEST,
  FEEDBACK_ITEM_UPDATE_REQUEST,
} from "../reducers/feedback";
import { UPDATE_USER_REQUEST } from "../reducers/user";
import moment from "moment";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const getBase64 = (file) => {
  console.log("getBase64");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const feedBackPhoto = ({
  photoVisible,
  photoHandleCancel,
  mode,
  name,
  feedback_id,
  feedBackItemId,
}) => {
  const dispatch = useDispatch();
  const { feedbackItem } = useSelector((state) => state.feedback);

  const [previewVisible, setpreviewVisible] = useState(false);
  const [previewImage, setpreviewImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [number, setNumber] = useState([]);
  const [portrait, setPortrait] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    console.log("ddddd");
    if (feedBackItemId) {
      const {
        board_content,
        board_title,
        board_file1,
        board_file2,
        board_file3,
      } = feedbackItem.find(
        (v, i) => parseInt(feedBackItemId) === parseInt(v.id)
      );

      let updatePhoto = [board_file1, board_file2, board_file3];

      // 수동으로 multi-form 데이터 바꾸기 필요
      updatePhoto = updatePhoto.filter((v, i) => v != null);
      updatePhoto = updatePhoto.map((v, i) => {
        return v
          ? {
              uid: i,
              name: v.split("/")[1],
              state: "done",
              url: `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${v}`,
              update: false,
            }
          : {
              uid: "null",
            };
      });
      // updatePhoto = updatePhoto.filter((v,i)=>v.uid!=="null");
      console.log(updatePhoto, "updatePhoto");
      setFile(updatePhoto);
      setContent(board_content);
      setTitle(board_title);
    }

    if (name === "PHOTO") {
      setContent("");
      setTitle("");
      setFile([]);
    }
  }, [
    feedBackItemId && feedBackItemId,
    name && name,
    feedbackItem && feedbackItem,
  ]);

  const handlePreview = async (file) => {
    console.log("handlePreview", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    await setpreviewImage(file.url || file.preview);
    await setpreviewVisible(true);
  };

  const uploadButton =
    mode === UPDATE_USER_REQUEST ? (
      <Button disabled={number.length === 1 ? true : false}>
        <Icon type="upload" /> Upload
      </Button>
    ) : (
      <Button disabled={file.length === 3 ? true : false}>
        <Icon type="upload" /> Upload
      </Button>
    );

  const handleCancel = () => {
    setpreviewVisible(false);
  };

  const handlePreviewFile = (file) => getBase64(file);

  const handleCheck = (e) => {
    if (mode === UPDATE_USER_REQUEST) {
      setNumber("1");
      setPortrait([e]);
    } else {
      console.log(e);
      setFile([...file, e]);
    }
  };

  // const handleUpload = ({file}) => {
  //     setPortrait(file);
  // }

  const handleRemove = (e) => {
    if (mode === UPDATE_USER_REQUEST) {
      setNumber([]);
    } else {
      setFile(file.filter((v, i) => v.name !== e.name));
    }
  };

  const up = (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="text"
      onPreview={handlePreview}
      fileList={file.length >= 1 ? file : number.length >= 1 ? portrait : false}
      // onChange={handleUpload}
      previewFile={handlePreviewFile}
      onRemove={handleRemove}
      beforeUpload={handleCheck}
      withCredentials={true}
    >
      {uploadButton}
    </Upload>
  );

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContents = (e) => {
    setContent(e.target.value);
  };

  const _onsubmit = async () => {
    if (mode === FRIENDS_PROFILE_ADD_REQUEST) {
      dispatch({
        type: FRIENDS_PROFILE_ADD_REQUEST,
        data: {
          title,
        },
      });
    } else if (mode === UPDATE_USER_REQUEST) {
      if (portrait.length < 1) {
        return alert("사진을 선택해 주세요");
      }
      const formData = new FormData();
      const updatefile = true;
      formData.append("portrait", portrait[0]);
      formData.append("updatefile", updatefile);
      dispatch({
        type: UPDATE_USER_REQUEST,
        data: {
          formData,
          order: "portrait",
        },
      });
      photoHandleCancel();
    } else {
      if (!title) {
        return alert("제목을 입력해 주세요");
      }
      if (!file && name === "PHOTO") {
        return alert("사진을 선택해 주세요");
      }
      if (!content) {
        return alert("내용을 입력해 주세요");
      }
      let check = [false, false, false];
      let compare = [];
      let result;
      if (name === "PHOTO_UPDATE") {
        console.log(file, "file");
        const { board_file1, board_file2, board_file3 } = feedbackItem.find(
          (v, i) => parseInt(v.id) === parseInt(feedBackItemId)
        );
        compare.push(board_file1, board_file2, board_file3);
        check = check.map((v, i) => {
          return (
            (file[i] && file[i].update) ||
            (file[i] && file[i].name !== compare[i].split("/")[1]) ||
            (!file[i] && true)
          );
        });
        // check = check.map((v,i)=>{
        //     return(
        //         !file[i]?false
        //         :
        //         typeof file[i].uid ==='string'?true:
        //         file[i].name!==compare[i].split('/')[1]&&
        //         true
        //         )}
        //     )
        result = file.map((v, i) => {
          let files;
          if (typeof v.uid === "number") {
            const blob = new Blob([v.name], { type: "image/jpeg" });
            files = new File([blob], v.name, {
              lastModified: new Date(),
              type: "image/jpeg",
            });
          } else {
            files = v;
          }
          return files;
        });
      }

      const formData = new FormData();
      if (name === "PHOTO_UPDATE") {
        result.forEach((v, i) => formData.append(`file${i + 1}`, v));
      } else {
        file.forEach((v, i) => formData.append(`file${i + 1}`, v));
      }
      console.log(check, "check");
      check.forEach((v, i) => formData.append(`updatefile${i + 1}`, v));
      formData.append("board_content", content);
      formData.append("board_title", title);
      formData.append("feedback_id", feedback_id);
      if (name === "PHOTO_UPDATE") {
        dispatch({
          type: FEEDBACK_ITEM_UPDATE_REQUEST,
          data: {
            formData,
            name,
            feedBackItemId,
          },
        });
      } else {
        dispatch({
          type: FEEDBACK_ITEM_ADD_REQUEST,
          data: {
            formData,
            name,
          },
        });
      }
      setContent("");
      setTitle("");
      setFile([]);
      photoHandleCancel();
    }
  };

  return (
    <>
      <Modal
        key="feedBackPhoto"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>사진</Title>
          </div>
        }
        visible={photoVisible}
        footer={[
          <div key="add" style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={photoHandleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            ,
            <Button
              key="submit"
              type="primary"
              size="large"
              onClick={_onsubmit}
              style={{ width: "100%" }}
            >
              {name === "PHOTO_UPDATE" ? (
                <strong>수정</strong>
              ) : (
                <strong>추가</strong>
              )}
            </Button>
          </div>,
        ]}
        onCancel={photoHandleCancel}
        centered={true}
      >
        <Content style={backgroundWhite}>
          <Form {...formItemLayout}>
            <Row>
              <Col span={24}>
                {mode !== UPDATE_USER_REQUEST && (
                  <Form.Item label={<strong>제목</strong>}>
                    <Input
                      placeholder="제목을 입력해주세요"
                      prefix={<Icon type="edit" />}
                      value={title}
                      onChange={handleTitle}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col span={24}>
                {mode !== UPDATE_USER_REQUEST && (
                  <Form.Item label={<strong>내용</strong>}>
                    <TextArea
                      required
                      rows={4}
                      value={content}
                      onChange={handleContents}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col span={24}>
                <Form.Item label={<strong>사진 업로드</strong>}>{up}</Form.Item>
              </Col>
            </Row>
          </Form>
        </Content>
      </Modal>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="test" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default feedBackPhoto;
