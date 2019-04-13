/**
 * Created by NinoB on 6.3.2019 г.
 */

//TODO Create a list of all user stories after click over his avatar

import React from 'react';
import {Col, Row, Card, Avatar, Button, Modal, Popconfirm, Icon} from 'antd';
import StoryPage from '../story/StoryPage';
import {message} from 'antd/lib/index';
import moment from 'moment';
import Cover from '../../resources/9459329810_4ae305db6e_k.jpg'

const {Meta} = Card;

export default class AllUserStories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyName: '',
            storyId: '',
            visible: false,
        }
    }

    componentDidMount() {
        console.log(this.props);
        window.scrollTo(0,0);
    }

    showModal = (id, name) => {
        this.setState({
            storyName: name,
            storyId: id,
            visible: true,

        });
    };

    handleOk = (e) => {
        this.setState({
            visible: false,
            storyId: '',
            storyName: ''
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
            storyId: '',
            storyName: ''
        });
    };

    handleDelete(id) {
        this.props.Crud.deleteStoryById(id).then((res) => {
            if (res.success) {
                message.success(res.body);
                this.setState({
                    stories: []
                });
                this.fetchAllUserStories();
            } else {
                message.error(res.body)
            }
        });
    }

    componentWillUnmount(){
        this.props.setHeaderCoverVisibility(false)
        this.props.setHeaderCoverAvatar('')
        this.props.clearHeaderCoverUserInfo()
    }

    render() {
        return (
            <div>
                {this.props.stories > 0 ? <div>
                    {this.props.stories.map((str) =>
                        <Col span={6}>
                            <Card
                                style={{marginBottom: 20, marginTop: 20}}
                                actions={this.props.isAdmin ? [<Popconfirm
                                    title="Are you sure delete this story?"
                                    onConfirm={() => this.handleDelete(str.id)} okText="Yes"
                                    cancelText="No">
                                    <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                </Popconfirm>] : null}
                                cover={<div className='imageFadeOut'><img src={str.cover}
                                                                          style={{width: '100%'}}
                                                                          onClick={() => this.showModal(str.id, str.name)}
                                                                          alt=""
                                /></div>}
                            > <Meta
                                title={<a style={{color: 'black'}}
                                          onClick={() => this.showModal(str.id, str.name)}>
                                    {str.name}
                                </a>}
                            />
                                <div style={{
                                    marginTop: 20,
                                    minHeight: 150
                                }}>{str.info.substring(0, 300) !== str.info ?
                                    str.info.substring(0, 300) + '...'

                                    :
                                    str.info}</div>
                            </Card>
                        </Col>
                    )}
                </div> : <Col span={24}>
                    <div align="center"
                         style={{fontSize: 20, fontStyle: 'italic', marginTop: 20, color: 'green'}}>Not involved
                        into any stories yet
                    </div>
                </Col>}
                <Modal
                    title="Basic Modal"
                    style={{top: 20}}
                    visible={this.state.visible}
                    width='85%'
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <StoryPage Crud={this.props.Crud} storyId={this.state.storyId} storyName={this.state.storyName}/>
                </Modal>
            </div>
        )
    }
}