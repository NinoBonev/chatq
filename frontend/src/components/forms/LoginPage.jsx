import React from 'react'
import {
    Form, Icon, Input, Button, Row, Col,
} from 'antd';
import '../../resources/style/custom.css'
import {message} from 'antd/lib/index';

import Header from '../common/Header'

class LoginPage extends React.Component {
    handleSubmit = async event => {
        event.preventDefault();

        let validated = false;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated){
            const res = await this.props.Auth.login(this.props.form.getFieldsValue());

            if (res.success){
                this.props.history.push('/dashboard');
            } else {
                message.error(res.body)
            }
        }
    };

    componentDidMount(){
        window.scrollTo(0,0);
        this.props.setSubHeaderKey('signIn')
        if (this.props.location.state) {
            message.info(this.props.location.state)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className='main-data-container'>
                <Row type="flex" justify="space-around">
                    <Col style={{backgroundColor: 'white', height: 500}} span={16}>
                        <div >
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <Row justify="center" align="bottom">
                                    <Col span={8} offset={8} style={{marginTop: 50}}>
                                        <Form.Item>
                                            {getFieldDecorator('username', {
                                                rules: [{required: true, message: 'Please input your username!'}],
                                            })(
                                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       placeholder="Username"/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={8}>
                                        <Form.Item>
                                            {getFieldDecorator('password', {
                                                rules: [{required: true, message: 'Please input your Password!'}],
                                            })(
                                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                       type="password" placeholder="Password"/>
                                            )}
                                        </Form.Item>
                                    </Col>
                                    <Col span={8} offset={8}>
                                        <Form.Item>
                                            <Button style={{
                                                border: 'none',
                                                backgroundColor: '#45b4bf',
                                                color: 'white'
                                            }} icon="login" type="primary" htmlType="submit"
                                                    className="login-form-button">
                                                Log in
                                            </Button>
                                            Or <a href="/register">register now!</a>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(LoginPage);

export default WrappedNormalLoginForm