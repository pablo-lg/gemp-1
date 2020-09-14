import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import './login.css'

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';
import { Form, Input, Button, Checkbox, Row, Col, Card } from 'antd';


export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const Login = (props: ILoginProps) => {
  const [showModal, setShowModal] = useState(props.showModal);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);
  const onFinish  = values =>  {
    props.login(values.username, values.password, values.rememberMe);;
  };
  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };
  const onFinishFailed = errorInfo => {
    null;
  };

  const { location, isAuthenticated } = props;
  const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  if (isAuthenticated) {
    return <Redirect to={from} />;
  }
  return (
    <div className='login'>
<Row  justify="center" align="middle"  style={{minHeight: '100vh'}}>
  <Col style={{width: 400}} >
  <Card title="Ingresar" >
    <Form 
    layout="vertical"
    name="basic"
    initialValues={{ remember: true, username:'GEM178936' }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item  name="remember" valuePropName="checked">
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </Card>
  </Col>
  </Row>
  </div>

  )
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin,
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
