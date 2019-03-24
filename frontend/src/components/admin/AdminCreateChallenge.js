/**
 * Created by NinoB on 25.2.2019 г.
 */

import React from 'react';
import FileBase64 from 'react-file-base64'
import ReactCrop from 'react-image-crop';
import * as loadImage from 'blueimp-load-image'
import 'react-image-crop/dist/ReactCrop.css';

import {Input, Button, Col, Row, Form, message} from 'antd';

import {DatePicker} from 'antd';

const {TextArea} = Input;


class AdminCreateChallenge extends React.Component {
    state = {
        croppedImageUrl: '',
        file: '',
        src: null,
        crop: {
            aspect: 1,
            width: 50,
            x: 0,
            y: 0,
        },
        loading: false
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        let validated = false;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated){

            let createdAt = Date.now();
            let data = this.props.form.getFieldsValue();
            data.createdAt = createdAt;

            this.setState({
                loading: true
            })
            message.loading("Please wait while creating the challenge", 0)
            const res = await this.props.Crud.addChallenge(data);

            if (res.success){
                message.destroy();
                message.success("Challenge created successfully")
                this.props.history.push('/dashboard');
            } else {
                message.error("Error during creating the challenge")
            }
        }
    }

    setFile =(file) => {

        this.setState({src: file.base64})
        this.props.form.setFields({
            cover: {
                value: file
            },
        });
    }

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = loadImage(image, (img) => {
            this.setState({
                file: img
            });
        }, {orientation: true});
    }


    onCropComplete = (crop, pixelCrop) => {

        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState({crop});
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.state.file && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.state.file,
                pixelCrop,
                'newFile.jpeg',
            );

            this.setState({croppedImageUrl});
        }
    }


    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state
        const {crop, src} = this.state;

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
                                                required: true, message: 'Please select a Name for the event!'}],
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
                                                required: true, message: 'Please add info for the event!'}],
                                        })(
                                            <TextArea placeholder="Please add a few lines of info for the event"
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
                                            rules: [{required: true, message: 'Please select end date for the event!'}],
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
                                            <FileBase64 name='name' type="file" multiple={false} onDone={ this.setFile }/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={16} offset={4}>
                                    {src && (
                                            <Form.Item
                                                label="Croped Image"
                                            >
                                                {getFieldDecorator('croppedImageUrl', {
                                                    rules: [{required: true, message: 'Please select end date for the event!'}],
                                                })(
                                                    <ReactCrop
                                                        src={src}
                                                        crop={crop}
                                                        onImageLoaded={this.onImageLoaded}
                                                        onComplete={this.onCropComplete}
                                                        onChange={this.onCropChange}
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

const WrappedAdminCreateChallenge = Form.create({name: 'normal_login'})(AdminCreateChallenge);

export default WrappedAdminCreateChallenge;