import React, { useEffect, useState } from "react";
import { useAsyncFn } from "react-use";

import {
  Card,
  Space,
  Typography,
  Skeleton,
  Layout,
  notification,
  Row,
  Col,
} from "antd";
import { fetchApi } from "../utils/fetch";

const { Title } = Typography;

const spaceStyle = {
  width: "100%",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
};

export const Item = ({ id }) => {
  const [data, setData] = useState(null);

  const [{ loading }, fetch] = useAsyncFn(async () => {
    try {
      const result = await fetchApi(id);
      setData(result.data[0]);
      return null;
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Попробуйте повторить операцию позже",
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [fetch, id]);

  return (
    <>
      {loading ? (
        <Layout style={{ backgroundColor: "#ffffff", padding: "1rem" }}>
          <Skeleton active paragraph={{ rows: 7 }} />
        </Layout>
      ) : data ? (
        <Card title={data.nickname}>
          <Row>
            <Col span={18}>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Esse, illum voluptatem. Modi qui explicabo
              adipisci facere, voluptatum quia sed voluptatibus veritatis saepe
              impedit laboriosam optio dolor, molestiae et sit sunt.
              <hr />
              birthday: {data.birthday}<br/> 
              portrayed: {data.portrayed}<br/> 
            </Col>
            <Col span={6} style={{display: 'flex', justifyContent: 'center'}}>
              <img src={data.img} alt="default logo" width='100px'/>
            </Col>
          </Row>
        </Card>
      ) : (
        <Space style={spaceStyle}>
          <Title level={4}>Выберите пункт меню</Title>
        </Space>
      )}
    </>
  );
};
