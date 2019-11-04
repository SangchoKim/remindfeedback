import React from 'react';
import { Modal, Layout, Card, Empty, Icon, Button, Col, Typography, Row, Avatar, Statistic } from 'antd';
import {layoutProfile, layoutCenter} from '../css/Friends';

const {Text,Title} = Typography;
const {Content} = Layout;

const ProfileFriends = ({profileVisible,profileHandleOk,profileHandleCancel,profileName}) => {
    return(
        <>
            <Modal
                 key='addFriends'
                 title={
                    <div style={{textAlign:"center"}}><Title level={3}>프로필</Title></div>
                }
                visible={profileVisible}
                onOk={profileHandleOk}
                onCancel={profileHandleCancel}
                bodyStyle={{padding:0}}
                footer={[
                    <div style={{textAlign:'center'}}>
                        <Button key="back" onClick={profileHandleCancel} style={{display:'none'}}>
                            <strong>취소</strong>
                        </Button>,
                        <Button key="submit" type="primary" onClick={profileHandleOk} size='large' style={{width:'100%'}}>
                            <strong>닫기</strong>
                        </Button>
                    </div>
                ]}
            >
                <Content>
                    <Row style={layoutProfile}>
                        <Col span={24} style={{textAlign:'center'}}>
                            <Empty
                                image={<Avatar style={{width: "20vh", height:'20vh', marginTop:15}}>
                                          <Icon type="user" style={{fontSize: "20vh"}} />
                                       </Avatar>
                                        }   
                            >
                               <div>
                                    <Button style={{background:"#052749", color:"#FFFFFF"}}>프로필 사진 추가하기</Button>
                               </div>
                            </Empty>
                        </Col>
                        <Col span={24} style={{textAlign:'center', marginTop:10}}>
                            <Text style={{color:"#000000"}}><strong>{profileName}</strong></Text>
                        </Col>
                        <Col span={24} style={{textAlign:'center', marginTop:5}}>
                            <Text style={{color:"#000000"}}><strong>test@naver.com</strong></Text>
                        </Col>
                        <Col span={24} style={{textAlign:'center', marginTop:10}}>
                            <Text style={{color:"#000000"}}>상태메시지입니다.</Text>
                        </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                          <Card>
                              <Statistic
                                title={<strong>요청받은 피드백</strong>}
                                value={12}
                                // precision={2}
                                valueStyle={{ color: '#61D761' }}
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
                                valueStyle={{ color: '#3AB0B0' }}
                                prefix={<Icon type="feedback" />}
                                suffix="번"
                              />
                          </Card>
                      </Col>
                    </Row>
                </Content>
            </Modal>
        </>
    );
};

export default ProfileFriends;