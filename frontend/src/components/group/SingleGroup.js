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
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            stories: [],
            collapsedInfo: true,
            collapsedRules: true
        };
    }

    componentDidMount() {
        console.log(this.props);
        this._isMounted = true;

        this.props.Crud.getGroupByName(this.props.match.params.name).then((res) => {
            if (this._isMounted) {
                for (let str of res.storiesById) {
                    this.props.Crud.getStoryById(str).then((story) => {
                        this.props.Crud.getUserInfo(story.username).then((user) => {
                            story.avatar = user.avatar;

                            this.setState(prevState => ({
                                stories: [...prevState.stories, story]
                            }));
                        });
                    })
                }
            }
        }).catch((err) => {
            message.error("Error");
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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
        let storiesSortedByDateCreate = this.state.stories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <div>
                <Row>
                <div className='main-data-container'>
                    <Row gutter={24}>
                        <Col span={9}>
                            <GroupInfo {...this.state} toggleCollapsed={this.toggleCollapsedInfo.bind(this)}/>
                        </Col>
                        <Col span={9}>
                            <GroupRules {...this.state} toggleCollapsed={this.toggleCollapsedRules.bind(this)}/>
                        </Col>
                        <Col span={6}>
                            {this.props.username &&
                            <div align="center" style={{marginTop: 40}}>
                                {this.props.following ?
                                    <div style={{fontStyle: 'italic', color: '#40a9ff'}}>
                                        Don't want to follow this group anymore?
                                        <div style={{marginTop: 5}}>
                                            <Button type='primary'
                                                    onClick={() => this.props.stopFollowing(this.props.location.state.groupName, this.props.username)}
                                                    className='Create' icon='create'>Stop
                                                Following</Button>
                                        </div>
                                    </div>
                                    :
                                    <div style={{fontStyle: 'italic', color: '#40a9ff'}}>
                                        Like this group? Why not follow then
                                        <div style={{marginTop: 5}}>
                                            <Button type='primary'
                                                    onClick={() => this.props.startFollowing(this.props.location.state.groupName, this.props.username)}
                                                    className='Create'
                                                    icon='create'>Follow</Button>
                                        </div>
                                    </div>
                                }
                                <div style={{marginTop: 10, fontStyle: 'italic', color: 'red'}}>
                                    Feel inspired? Add your story to this group
                                    <div style={{marginTop: 5}}>
                                        <Button type='danger'
                                                onClick={() => this.props.history.push({
                                                    pathname: '/groups/create_story',
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
                            <ListAllGroupStories {...this.props} {...this.state} data={storiesSortedByDateCreate}/>
                        </div>
                    </Row>
                </div>
                </Row>
            </div>
        );
    }
}

const SingleGroups = withFollowing(BasicSingleGroup)

export default SingleGroups;