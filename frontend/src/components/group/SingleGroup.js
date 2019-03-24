/**
 * Created by NinoB on 27.2.2019 г.
 */

import React, {Component} from 'react';
import {Row, Col, Button, message} from 'antd';
import AllGroupStories from './AllGroupStories';
import GroupRules from './GroupRules';
import GroupInfo from './GroupInfo';

import withFollowing from '../hoc/withFollowing'
import withModal from '../hoc/withModal'

const ListAllGroupStories = withModal(AllGroupStories)


class BasicSingleGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            collapsedInfo: true,
            collapsedRules: true
        };
    }

    componentDidMount() {
        console.log(this.state);
        this.props.Crud.getGroupById(this.props.match.params.id).then((res) => {
            if (res.success) {
                for (let story of res.body.stories) {
                   this.props.Crud.getUserInfo(story.createdBy).then((user) => {
                        story.avatar = user.body.avatar;
                        story.username = user.body.username;

                        this.setState(prevState => ({
                            stories: [...prevState.stories, story]
                        }));
                   });
                }
            } else {
                message.error(res.message);
            }

        }).catch((err) => {
            message.error("Error");
        });
    }

    toggleCollapsedInfo = () => {
        this.setState(prevState => ({
            collapsedInfo: !prevState.collapsedInfo,
        }));
    }

    toggleCollapsedRules = () => {
        this.setState(prevState => ({
            collapsedRules: !prevState.collapsedRules,
        }));
    }

    render() {
        return (
            <div className='default-panel'>

                <Row gutter={24}>
                    <Col span={9}>
                        <GroupInfo {...this.state} toggleCollapsed={this.toggleCollapsedInfo.bind(this)}/>
                    </Col>
                    <Col span={9}>
                        <GroupRules {...this.state} toggleCollapsed={this.toggleCollapsedRules.bind(this)}/>
                    </Col>
                    <Col span={6}>
                        {this.props.userId &&
                        <div align="center" style={{marginTop: 40}}>
                            {this.props.following ?
                                <div style={{fontStyle: 'italic', color: '#40a9ff'}}>
                                    Don't want to follow this group anymore?
                                    <div style={{marginTop: 5}}>
                                        <Button type='primary'
                                                onClick={() => this.props.stopFollowing(this.props.location.state.groupId, this.props.userId)} className='Create' icon='create'>Stop
                                            Following</Button>
                                    </div>
                                </div>
                                :
                                <div style={{fontStyle: 'italic', color: '#40a9ff'}}>
                                    Like this group? Why not follow then
                                    <div style={{marginTop: 5}}>
                                        <Button type='primary'
                                                onClick={() => this.props.startFollowing(this.props.location.state.groupId, this.props.userId)} className='Create'
                                                icon='create'>Follow</Button>
                                    </div>
                                </div>
                            }
                            <div style={{marginTop: 10, fontStyle: 'italic', color: 'red'}}>
                                Feel inspired? Add your story to this group
                                <div style={{marginTop: 5}}>
                                    <Button type='danger'
                                            onClick={() => this.props.history.push({
                                                pathname: '/story/create',
                                                state: this.props.group_name
                                            })} className='Create' icon='create'>Add Story</Button>
                                </div>
                            </div>
                        </div>}
                    </Col>
                </Row>
                <Row>
                    <Col offset={8} span={8}>
                        <div style={{fontSize: 30, marginTop: 20}}>All stories from this group</div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <div style={{marginLeft: 20, marginRight: 20}}>
                        <ListAllGroupStories {...this.props} {...this.state}/>
                    </div>
                </Row>
            </div>
        );
    }
}

const SingleGroups = withFollowing(BasicSingleGroup)

export default SingleGroups;