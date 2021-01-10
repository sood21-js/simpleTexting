import React, { useState } from "react";

import { Feedback } from "./components/Feedback";
import { List } from "./components/List";
import { Layout} from "antd";

import "antd/dist/antd.css";

const layoutStyle = {
  width: "1000px",
  margin: "0 auto",
  marginTop: "3rem",
  maxHeight: "500px",
};

export const App = () => {
  const [isFeedback, setIsFeedback] = useState(false);
  const [itemId, setItemId] = useState(null);
  return (
    <Layout style={{ height: "100vh" }}>
      <Layout style={layoutStyle}>
        {isFeedback ? (
          <Feedback setIsFeedback={setIsFeedback} itemId={itemId} />
        ) : (
          <List
            setIsFeedback={setIsFeedback}
            setItemId={setItemId}
            itemId={itemId}
          />
        )}
      </Layout>
    </Layout>
  );
};
