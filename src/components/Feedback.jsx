import React from "react";
import { useAsyncFn } from "react-use";

import { Card, notification, Input, Form, Button, Row, Spin } from "antd";
import FormItem from "antd/lib/form/FormItem";
import confirm from "antd/lib/modal/confirm";
import { emailPattern, rulesRequired } from '../utils/rules';

const { TextArea } = Input;

const formItemStyle = {
  display: "block",
};

const inputStyle = {
  maxWidth: "400px",
};

export const Feedback = ({ itemId, setIsFeedback }) => {
  const [form] = Form.useForm();

  const [{ loading }, fetch] = useAsyncFn(async () => {
    try {
      const result = setTimeout(() => {
        return true;
      }, 1000);
      if (result) {
        notification.success({
          message: "Поздравляем!",
          description: "Ваша рецензия успешно отправлена",
        });
        setIsFeedback(false);
      }
      return null;
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Попробуйте повторить операцию позже",
      });
    }
  }, []);

  const resetHandler = () => {
    confirm({
      title: "Вернуться на прошлую страницу?",
      onOk() {
        setIsFeedback(false);
      },
    });
  };

  const submitHandler = async () => {
    try {
      const data = await form.validateFields();
      fetch();
      console.log({
        ...data,
        id: itemId
      });
    } catch {
      notification.error({
        message: "Ошибка",
        description: "Заполните, пожалуйста, все поля!",
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <Card title="Рецензия">
        <Form form={form}>
          <FormItem
            label="Имя"
            name="username"
            style={formItemStyle}
            required
            rules={[rulesRequired]}
          >
            <Input style={inputStyle} />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            style={formItemStyle}
            required
            rules={[rulesRequired, emailPattern]}
          >
            <Input style={inputStyle} />
          </FormItem>
          <FormItem
            label="Текст рецензии"
            name="review"
            style={formItemStyle}
            required
            rules={[rulesRequired]}
          >
            <TextArea rows={5} />
          </FormItem>
          <Row style={{ justifyContent: "flex-end" }}>
            <Button style={{ width: "100px" }} onClick={resetHandler}>
              Отмена
            </Button>
            <Button
              type="primary"
              style={{ width: "100px", marginLeft: ".5rem" }}
              onClick={submitHandler}
            >
              Отправить
            </Button>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
};
