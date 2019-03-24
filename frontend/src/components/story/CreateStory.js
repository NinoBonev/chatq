/**
 * Created by NinoB on 4.3.2019 г.
 */

import React from 'react';
import {
    Col, Row, Steps, message
} from 'antd';
import '../../resources/style/custom.css';
import 'react-image-crop/dist/ReactCrop.css';
import WrappedNewStepOneForm from './CreateStoryStepOneForm';
import WrappedCreateStoryStepTwoForm from './CreateStoryStepTwoForm';

import * as loadImage from 'blueimp-load-image';


const Step = Steps.Step;

class CreateStoryForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.storyFormInitialState();

        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    done = (storyline) => {
        this.setState(({fields}) => ({
            fields: {
                ...fields, storyline: {
                    value: storyline
                }
            },
        }));
    };

    componentDidMount() {
        console.log(this.props);
        if (!this.props.isAuth) {
            this.props.history.push({
                pathname: '/login',
                state: 'Please log in or register to use the full functionality'
            });
        }

        if (this.props.location.pathname === '/challenges/add_story') {
            this.props.Crud.getAllChallenges().then((challenges) => {
                let challenge = challenges.body.find(x => x.name === this.props.location.state);

                this.setState(({fields}) => ({
                    fields: {...fields, challenge: {label: challenge.name, value: challenge._id}},
                }));
            }).catch((err) => {
                message.error('Error');
            });
        }

        if (this.props.location.pathname === '/story/create') {
            if (this.props.location.state !== undefined) {
                this.props.Crud.getAllGroups().then((groups) => {
                    let group = groups.body.find(x => x.name === this.props.location.state);

                    this.setState(({fields}) => ({
                        fields: {...fields, group: {label: group.name, value: group._id}},
                    }));
                });
            } else {
                this.props.Crud.getAllGroups().then((res) => {
                    for (const group of res.body) {
                        let label = group.name;
                        let value = group._id;

                        this.setState(({fields}) => ({
                            fields: {...fields, groups: [...fields.groups, {label, value}]},
                        }));
                    }
                }).catch((err) => {
                    message.error('Error');
                });
            }
        }

        if (this.props.match.path === '/story/edit/:id') {
            this.props.Crud.getStoryById(this.props.match.params.id).then((res) => {
                if (res.success) {
                    this.props.Crud.getGroupById(res.body.group).then((groupInfo) => {
                        let groupName = groupInfo.body.name;

                        this.setState(this.props.Helper.storyFormInitialState(res, groupName));
                    });
                }

            }).catch((err) => {
                message.error('Error');
            });
        }

        if (this.props.match.path === '/challenge/edit/:id') {
            this.props.Crud.getStoryById(this.props.match.params.id).then((res) => {
                if (res.success) {
                    this.props.Crud.getChallengeById(res.body.challenge).then((challengeInfo) => {
                        let challengeName = challengeInfo.body.name;

                        this.setState(this.props.Helper.storyFormInitialState(res, '', challengeName));
                    });
                }

            }).catch((err) => {
                message.error('Error');
            });
        }

    }

    next() {
        const currentStep = this.state.currentStep + 1;
        this.setState({
            currentStep
        });
    }

    prev() {
        const currentStep = this.state.currentStep - 1;
        this.setState({currentStep});
    }

    handleFormChange = (changedFields) => {
        this.setState(({fields}) => ({
            fields: {...fields, ...changedFields},
        }));
    };

    handleEdit = async () => {
        let editProps = {};
        let storyId = this.props.match.params.id;

        for (let field in this.state.fields) {
            if (this.state.fields[field].touched === true && field !== 'sliderValue') {
                editProps[field] = this.state.fields[field].value;
            }
        }

        if (this.state.fields.cover.value.hasOwnProperty('base64')) {
            editProps.cover = this.state.fields.cover.value;
        }

        message.loading('Please wait while editing your story', 0);
        let res = await this.props.Crud.editStoryInfo(storyId, editProps);
        if (res.success) {
            message.destroy();
            message.success('You have successfully edited your story');
            this.props.history.push('/dashboard');
        }
    };

    handleSubmit = async () => {

        let createdBy = await this.props.Auth.getProfile().id;

        this.setState(({fields}) => ({
            fields: {...fields, createdBy},
        }));

        if (createdBy) {
            let {fields} = this.state;

            if (this.props.match.path === '/story/create') {
                message.loading('Please wait while creating your story', 0);
                let res = await this.props.Crud.addStoryToOpenGroup(fields);
                if (res.success) {
                    message.destroy();
                    message.success('You have successfully created a new story');
                    this.props.history.push('/dashboard');
                }
            } else if (this.props.match.path === '/challenges/add_story') {
                message.loading('Please wait while creating your story', 0);
                let res = await this.props.Crud.addStoryToOpenChallenge(fields);
                if (res.success) {
                    message.destroy();
                    message.success('You have successfully created a new story');
                    this.props.history.push('/dashboard');
                }
            }
        }

    };

    changeSliderValue() {
        this.setState(prevState => ({
            sliderValue: {
                value: !prevState.sliderValue,
            }
        }));
    }

    setFile = (file) => {
        this.setState(({fields}) => ({
            fields: {
                ...fields, cover: {
                    value: file
                }
            },
        }));
        this.setState(({fields}) => ({
            fields: {
                ...fields, src: {
                    value: file.base64
                }
            },
        }));
    };

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = loadImage(image, (img) => {
            this.setState(({fields}) => ({
                fields: {
                    ...fields, file: {
                        value: img
                    }
                },
            }));
        }, {orientation: true});
    };


    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState(({fields}) => ({
            fields: {
                ...fields, crop: {
                    value: crop
                }
            },
        }));
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.state.fields.file.value && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.state.fields.file.value,
                pixelCrop,
                'newFile.jpeg',
            );

            this.setState(({fields}) => ({
                fields: {
                    ...fields, croppedImageUrl: {
                        value: croppedImageUrl
                    }
                },
            }));
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

        const {fields} = this.state;
        const {currentStep} = this.state;

        const steps = [{
            title: this.props.match.path === '/story/edit/:id' || '/challenge/edit/:id' ? 'Edit Story info' : 'Add Story Info',
            header: this.props.match.path === '/story/edit/:id' || '/challenge/edit/:id' ?
                <h3 align="center">Please edit your story info</h3> :
                <h3 align="center">Please select info for your story</h3>,
            content: <WrappedNewStepOneForm {...fields} {...this.props}
                                            onChange={this.handleFormChange}
                                            onEdit={this.handleEdit}
                                            setFile={this.setFile}
                                            onImageLoaded={this.onImageLoaded}
                                            onCropComplete={this.onCropComplete}
                                            onCropChange={this.onCropChange}
                                            makeClientCrop={this.makeClientCrop}
                                            getCroppedImg={this.getCroppedImg}
                                            next={this.next}
            />
        }, {
            title: 'Create Storyline',
            header: <h3 align="center">Please create your storyline</h3>,
            content: <WrappedCreateStoryStepTwoForm
                onSubmit={this.handleSubmit}
                done={this.done}
                prev={this.prev}
                {...fields} {...this.props}
            />
        }];

        return (
            <Row type="flex" justify="space-around">
                <div align="center" style={{marginBottom: 30, fontSize: 40}}>
                    {this.props.match.path === '/story/edit/:id' ? 'Create your Chatq story' : 'Add your story to our challenge'}
                </div>
                <Col span={18}>
                    <div className='login-form'>
                        <Col span={12} offset={6} style={{marginTop: 30}}>
                            {this.props.match.path === '/story/edit/:id' ? null :
                                <Steps current={currentStep}>
                                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                                </Steps>}
                        </Col>
                        <Col span={12} offset={6} style={{marginTop: 20}}>
                            {steps[this.state.currentStep].header}
                        </Col>
                        <div>
                            {steps[this.state.currentStep].content}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}


export default CreateStoryForm;