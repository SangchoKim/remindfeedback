import React, { useState, useEffect } from "react";
import { backgroundWhite } from "../css/Common";
import { WrapperRow } from "../css/Splash";
import { Row, Col, Layout, Typography, Progress } from "antd";
import logoImg from "../img/logo1.png";
import Router from "next/router";
const { Content } = Layout;
const { Text } = Typography;

const Home = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const progressbar = setInterval(() => {
      let count = percent + 10;
      if (percent > 100) {
        setPercent(100);
      }
      setPercent(count);
    }, 500);

    if (percent === 100) {
      clearInterval(progressbar);
      Router.push("/login");
    }
  }, [percent]);

  const gridSize = {
    first: {
      xs: 2,
      sm: 4,
      md: 6,
      lg: 8,
    },
    second: { xs: 20, sm: 16, md: 12, lg: 8 },
    third: { xs: 2, sm: 4, md: 6, lg: 8 },
  };

  return (
    <>
      <Layout style={backgroundWhite}>
        <WrapperRow>
          <Col {...gridSize.first}></Col>
          <Col {...gridSize.second} className="wrapper">
            <Col span={24}>
              <img src={logoImg} width="50%" />
            </Col>
            <Col span={24}>
              <Text>
                <strong>RemindFeedback</strong>
              </Text>
            </Col>
            <Col span={24}>
              <Progress percent={percent} size="default" status="active" />
            </Col>
          </Col>
          <Col {...gridSize.third}></Col>
        </WrapperRow>
      </Layout>
    </>
  );
};

export default Home;
