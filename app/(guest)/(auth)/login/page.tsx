"use client";

import React, {useState} from "react";
// import {observer} from 'mobx-react-lite';
import {Button, Card, Checkbox, Col, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
// import ParticlesLayout from "../components/Layout/ParticlesLayout";

const Login = () => {
    // const store = useStore();
    const [loading, setLoading] = useState(false);

    // let history = useHistory();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        enterLoading(values).then(res => {
            console.log(res, "awasaa");
        }).catch((error) => {
            console.log({error}, "awasaa error");
        });
    };

    const enterLoading = async (props: any) => {
        // store.setInitialToken("ayayay", "clap");
        // return history.push("/app/page_example_1");
    };

    return <div style={{width: '100vw', display: 'flex', justifyContent: 'center'}}>
        <Row justify={'center'}>
            <Col>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    marginTop: '5vh',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
                        <Typography.Paragraph
                            style={{
                                margin: 0,
                                padding: 0,
                                fontSize: 20,
                                marginLeft: 5,
                                fontWeight: 600,
                                color: "#413d3e",
                            }}
                        >
                            Boilerplate
                        </Typography.Paragraph>
                    </div>
                    <Card
                        style={{width: 320, textAlign: 'center'}}
                        headStyle={{fontSize: 13, fontWeight: 200}}
                        className={"shadow"}
                        bordered={true}
                        title={'Sign in to your account'}
                    >
                        <Form
                            layout={'vertical'}
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                // size={'large'}
                                rules={[{required: false, message: 'Please input your Username!'}]}
                            >
                                <Input
                                    prefix={<UserOutlined className="site-form-item-icon"/>}
                                    type="text"
                                    placeholder="Email"/>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}
                                label="Password"
                                name="password"
                                // size={'large'}
                                rules={[{required: false, message: 'Please input your Password!'}]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                style={{
                                    marginTop: 0,
                                    marginBottom: 20,
                                    padding: 0
                                }}
                                // label="Password"
                                name="forgot-password"
                                // size={'small'}
                                rules={[{required: false, message: 'Please input your Password!'}]}
                            >
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 5,
                                    textAlign: 'left'
                                }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item
                                style={{
                                    marginBottom: 0,
                                }}>
                                <Button type="primary"
                                        block
                                        loading={loading}
                                        htmlType="submit"
                                        size={'large'}
                                        onSubmit={enterLoading}
                                        className="login-form-button">
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </Col>
        </Row>

    </div>;
};

export default Login;
