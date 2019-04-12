/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';
import {Tabs, Button, Row, Col} from 'antd';
import DashboardFollowedGroups from './DashboardFollowedGroups';
import DashboardMyStories from './DashboardMyStories';
import DashboardMyChallenges from './DashboardMyChallenges';
import DashboardFollowedPeople from './DashboardFollowedPeople';
import withModal from '../hoc/withModal'
import moment from 'moment/moment';
import {message} from "antd/lib/index";
import Header from "../common/Header";

const MyChallenges = withModal(DashboardMyChallenges)
const MyStories = withModal(DashboardMyStories)
const FollowedGroups = withModal(DashboardFollowedGroups)
const FollowedPeople = withModal(DashboardFollowedPeople)

const TabPane = Tabs.TabPane;

export default class Dashboard extends React.Component {


    constructor(props) {
        super(props);

        this.state = this.props.Helper.dashboardInitialState()
    }

    componentDidMount() {

            this.props.setSubHeaderKey('dashboard')

            let user = this.props.Auth.getProfile();

            let {avatar, username} = user;
            this.setState({
                avatar,
                username,
                storiesFromPeople: [],
                storiesFromGroups: [],
                followPeople: [],
                followGroup: []
            });

            this.props.Crud.getUserInfo(username).then((res) => {
                if (res.success){
                    this.fetchAllMyStories(res.body.storiesById);
                    this.fetchAllMyChallenges(res.body.challengesById);
                    this.fetchAllStoriesFromFollowedUser(res.body.followingUsersByUsername)
                    this.fetchAllStoriesFromGroupsFollowed(res.body.followingGroupsByName);
                } else {
                    message.error(res.body)
                }
            })


    }

    fetchAllMyStories(storiesById) {
        for (let storyId of storiesById) {
            this.props.Crud.getStoryById(storyId).then((res) => {

                if (res.success){
                    this.setState(prevState => ({
                        myStories: [...prevState.myStories, res.body]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    }));
                } else {
                    message.error(res.body)
                }
            });
        }
    }

    fetchAllMyChallenges(challengesById) {
        for (let storyId of challengesById) {
            this.props.Crud.getStoryById(storyId).then((res) => {

                if (res.success){
                    this.setState(prevState => ({
                        myChallenges: [...prevState.myChallenges, res.body]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    }));
                } else {
                    message.error(res.body)
                }
            });
        }
    }

    fetchAllStoriesFromFollowedUser(followingUsersByUsername) {
        for (let person of followingUsersByUsername) {
            this.props.Crud.getUserInfo(person).then((newRes) => {

                if (newRes.success){
                    for (let storyId of newRes.body.storiesById) {
                        this.props.Crud.getStoryById(storyId).then((res) => {

                            if (res.success){
                                res.body.username = newRes.body.username;
                                res.body.avatar = newRes.body.avatar;

                                this.setState(prevState => ({
                                    storiesFromPeople: [...prevState.storiesFromPeople, res.body]
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                                }));
                            } else {
                                message.error(res.body)
                            }

                        });
                    }

                    for (let challengeId of newRes.body.challengesById) {
                        this.props.Crud.getStoryById(challengeId).then((res) => {

                            if (res.success) {
                                res.body.username = newRes.body.username;
                                res.body.avatar = newRes.body.avatar;

                                this.props.Crud.getChallengeById(res.body.challengeId).then((challenge) => {
                                    if (moment(challenge.deadlineDate).isBefore(moment.now())) {
                                        this.setState(prevState => ({
                                            storiesFromPeople: [...prevState.storiesFromPeople, res.body]
                                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        }));
                                    }
                                })
                            } else {
                                message.error(res.body)
                            }
                        })
                    }
                } else {
                    message.error(newRes.body)
                }

            });
        }
    }

    fetchAllStoriesFromGroupsFollowed(followingGroupsByName) {
        for (let group of followingGroupsByName) {
            this.props.Crud.getGroupById(group).then((newRes) => {

                if (newRes.success){
                    for (let storyById of newRes.body.storiesById) {
                        this.props.Crud.getStoryById(storyById).then((res) => {

                            if (res.success){
                                this.props.Crud.getUserInfo(res.body.username).then((user) => {

                                    if (user.success){
                                        if (res.body.username !== this.props.Auth.getProfile().username) {
                                            res.body.avatar = user.body.avatar;
                                            res.body.username = user.body.username;
                                            res.body.groupName = newRes.body.name;
                                            res.body.groupId = newRes.body.id;

                                            this.setState(prevState => ({
                                                storiesFromGroups: [...prevState.storiesFromGroups, res.body]
                                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
                                            }));

                                        }
                                    } else {
                                        message.error(user.body)
                                    }
                                });
                            } else {
                                message.error(res.body)
                            }
                        })
                    }
                } else {
                    message.error(newRes.body)
                }
            });
        }
    }

    componentWillUnmount(){
        this.props.setContentKey('followedGroups')
    }

    render() {
        const operations = <div style={{fontStyle: 'italic', marginRight: 20}}>
            Have a new story to share? Tell it to the world then.
            <Button style={{marginLeft: 15}} type='primary' onClick={() => this.props.history.push({
                pathname: '/groups/create_story'
            })} className='Create' icon='create'>Create Story</Button>
        </div>

        let content = {
            followedGroups: <FollowedGroups
                {...this.state}
                {...this.props}
            />,
            followedPeople: <FollowedPeople
                {...this.state}
                {...this.props}
            />,
            myStories: <MyStories
                {...this.state}
                {...this.props}
            />,
            myChallenges: <MyChallenges
                {...this.state}
                {...this.props} />

        }


        return (
            <div>
                <Row gutter={32}>
                    <div className='dashboard-data-container'>
                        {content[this.props.contentKey]}
                    </div>
                </Row>
            </div>
        );
    }
}