import React from 'react';
import {Form, Input, Tooltip, Icon, Row, Col, Button} from 'antd';
import FileBase64 from 'react-file-base64'
import '../../resources/style/custom.css';
import AuthService from '../../utilities/AuthService';
import {message} from 'antd/lib/index';

const Auth = new AuthService();

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
            loading: false,
        };

        this.apply = this.apply.bind(this)
    }

    handleSubmit = async event => {
        event.preventDefault();

        let validated = false;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated){
            this.setState({
                loading: true
            });

            const res = await Auth.register(this.props.form.getFieldsValue());

            if (res.success) {
                await Auth.login(this.props.form.getFieldsValue());
                message.success(res.body)
                this.props.history.push('/');
            } else {
                this.setState({
                    loading: false
                });
                message.error(res.body)
            }
        }
    };

    apply(file) {
        this.props.form.setFields({
            avatar: {
                value: file.base64
            },
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    componentDidMount(){
        this.props.setSubHeaderKey('signIn')
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state

        return (
            <Row gutter={16} type="flex" justify="center">
                <Col span={12} offset={6} style={{marginTop:20, marginBottom: 25, fontSize: 40}}>
                    Sign up to Chatq
                </Col>
                <Col className='gutter-register-box' span={12}>
                    <div className='gutter-box'>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Row justify="center" type="flex">
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        label="Name"
                                        style={{maxWidth: 300}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                min: 4,
                                                max: 25,
                                                required: true,
                                                message: 'Please provide a name with length between 3 and 25 symbols'}],
                                        })(
                                            <Input
                                                placeholder="Enter your name"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        style={{maxWidth: 300}}
                                        label={(
                                            <span> Username&nbsp;
                                                <Tooltip title="What do you want others to call you?">
                                                    <Icon type="question-circle-o"/>
                                                </Tooltip>
                                            </span>
                                        )}
                                    >
                                        {getFieldDecorator('username', {
                                            rules: [{
                                                min: 4,
                                                max: 15,
                                                required: true,
                                                message: 'Please provide an username with length between 3 and 15 symbols',
                                                whitespace: true
                                            }],
                                        })(
                                            <Input
                                                placeholder="Choose your username"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        label="E-mail"
                                        style={{maxWidth: 300}}
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!',
                                            }, {
                                                required: true, message: 'Please input your E-mail!',
                                            }],
                                        })(
                                            <Input
                                                placeholder="Enter your e-mail"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        label="Password"
                                        style={{maxWidth: 300}}
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                min: 4,
                                                max: 12,
                                                required: true,
                                                message: 'Password should be between 4 and 12 symbols!',
                                            }, {
                                                validator: this.checkConfirm,
                                            }],
                                        })(
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        label="Confirm Password"
                                        style={{maxWidth: 300}}
                                    >
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password!',
                                            }, {
                                                validator: this.checkPassword,
                                            }],
                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur}
                                                   placeholder="Confirm your password"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} offset={6}>
                                    <Form.Item
                                        label="Profile picture"
                                    >
                                        {getFieldDecorator('avatar', {
                                            rules: [{
                                                required: true, message: 'Please select your avatar!',
                                            }]
                                        })(
                                            <FileBase64 name='name' type="file" multiple={false} onDone={ this.apply }/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8} offset={8}>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                border: 'none',
                                                backgroundColor: 'paleturquoise',
                                                color: 'white'
                                            }}
                                            loading={loading}
                                            icon="right-square"
                                            type="primary"
                                            htmlType="submit">
                                            {loading ? 'Configuring' : 'Register'}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col className='gutter-register-side-box' span={8}>
                    <div>
                        <Row type='flex' justify='center'>
                            <Col span={20}>
                                <h3 style={{fontSize: 24}}>Chatq is a non commercial application, created to deliver
                                    ultimate experience for the fans of photography and wonderful stories.</h3>
                            </Col>
                            <Col span={18} style={{margin: 15}}>
                                <span style={{fontSize: 20}}><Icon type="unlock"
                                                                   style={{fontSize: 34, marginRight: 15}}/>Free to use</span>
                            </Col>
                            <Col span={18} style={{margin: 15}}>
                                <span style={{fontSize: 20}}><Icon type="desktop"
                                                                   style={{fontSize: 34, marginRight: 15}}/>Desktop friendly application</span>
                            </Col>
                            <Col span={18} style={{margin: 15}}>
                                <span style={{fontSize: 20}}><Icon type="rocket"
                                                                   style={{fontSize: 34, marginRight: 15}}/>Optimization & Fast Delivery</span>
                            </Col>
                            <Col span={18} style={{margin: 15}}>
                                <span style={{fontSize: 20}}><Icon type="safety-certificate"
                                                                   style={{fontSize: 34, marginRight: 15}}/>Safety certificated</span>
                            </Col>
                            <Col style={{margin: 15}}>
                                <Button href="/about" type="primary">Learn more</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegisterPage);

export default WrappedRegistrationForm;