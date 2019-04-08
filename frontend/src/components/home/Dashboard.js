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
                this.fetchAllMyStories(res.storiesById);
                this.fetchAllMyChallenges(res.challengesById);
                this.fetchAllStoriesFromFollowedUser(res.followingUsersByUsername)
                this.fetchAllStoriesFromGroupsFollowed(res.followingGroupsByName);
            })


    }

    fetchAllMyStories(storiesById) {
        for (let storyId of storiesById) {
            this.props.Crud.getStoryById(storyId).then((story) => {
                this.setState(prevState => ({
                    myStories: [...prevState.myStories, story]
                }));
            });
        }
    }

    fetchAllMyChallenges(challengesById) {
        for (let storyId of challengesById) {
            this.props.Crud.getStoryById(storyId).then((story) => {
                this.setState(prevState => ({
                    myChallenges: [...prevState.myChallenges, story]
                }));
            });
        }
    }

    fetchAllStoriesFromFollowedUser(followingUsersByUsername) {
        for (let person of followingUsersByUsername) {
            this.props.Crud.getUserInfo(person).then((newRes) => {
                // this.setState(prevState => ({
                //     followPeople: [...prevState.followPeople, newRes]
                // }));

                for (let storyId of newRes.storiesById) {
                    this.props.Crud.getStoryById(storyId).then((story) => {

                        story.username = newRes.username;
                        story.avatar = newRes.avatar;

                        this.setState(prevState => ({
                            storiesFromPeople: [...prevState.storiesFromPeople, story],
                        }));
                    });
                }

                for (let challengeId of newRes.challengesById) {
                    this.props.Crud.getStoryById(challengeId).then((story) => {
                        story.username = newRes.username;
                        story.avatar = newRes.avatar;

                        this.props.Crud.getChallengeById(story.challenge).then((challenge) => {
                            if (moment(challenge.deadlineDate).isBefore(moment.now())) {
                                this.setState(prevState => ({
                                    storiesFromPeople: [...prevState.storiesFromPeople, story]
                                }));
                            }
                        })
                    })
                }
            });
        }
    }

    fetchAllStoriesFromGroupsFollowed(followingGroupsByName) {
        for (let group of followingGroupsByName) {
            this.props.Crud.getGroupById(group).then((newRes) => {
                // this.setState(prevState => ({
                //     followGroup: [...prevState.followGroup, newRes],
                // }));

                for (let storyById of newRes.storiesById) {
                    this.props.Crud.getStoryById(storyById).then((story) => {
                        this.props.Crud.getUserInfo(story.username).then((user) => {

                            if (story.username !== this.props.Auth.getProfile().username) {
                                story.avatar = user.avatar;
                                story.username = user.username;
                                story.groupName = newRes.name;
                                story.groupId = newRes.id;

                                this.setState(prevState => ({
                                    storiesFromGroups: [...prevState.storiesFromGroups, story],
                                }));

                            }

                        });
                    })
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