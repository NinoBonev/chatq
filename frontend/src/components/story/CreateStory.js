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
        if (!this.props.isAuth) {
            this.props.history.push({
                pathname: '/login',
                state: 'Please log in or register to use the full functionality'
            });
        }

        if (this.props.location.pathname === '/challenges/create_story') {
            this.props.Crud.getAllChallenges().then((challenges) => {
                let challenge = challenges.find(x => x.name === this.props.location.state);

                this.setState(({fields}) => ({
                    fields: {
                        ...fields,
                        challenge: {status: challenge.status, label: challenge.name, value: challenge.id}
                    },
                }));
            }).catch((err) => {
                message.error('Error');
            });
        }

        if (this.props.location.pathname === '/groups/create_story') {
            if (this.props.location.state !== undefined) {
                this.props.Crud.getAllGroups().then((groups) => {

                    let group = groups.find(x => x.name === this.props.location.state);

                    this.setState(({fields}) => ({
                        fields: {...fields, group: {label: group.name, value: group.id}},
                    }));
                });
            } else {
                this.props.Crud.getAllGroups().then((res) => {
                    for (const group of res) {
                        let label = group.name;
                        let value = group.id;
                        let status = group.status;

                        this.setState(({fields}) => ({
                            fields: {...fields, groups: [...fields.groups, {status, label, value}]},
                        }));
                    }
                }).catch((err) => {
                    message.error('Error');
                });
            }
        }

        if (this.props.match.path === '/groups/edit_story/:id') {

            this.props.Crud.getStoryById(this.props.match.params.id).then((res) => {
                this.setState(this.props.Helper.storyFormInitialState(res))
            }).catch((err) => {
                message.error('Error');
            });
        }

        if (this.props.match.path === '/challenges/edit_story/:id') {
            this.props.Crud.getStoryById(this.props.match.params.id).then((res) => {
                this.props.Crud.getChallengeById(res.challengeId).then((challengeInfo) => {
                    this.setState(this.props.Helper.storyFormInitialState(res));
                });

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
            editProps.cover = this.state.fields.cover.value.base64;
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

        let createdBy = await this.props.Auth.getProfile();

        if (createdBy) {
            let {fields} = this.state;

            let payload = {
                name: fields.name.value,
                challenge: fields.challenge.value,
                group: fields.group.value,
                cover: fields.src.value,
                x: fields.crop.value.x,
                y: fields.crop.value.y,
                height: fields.crop.value.height,
                width: fields.crop.value.width,
                //crop: JSON.stringify(fields.crop.value),
                info: fields.info.value,
                userByUsername: createdBy.username,
                storyLine: JSON.stringify(fields.storyline.value)
            }

            message.loading('Please wait while creating your story', 0);

            let res = await this.props.Crud.createStory(payload);
            if (res.success) {
                message.destroy();
                message.success('You have successfully created a new story');
                this.props.history.push('/dashboard');
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
            title: this.props.match.path === '/groups/edit_story/:id' || '/challenges/edit_story/:id' ? 'Edit Story info' : 'Add Story Info',
            header: this.props.match.path === '/groups/edit_story/:id' || '/challenges/edit_story/:id' ?
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
            <div>
                <Row type="flex" justify="space-around">
                    <div className='main-data-container'>
                                <Col span={10} offset={7}>
                                    {this.props.match.path === '/groups/edit_story/:id' ? null :
                                        <Steps current={currentStep}>
                                            {steps.map(item => <Step key={item.title} title={item.title}/>)}
                                        </Steps>}
                                </Col>
                                <Col span={10} offset={7} style={{marginTop: 20}}>
                                    {steps[this.state.currentStep].header}
                                </Col>
                                <div>
                                    {steps[this.state.currentStep].content}
                                </div>
                            </div>
                </Row>
            </div>
        );
    }
}


export default CreateStoryForm;