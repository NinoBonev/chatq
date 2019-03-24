import React from 'react'
import {
    Form, Icon, Input, Button, Row, Col,
} from 'antd';
import AuthService from '../../utilities/AuthService';
import '../../resources/style/custom.css'
import {message} from 'antd/lib/index';

const Auth = new AuthService();

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
            const success = await Auth.login(this.props.form.getFieldsValue());
            if (success){
                this.props.history.push('/dashboard');
            } else {
                message.error("Username or password are incorrect")
            }
        }
    };

    componentDidMount(){
        if (this.props.location.state) {
            message.info(this.props.location.state)
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Row type="flex" justify="space-around">
                <Col span={12} offset={6} style={{marginBottom: 30, fontSize: 40}}>
                    Log in to Chatq
                </Col>
                <Col span={12}>
                    <div className='login-form'>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Row justify="center" align="bottom">
                                <Col span={10} offset={7} style={{marginTop: 50}}>
                                    <Form.Item>
                                        {getFieldDecorator('username', {
                                            rules: [{required: true, message: 'Please input your username!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="Username"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={7}>
                                    <Form.Item>
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: 'Please input your Password!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   type="password" placeholder="Password"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={7}>
                                    <Form.Item>
                                        <Button icon="login" type="primary" htmlType="submit"
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

        )
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(LoginPage);

export default WrappedNormalLoginForm