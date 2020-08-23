import React, { useCallback, useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import {
  Modal,
  Layout,
  Card,
  Empty,
  Button,
  Col,
  Typography,
  Row,
  Avatar,
  Statistic,
} from "antd";
import { layoutProfile, layoutCenter } from "../css/Friends";
import { FRIENDS_PROFILE_READ_REQUEST } from "../reducers/friends";
import { FRIENDS_PROFILE_ADD_REQUEST } from "../reducers/friends";
import AppPhoto from "../container/feedBackPhoto";

const { Text, Title } = Typography;
const { Content } = Layout;

const ProfileFriends = ({
  profileVisible,
  profileHandleCancel,
  profileName,
  profileIntro,
  profileEmail,
  profilePortrait,
}) => {
  const [photoVisible, setPhotoVisible] = useState(false);

  // 사진
  const popUpPhoto = () => {
    console.log("ProfileFriends popUpPhoto");
    setPhotoVisible(true);
  };

  const photoHandleCancel = () => {
    console.log("ProfileFriends photoHandleCancel");
    setPhotoVisible(false);
  };

  return (
    <>
      <Modal
        key="profileFriends"
        title={
          <div style={{ textAlign: "center" }}>
            <Title level={3}>프로필</Title>
          </div>
        }
        visible={profileVisible}
        onCancel={profileHandleCancel}
        bodyStyle={{ padding: 0 }}
        footer={[
          <div style={{ textAlign: "center" }}>
            <Button
              key="back"
              onClick={profileHandleCancel}
              style={{ display: "none" }}
            >
              <strong>취소</strong>
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={profileHandleCancel}
              size="large"
              style={{ width: "100%" }}
            >
              <strong>닫기</strong>
            </Button>
          </div>,
        ]}
      >
        <Content>
          <Row style={layoutProfile}>
            <Col span={24} style={{ textAlign: "center" }}>
              <Empty
                image={
                  <Avatar
                    style={{ width: "20vh", height: "20vh", marginTop: 15 }}
                    src={
                      profilePortrait &&
                      `https://remindfeedback.s3.ap-northeast-2.amazonaws.com/${profilePortrait}`
                    }
                  >
                    {!profilePortrait && (
                      <span style={{ fontSize: 100, textAlign: "center" }}>
                        {profileName.split("")[0]}
                      </span>
                    )}
                  </Avatar>
                }
              ></Empty>
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 30 }}>
              <Text style={{ color: "#000000" }}>
                <strong>{profileName}</strong>
              </Text>
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 5 }}>
              <Text style={{ color: "#000000" }}>
                <strong>{profileEmail}</strong>
              </Text>
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 10 }}>
              <Text style={{ color: "#000000" }}>{profileIntro}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Card>
                <Statistic
                  title={<strong>요청받은 피드백</strong>}
                  value={12}
                  // precision={2}
                  valueStyle={{ color: "#61D761" }}
                  prefix={<Icon type="feedback" />}
                  suffix="번"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic
                  title={<strong>요청한 피드백</strong>}
                  value={2}
                  // precision={2}
                  valueStyle={{ color: "#3AB0B0" }}
                  prefix={<Icon type="feedback" />}
                  suffix="번"
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Modal>
      <div>
        <AppPhoto
          photoVisible={photoVisible}
          photoHandleCancel={photoHandleCancel}
          mode={FRIENDS_PROFILE_ADD_REQUEST}
        />
      </div>
    </>
  );
};

export default ProfileFriends;
