/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';
import {Button, Row} from 'antd';
import DashboardFollowedGroups from './DashboardFollowedGroups';
import DashboardMyStories from './DashboardMyStories';
import DashboardMyChallenges from './DashboardMyChallenges';
import DashboardFollowedPeople from './DashboardFollowedPeople';
import withModal from '../hoc/withModal'
import moment from 'moment/moment';
import {message} from "antd/lib/index";
import Cover from '../../resources/9459329810_4ae305db6e_k.jpg'

const MyChallenges = withModal(DashboardMyChallenges)
const MyStories = withModal(DashboardMyStories)
const FollowedGroups = withModal(DashboardFollowedGroups)
const FollowedPeople = withModal(DashboardFollowedPeople)

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.dashboardInitialState()
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.clearHeaderCoverGroupInfo()
        this.props.setSubHeaderKey('dashboard')
        this.props.setContentKey('followedGroups')
        this.props.setHeaderCoverVisibility(true)
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
            if (res.success) {
                console.log(res);
                this.props.setHeaderCoverSource(Cover)
                this.props.setHeaderCoverAvatar(res.body.avatar)
                this.props.setHeaderCoverUserInfo(
                    res.body.name,
                    username,
                    res.body.followersByUsername.length,
                    res.body.followingUsersByUsername.length,
                    res.body.followingGroupsByName.length,
                    res.body.storiesById.length)
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

                if (res.success) {
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

                if (res.success) {
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

                if (newRes.success) {
                    for (let storyId of newRes.body.storiesById) {
                        this.props.Crud.getStoryById(storyId).then((res) => {

                            if (res.success) {
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

                if (newRes.success) {
                    for (let storyById of newRes.body.storiesById) {
                        this.props.Crud.getStoryById(storyById).then((res) => {

                            if (res.success) {
                                this.props.Crud.getUserInfo(res.body.username).then((user) => {

                                    if (user.success) {
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

    componentWillUnmount() {
        this.props.setHeaderCoverVisibility(false)
        this.props.setHeaderCoverAvatar('')
        this.props.setContentKey('')
        this.props.clearHeaderCoverUserInfo()
    }

    render() {
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

        };

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