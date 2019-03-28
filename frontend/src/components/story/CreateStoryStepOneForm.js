/**
 * Created by NinoB on 4.3.2019 г.
 */

import React from 'react';
import {
    Switch, Form, Icon, Input, Button, Select, Col, Row, message
} from 'antd';
import '../../resources/style/custom.css';
import * as loadImage from 'blueimp-load-image';
import FileBase64 from 'react-file-base64';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const {TextArea} = Input;
const {Option} = Select;

//TODO: FirstActiveValue on select when coming fromGroup ----> AddStory
const WrappedNewStepOneForm = Form.create({
    name: 'global_state',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            name: Form.createFormField({
                ...props.name,
                value: props.name.value,
            }),
            cover: Form.createFormField({
                ...props.cover,
                value: props.cover.value
            }),
            croppedImageUrl: Form.createFormField({
                ...props.croppedImageUrl,
                value: props.croppedImageUrl.value
            }),
            info: Form.createFormField({
                ...props.info,
                value: props.info.value,
            }),
            challenge: Form.createFormField({
                ...props.challenge,
                value: props.challenge.value,
            }),
            group: Form.createFormField({
                ...props.group,
                value: props.group.value
            }),
            sliderValue: Form.createFormField({
                ...props.sliderValue,
                value: props.sliderValue
            }),
        };
    },
    onValuesChange(props, changedValue) {
        props.onChange(changedValue);
    },
})((props) => {
    const {getFieldDecorator} = props.form;
    let fromStoryEdit = props.match.path === '/groups/edit_story/:id'
    let fromChallengeEdit = props.match.path === '/challenges/edit_story/:id'
    let fromEdit = fromChallengeEdit || fromStoryEdit

    const coverField = <Form.Item
        label="Select Cover"
        labelCol={{span: 5}}
        wrapperCol={{span: 14}}
    >
        {getFieldDecorator('cover', {
            rules: [{
                required: true,
                message: 'Please select cover image for your story!'
            }],
        })(
            <FileBase64 name='name' type="file" multiple={false} onDone={props.setFile}/>
        )}
    </Form.Item>

    const cropImageField = props.src.value && (
        <Form.Item
        label="Croped Image"
    >
        {getFieldDecorator('croppedImageUrl', {
            rules: [{
                required: true,
                message: 'Please select the area of the image you want to use for your cover!'
            }],
        })(
            <ReactCrop
                src={props.src.value}
                crop={props.crop.value}
                onImageLoaded={props.onImageLoaded}
                onComplete={props.onCropComplete}
                onChange={props.onCropChange}
            />
        )}
    </Form.Item>)

    function next(e) {
        e.preventDefault();

        let validated = false;
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated) {
            if (fromEdit) {
                props.onEdit()
            } else {
                props.next()
            }
        }
    }

    return (
        <div>
            <Form onSubmit={next}>
                <Row justify="center" align="bottom">
                    <Col span={14} offset={5} style={{marginTop: 20}}>
                        <Col>
                            <div align="center" style={{fontStyle: 'italic', fontSize: 16}}>This is the first step of the creation of your new story.
                            Please choose the name, the cover photo and provide some short info about the storyline of your story.
                            </div>
                        </Col>
                    </Col>
                    <Col span={14} offset={5} style={{marginTop: 20}}>
                        <Form.Item
                            label="Name"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    min: 3,
                                    max: 100,
                                    required: true, message: 'Please choose a name between 3 and 60'
                                }],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Name"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={14} offset={5}>
                        <Form.Item
                            label="Info"
                            labelCol={{span: 5}}
                            wrapperCol={{span: 14}}
                        >
                            {getFieldDecorator('info', {

                                rules: [{
                                    min: 25,
                                    required: true, message: 'Please add info with length of minimum 25 symbols'}],
                            })(
                                <TextArea autosize={{minRows: 3, maxRows: 6}}
                                          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          placeholder="Info"/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={14} offset={5}>
                        {props.groups[0] ?
                            <Form.Item
                                label="Group"
                                labelCol={{span: 5}}
                                wrapperCol={{span: 14}}
                            >
                                {getFieldDecorator('group', {
                                    rules: [{required: true, message: 'Please choose group'}],
                                })(
                                    <Select style={{width: 150}}>
                                        {props.groups.map((group) =>
                                            <Option
                                                value={group.value} key={group.value}>{group.label}</Option>)}
                                    </Select>
                                )}
                            </Form.Item>

                            :

                            <div>
                                {props.challenge.value ? <Form.Item
                                        label="Challenge"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('challenge', {
                                        })(
                                            <div style={{fontStyle: 'italic', fontSize: 16}}>{props.challenge.label}</div>
                                        )}
                                    </Form.Item>

                                    :

                                    <Form.Item
                                        label="Group"
                                        labelCol={{span: 5}}
                                        wrapperCol={{span: 14}}
                                    >
                                        {getFieldDecorator('group', {
                                            rules: [{required: true, message: 'Please choose group'}],
                                        })(
                                            <div style={{fontStyle: 'italic', fontSize: 16}}>{props.group.label}</div>

                                        )}
                                    </Form.Item>}
                            </div>
                        }

                    </Col>
                    <Col span={14} offset={5}>
                        {fromEdit && !props.src.value ?
                            <div>
                                <Form.Item
                                    label="Change current cover?"
                                    labelCol={{span: 6}}
                                    wrapperCol={{span: 12}}
                                >
                                    {getFieldDecorator('sliderValue', {
                                        rules: [{required: true, message: 'Please choose group'}],
                                    })(
                                        <Switch onChange={props.changeSliderValue} />

                                    )}
                                </Form.Item>
                                {props.sliderValue.value ? coverField : <img src={props.cover.value} style={{width: '100%'}} alt=""/>}

                            </div>

                            :

                            coverField}
                    </Col>
                    <Col span={12} offset={6}>
                        {cropImageField}
                    </Col>
                    <Col span={2} offset={11}>
                        {fromEdit ?
                            <div style={{marginTop: 20}}>
                                <Form.Item>
                                    <Button htmlType='submit' type="primary">Edit Info</Button>
                                </Form.Item>
                            </div>


                            :

                            <div style={{marginTop: 20}}>
                                <Form.Item>
                                    <Button htmlType='submit' type="primary">Next</Button>
                                </Form.Item>
                            </div>


                        }
                    </Col>
                </Row>
            </Form>
        </div>
    );
});

export default WrappedNewStepOneForm;