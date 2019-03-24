/**
 * Created by NinoB on 6.3.2019 г.
 */

//TODO Create a list of all user stories after click over his avatar

import React from 'react';
import {Col, Row, Card, Avatar, Button, Modal, Popconfirm, Icon} from 'antd';
import StoryPage from '../story/StoryPage';
import {message} from 'antd/lib/index';
import moment from 'moment';

const {Meta} = Card;

export default class AllUserStories extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.allUserStoriesInitialState();

    }

    componentDidMount() {
        if (!this.props.Auth.isLoggedIn()) {
            this.props.history.push({
                pathname: '/login',
                state: 'Please log in or register to use the full functionality'
            });
        }

        this.fetchAllUserStories();
    }

    fetchAllUserStories() {
        this.props.Crud.getUserInfo(this.props.match.params.id).then((res) => {

            if (res.success) {
                let myId = this.props.Auth.getProfile().id;
                let followCurrentUser = false;
                let notMyProfile = true;

                if (res.body._id === myId) {
                    notMyProfile = false;
                }

                if (res.body.followers !== undefined && res.body.followers.indexOf(myId) > -1) {
                    followCurrentUser = true;
                }

                this.setState({
                    avatar: res.body.avatar,
                    user: res.body.username,
                    userId: res.body._id,
                    notMyProfile,
                    myId,
                    followCurrentUser
                });


                for (let storyId of res.body.stories) {
                    this.props.Crud.getStoryById(storyId).then((story) => {
                        this.setState(prevState => ({
                            stories: [...prevState.stories, story.body]
                        }));
                    });
                }

                for (let challengeId of res.body.challenges) {
                    this.props.Crud.getStoryById(challengeId).then((story) => {
                        this.props.Crud.getChallengeById(story.body.challenge).then((challenge) => {
                            if (this.props.isAdmin) {
                                this.setState(prevState => ({
                                    challenges: [...prevState.challenges, story.body]
                                }));
                            } else {
                                if (moment(challenge.body.deadlineDate).isBefore(moment.now())) {
                                    this.setState(prevState => ({
                                        challenges: [...prevState.challenges, story.body]
                                    }));
                                }
                            }
                        });
                    });
                }

            } else {
                console.log(res.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    showModal = (id) => {
        this.setState({
            id,
            visible: true,

        });
        console.log(this.state);
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            id: ''
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            id: ''
        });
    };

    startFollowing = () => {
        this.props.Crud.startFollowUser(this.state.myId, this.state.userId).then((res) => {
            if (res.success) {
                message.success(`You are now following ${this.state.user}`,);
                this.setState({
                    followCurrentUser: true
                });
            }
        });

    };

    stopFollowing = () => {
        this.props.Crud.stopFollowUser(this.state.myId, this.state.userId).then((res) => {
            if (res.success) {
                message.success(`You are no longer following ${this.state.user}`,);
                this.setState({
                    followCurrentUser: false
                });
            }
        });
    };

    handleDeleteFromGroup(id) {
        this.props.Crud.deleteStoryFromGroupById(id).then((res) => {
            if (res.success) {
                message.success('Story deleted successfully');
                this.setState({
                    stories: []
                });
                this.fetchAllUserStories();
            }
        });
    }

    handleDeleteFromChallenge(id) {
        this.props.Crud.deleteStoryFromChallengeById(id).then((res) => {
            if (res.success) {
                message.success('Story deleted successfully');
                this.setState({
                    challenges: []
                });
                this.fetchAllUserStories();
            }
        });
    }

    render() {
        let storiesSortedByDateCreate = this.state.stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        let challengesSortedByDateCreate = this.state.challenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        let followOptions = this.state.followCurrentUser ? <Col offset={1} span={22}>
            <div style={{marginBottom: 30, marginLeft: 30, fontStyle: 'italic', color: '#40a9ff'}}>
                Don't want to follow this user anymore?
                <Button style={{marginLeft: 10}} ghost type='primary' onClick={this.stopFollowing} className='Create'
                        icon='create'>Stop Following</Button>
            </div>
        </Col> : <Col offset={1} span={22}>
            <div style={{marginBottom: 30, marginLeft: 30, fontStyle: 'italic', color: '#40a9ff'}}>
                Like those stories? Why not follow then
                <Button style={{marginLeft: 10}} ghost type='primary' onClick={this.startFollowing} className='Create'
                        icon='create'>Follow</Button>
            </div>
        </Col>;

        return (
            <div style={{margin: 30}}>
                <Row>
                    <Col span={24}>
                        <div align="center" style={{fontSize: 20, fontStyle: 'italic'}}>Stories submitted in groups:
                        </div>
                    </Col>
                    {storiesSortedByDateCreate.length > 0 ? <div>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <div align='center'><Avatar size={200} src={this.state.avatar} alt=""/></div>
                                    <div align="center" style={{marginTop: 30, fontSize: 16}}>All stories
                                        from <strong>{this.state.user}</strong></div>
                                    {this.state.notMyProfile ? followOptions : null}
                                </Col>
                                {storiesSortedByDateCreate.map((str) =>
                                    <Col span={6}>
                                        <Card
                                            style={{marginBottom: 20, marginTop: 20}}
                                            actions={this.props.isAdmin ? [<Popconfirm
                                                title="Are you sure delete this story?"
                                                onConfirm={() => this.handleDeleteFromGroup(str._id)} okText="Yes"
                                                cancelText="No">
                                                <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                            </Popconfirm>] : null}
                                            hoverable
                                            cover={<img src={str.cover}
                                                        onClick={() => this.showModal(str._id)} alt=""
                                            />}
                                        > <Meta
                                            title={<a style={{color: 'black'}} onClick={() => this.showModal(str._id)}>
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
                            </Row>

                        </div>

                        :

                        <Col span={24}>
                            <div align="center"
                                 style={{fontSize: 20, fontStyle: 'italic', marginTop: 20, color: 'green'}}>No stories
                                from open groups yet
                            </div>
                        </Col>}
                    <Col span={24}>
                        <div align="center" style={{fontSize: 20, fontStyle: 'italic', marginTop: 20}}>Stories submitted
                            in challenges:
                        </div>
                    </Col>
                    {challengesSortedByDateCreate.length > 0 ? <div>
                            <Row gutter={8}>
                                {challengesSortedByDateCreate.map((str) =>
                                    <Col span={6}>
                                        <Card
                                            style={{marginBottom: 20, marginTop: 20}}
                                            actions={this.props.isAdmin ? [<Popconfirm
                                                title="Are you sure delete this story?"
                                                onConfirm={() => this.handleDeleteFromChallenge(str._id)} okText="Yes"
                                                cancelText="No">
                                                <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                            </Popconfirm>] : null}
                                            hoverable
                                            cover={<img src={str.cover}
                                                        onClick={() => this.showModal(str._id)} alt=""
                                            />}
                                        > <Meta
                                            title={<a style={{color: 'black'}} onClick={() => this.showModal(str._id)}>
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
                            </Row>

                        </div>

                        :

                        <Col span={24}>
                            <div align="center"
                                 style={{fontSize: 20, fontStyle: 'italic', marginTop: 20, color: 'green'}}>Not involved
                                into any challenges yet
                            </div>
                        </Col>}
                </Row>
                <Modal
                    title="Basic Modal"
                    style={{top: 20}}
                    visible={this.state.visible}
                    width='85%'
                    destroyOnClose={true}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <StoryPage Crud={this.props.Crud} id={this.state.id}/>
                </Modal>
            </div>

        );
    }
}