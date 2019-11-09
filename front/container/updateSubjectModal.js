import React,{useState} from 'react';
import { SketchPicker } from 'react-color';
import { Modal, Layout, Form, Input, Icon, Button, Col, Typography, Row } from 'antd';
import { backgroundWhite, backgroundLightBlue} from '../css/Common';
import {formItemLayout} from '../css/Subject';

const {Content} = Layout;
const {Title} = Typography;

const updateSubjectModal = ({updateVisible,handleUpdateCancel,handleUpdateOk}) => {

    const [color,setColor] =  useState();

    const _onsubmit = () => {

    };

    const handleChangeComplete = (color) => {
        setColor(color.hex);
    };

    const handleChange = (color) => {
        console.log(color.hex);
        setColor(color.hex);
    };

    return(
        <>
            <Modal
                key='updateSubjectModal'
                title={
                    <div style={{textAlign:"center"}}><Title level={3}>주제 수정</Title></div>
                }
                visible={updateVisible}
                onOk={handleUpdateOk}
                footer={[
                    <div key="add" style={{textAlign:'center'}}>
                        <Button key="back" onClick={handleUpdateCancel} style={{display:'none'}}>
                            <strong>취소</strong>
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleUpdateOk} size='large' style={{width:'100%'}}>
                            <strong>주제 수정</strong>
                        </Button>
                    </div>
                ]}
                onCancel={handleUpdateCancel}
                centered={true}
            >
                <Content style={backgroundWhite}>
                    <Form {...formItemLayout} onSubmit={_onsubmit}>
                       <Row>
                            <Col span={24}>
                                <Form.Item label={<strong>주제 이름</strong>}>
                                    <Input
                                        prefix={<Icon type='home' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="제목"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label={<strong>색상 설정</strong>}>
                                    <SketchPicker
                                        color={color}
                                        onChangeComplete={handleChangeComplete}
                                        onChange={handleChange}
                                        width="10"
                                    />
                                </Form.Item>
                            </Col>
                       </Row> 
                    </Form>
                </Content>
            </Modal>
        </>
    )
};

export default updateSubjectModal;
