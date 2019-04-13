/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react';
import FileBase64 from 'react-file-base64'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import withImageCropAspect_16_10 from '../hoc/withImageCropAspect_16_10'

import {Input, Button, Col, Row, Form, Switch, message} from 'antd';

const {TextArea} = Input;


class AdminCreateGroup extends React.Component {
    state = this.props.Helper.groupFormInitialState()

    componentDidMount(){
        this.props.setSubHeaderKey('createGroup');

        if (this.props.match.path === '/groups/edit/:id') {
            this.props.Crud.getGroupById(this.props.match.params.id).then((res) => {
                    this.setState(this.props.Helper.groupFormInitialState(res));

            }).catch((err) => {
                message.error('Error');
            });
        }
    }

    changeSliderValue() {
        this.setState(prevState => ({sliderValue:  !prevState.sliderValue}));
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

            console.log(data);

            const {name, info} = data;
            data.cover = data.cover.base64
            data.x = data.croppedImageUrl.x;
            data.y = data.croppedImageUrl.y;
            data.height = data.croppedImageUrl.height;
            data.width = data.croppedImageUrl.width;

            this.setState({
                loading: true
            })
            message.loading("Please wait while creating the group", 0)
            const res = await this.props.Crud.addGroup(data);

            if (res.success){
                message.destroy();
                message.success(res.body)
                this.props.history.push('/dashboard');
            } else {
                message.destroy();

                this.setState({
                    loading: false
                });

                for (const error of res.body) {
                    message.error(error)
                }
            }
        }
    }

    render() {
        let fromEdit = this.props.match.path === '/groups/edit/:id'
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state

        const coverField = <Form.Item
            label="Select Cover"
            labelCol={{span: 5}}
            wrapperCol={{span: 14}}
        >
            {getFieldDecorator('cover', {
                initialValue: fromEdit ? this.state.cover : this.props.cover,
                rules: [{
                    required: true,
                    message: 'Please select cover image for the group!'
                }],
            })(
                <FileBase64 name='name' type="file" multiple={false} onDone={this.props.setFile}/>
            )}
        </Form.Item>

        const cropImageField = this.props.src && (
            <Form.Item
                label="Croped Image"
            >
                {getFieldDecorator('croppedImageUrl', {
                    rules: [{
                        required: true,
                        message: 'Please select the area of the image you want to use for your cover'
                    }],
                })(
                    <ReactCrop
                        src={this.props.src}
                        crop={this.props.crop}
                        onImageLoaded={this.props.onImageLoaded}
                        onComplete={this.props.onCropComplete}
                        onChange={this.props.onCropChange}
                    />
                )}
            </Form.Item>)

        return (
            <Row type="flex" justify="space-around">
                <Col span={12}>
                    <div className='main-data-container'>
                        <Form onSubmit={this.handleSubmit}>
                            <Row justify="center" align="bottom">
                                <Col span={18} offset={3} style={{marginTop: 50}}>
                                    <Form.Item
                                        label="Name"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.name,
                                            rules: [{
                                                min: 4,
                                                max: 100,
                                                required: true, message: 'The provided name size should be between 4 and 100 symbols'}],
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
                                            initialValue: this.state.info,
                                            rules: [{
                                                min: 10,
                                                required: true, message: 'The provided info size should be at least 10 symbols'}],
                                        })(
                                            <TextArea placeholder="Please add a few lines of info for the group"
                                                      autosize={{minRows: 4, maxRows: 8}}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={18} offset={3}>
                                    {fromEdit && !this.props.src ?
                                        <div>
                                            <Form.Item
                                                label="Change current cover?"
                                                labelCol={{span: 6}}
                                                wrapperCol={{span: 12}}
                                            >
                                                {getFieldDecorator('sliderValue', {
                                                })(
                                                    <Switch onChange={() => this.changeSliderValue()} />

                                                )}
                                            </Form.Item>
                                            {this.state.sliderValue ? coverField : <img src={this.state.cover} style={{width: '100%'}} alt=""/>}

                                        </div>

                                        :

                                        coverField}
                                </Col>
                                <Col span={12} offset={6}>
                                    {cropImageField}
                                </Col>
                                <Col span={4} offset={9}>
                                    {fromEdit ?
                                        <div style={{marginTop: 20}}>
                                            <Form.Item>
                                                <Button htmlType='submit' type="primary">Edit Info</Button>
                                            </Form.Item>
                                        </div>


                                        :

                                        <div style={{marginTop: 20}}>
                                            <Form.Item>
                                                <Button
                                                    loading={loading}
                                                    type="primary"
                                                    htmlType="submit"
                                                    style={{
                                                        width: '100%',
                                                        border: 'none',
                                                        backgroundColor: '#45b4bf',
                                                        color: 'white'
                                                    }}>
                                                    {loading ? 'Uploading' : 'Create Group'}
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
            </Row>
        );
    }
}

let WrappedAdminCreateGroup = Form.create({name: 'normal_login'})(AdminCreateGroup);
WrappedAdminCreateGroup = withImageCropAspect_16_10(WrappedAdminCreateGroup)

export default WrappedAdminCreateGroup;