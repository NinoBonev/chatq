/**
 * Created by NinoB on 25.2.2019 г.
 */

import React from 'react';
import FileBase64 from 'react-file-base64'
import ReactCrop from 'react-image-crop';
import * as loadImage from 'blueimp-load-image'
import 'react-image-crop/dist/ReactCrop.css';
import withImageCrop from '../hoc/withImageCrop';

import {Input, Button, Col, Row, Form, message} from 'antd';

import {DatePicker} from 'antd';
const {TextArea} = Input;

class AdminCreateChallenge extends React.Component {
    state = {
        loading: false
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        let validated = false;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated){

            let data = this.props.form.getFieldsValue();
            data.cover = this.props.cover.base64;
            data.x = data.croppedImageUrl.x;
            data.y = data.croppedImageUrl.y;
            data.height = data.croppedImageUrl.height;
            data.width = data.croppedImageUrl.width;

            console.log(data);

            this.setState({
                loading: true
            })
            message.loading("Please wait while creating the challenge", 0)
            const res = await this.props.Crud.addChallenge(data);

            if (res.success){
                message.destroy();
                message.success(res.body)
                this.props.history.push('/dashboard');
            } else {
                message.error("Error during creating the challenge")
            }
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state

        return (
            <Row type="flex" justify="space-around">
                <Col span={12} offset={6} style={{marginBottom: 30, fontSize: 40}}>
                    Create a new Chatq challenge
                </Col>
                <Col span={12}>
                    <div className='login-form'>
                        <Form onSubmit={this.handleSubmit}>
                            <Row justify="center" align="bottom">
                                <Col span={18} offset={3} style={{marginTop: 50}}>
                                    <Form.Item
                                        label="Name"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                min: 4,
                                                max: 100,
                                                required: true, message: 'The name of the challenge should be between 4 and 100 symbols'}],
                                        })(
                                            <Input placeholder="Name"/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={18} offset={3}>
                                    <Form.Item
                                        label="Info"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('info', {
                                            rules: [{
                                                min: 25,
                                                required: true, message: 'The provided info should be min 25 symbols long'}],
                                        })(
                                            <TextArea placeholder="Please add a few lines of info for the challenge"
                                                      autosize={{minRows: 4, maxRows: 8}}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={18} offset={3}>
                                    <Form.Item
                                        label="End Date"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('deadlineDate', {
                                            rules: [{required: true, message: 'Please select end date for the challenge'}],
                                        })(
                                            <DatePicker showTime/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={10} offset={7}>
                                    <Form.Item
                                    >
                                        {getFieldDecorator('cover', {
                                        })(
                                            <FileBase64 name='name' type="file" multiple={false} onDone={this.props.setFile }/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={16} offset={4}>
                                    {this.props.src && (
                                        <Form.Item
                                            label="Croped Image"
                                        >
                                            {getFieldDecorator('croppedImageUrl', {
                                                rules: [{required: true, message: 'Please select the area of the image you want to use for your cover'}],
                                            })(
                                                <ReactCrop
                                                    src={this.props.src}
                                                    crop={this.props.crop}
                                                    onImageLoaded={this.props.onImageLoaded}
                                                    onComplete={this.props.onCropComplete}
                                                    onChange={this.props.onCropChange}
                                                />
                                            )}
                                        </Form.Item>
                                    )}
                                </Col>
                                <Col span={10} offset={7}>
                                    <Form.Item>
                                        <Button
                                            loading={loading}
                                            type="primary"
                                            htmlType="submit"
                                            className="login-form-button">
                                            {loading ? 'Uploading' : 'Create Challenge'}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

let WrappedAdminCreateChallenge = Form.create({name: 'normal_login'})(AdminCreateChallenge);
WrappedAdminCreateChallenge = withImageCrop(WrappedAdminCreateChallenge)

export default WrappedAdminCreateChallenge;