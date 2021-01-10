import React, { useEffect, useState } from "react";
import { useAsyncFn } from "react-use";

import { Layout, Menu, Spin, Space, notification, Button } from "antd";
import { Item } from "./Item";

import { fetchApi } from "../utils/fetch";

const { Sider } = Layout;

const menuStyle = {
  height: "calc(100% - 32px)",
  borderRight: 0,
  overflowY: "auto",
  overflowX: "hidden",
};

const spaceStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
  display: "flex",
  justifyContent: "center",
};

export const List = ({ setIsFeedback, setItemId, itemId }) => {
  const [list, setList] = useState(null);

  const [{ loading }, fetch] = useAsyncFn(async () => {
    try {
      const result = await fetchApi();
      setList(result.data);
      return null;
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Попробуйте повторить операцию позже",
      });
    }
  }, []);

  const clickHandler = (id) => {
    setItemId(id);
  };

  const changeModeHandler = () => {
    if (itemId) {
      setIsFeedback(true);
    } else {
      notification.warning({
        description: 'Пожалуйста, выберите эпизод',
        message: 'Внимание!'
      })
    }
  };

  useEffect(() => {
    fetch()
  }, [fetch]);

  return (
    <>
      {!list ? (
        <Space style={spaceStyle}>{loading && <Spin size="large" />}</Space>
      ) : (
        <>
          <Sider width={300}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={menuStyle}
            >
              {list.map(({ char_id, name }) => (
                <Menu.Item key={char_id} onClick={() => clickHandler(char_id)}>
                  {name}
                </Menu.Item>
              ))}
            </Menu>
            <Button
              type="primary"
              style={{ height: "32px", width: "100%" }}
              onClick={changeModeHandler}
            >
              Select episode
            </Button>
          </Sider>
          <Item id={itemId} />
        </>
      )}
    </>
  );
};
