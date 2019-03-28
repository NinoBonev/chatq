/**
 * Created by NinoB on 4.3.2019 г.
 */

import React from 'react';
import {
    Input, Button, Col, Row, message, Upload, Icon, Form
} from 'antd';
import '../../resources/style/custom.css';
import 'react-image-crop/dist/ReactCrop.css';

const {TextArea} = Input;

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


//TODO: Kogat mahna snimka, koqto sym kachil povtorno, index-a se obyrkva

class CreateStoryStepTwoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            uploading: false,
        };
    }

    handleUpload = () => {

        let validated = false;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                validated = true;
            }
        });

        if (validated) {
            let currentFiles = [...this.state.files];

            for (let comment in this.props.form.getFieldsValue()) {
                let currentFiles = [...this.state.files];

                for (let file of currentFiles) {
                    let name = file.name.split('.')[0]
                    let extension = file.name.split('.')[1]

                    if(comment === name){
                        let current = currentFiles.findIndex(el => el.name === file.name)
                        currentFiles[current].info = this.props.form.getFieldsValue()[comment][extension]
                    }
                }
            }
            this.props.done(currentFiles);

            this.props.onSubmit()

            this.setState({
                uploading: true,
            });
        }
    };

    render() {
        let count = 1;
        const {uploading, files} = this.state;
        const {getFieldDecorator} = this.props.form;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const props = {
            listType: 'picture-card',
            multiple: false,
            onRemove: (file) => {
                this.setState((prevState) => {
                    let arr = prevState.files;
                    const newFileList = arr.filter(photo => photo.name !== file.name);
                    return {
                        files: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {

                if(this.state.files.findIndex(el => el.name === file.name) < 0){
                    getBase64(file).then((cover) => {
                        this.setState(state => ({
                            files: [...state.files, {name: file.name, cover}],
                        }));
                        //return false;
                    });
                    return false;
                } else {
                    console.log('No');
                    return false;
                }

            },
            files,
        };

        return (
            <div>
                <Row justify="center" align="bottom">
                    <Col span={14} offset={5} style={{marginTop: 20}}>
                        <Col>
                            <div align="center" style={{fontStyle: 'italic', fontSize: 16}}>To create your story you should have a storyline consisting of 4 photos which are directly connected to your story ,
                                Each photo should hold that part of your story that you consider most accurate for.
                                The final result should be a story of real inspiration with photos that makes the whole experience stronger.
                                It is important that all the photo are being made by the user himself.</div>
                        </Col>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={10} offset={7} style={{marginTop: 20}}>
                        <Upload {...props}>
                            {files.length >= 4 ? null : uploadButton}
                        </Upload>
                    </Col>
                    <Col span={12} offset={6}>
                        <Form>
                            {files.length !== 0 ? files.map((file) => {
                                return <div style={{margin: 15}}>
                                    <Form.Item>
                                        {getFieldDecorator(file.name, {
                                            rules: [{
                                                min: 21,
                                                required: true, message: 'Please add info for your picture'}],
                                        })(
                                            <TextArea
                                                      placeholder={'Add info for picture number ' + count++} rows={4}/>
                                        )}
                                    </Form.Item>
                                </div>;
                            }) : null}
                        </Form>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={8} offset={8} style={{marginBottom: 50}}>
                        <Button
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={files.length !== 4}
                            loading={uploading}
                            style={{marginTop: 16}}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                        <Button
                            disabled={uploading}
                            style={{marginLeft: 8}}
                            onClick={() => this.props.prev()}>
                            Previous
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedCreateStoryStepTwoForm = Form.create({name: 'normal_login'})(CreateStoryStepTwoForm);

export default WrappedCreateStoryStepTwoForm
