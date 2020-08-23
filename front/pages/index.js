import React, { useState, useEffect } from "react";
import { backgroundWhite } from "../css/Common";
import { WrapperRow } from "../css/Splash";
import { Row, Col, Layout, Typography, Progress } from "antd";
import logoImg from "../img/logo1.png";
import Router from "next/router";
import { makeGridSize } from "../css/responsive/_respondTo";
const { Content } = Layout;
const { Text } = Typography;

const Home = () => {
  const [percent, setPercent] = useState(0);

  // useEffect(() => {
  //   const progressbar = setInterval(() => {
  //     let count = percent + 10;
  //     if (percent > 100) {
  //       setPercent(100);
  //     }
  //     setPercent(count);
  //   }, 500);

  //   if (percent === 100) {
  //     clearInterval(progressbar);
  //     Router.push("/login");
  //   }
  // }, [percent]);

  const gridSize = {
    first: makeGridSize(2, 4, 6, 8),
    second: makeGridSize(20, 16, 12, 10),
    third: makeGridSize(2, 4, 6, 8),
  };

  return (
    <>
      <Layout style={backgroundWhite}>
        <WrapperRow>
          <Col {...gridSize.first}></Col>
          <Col {...gridSize.second} className="wrapper">
            <Col span={24}>
              <img src={logoImg} width="40%" />
            </Col>
            <Col span={24}>
              <Text>
                <strong>RemindFeedback</strong>
              </Text>
            </Col>
            <Col span={24}>
              <Progress
                percent={percent}
                size="default"
                status="active"
                className="progressBar"
              />
            </Col>
          </Col>
          <Col {...gridSize.third}></Col>
        </WrapperRow>
      </Layout>
    </>
  );
};

export default Home;
