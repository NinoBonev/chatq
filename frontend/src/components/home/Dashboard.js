/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';
import {Tabs, Button} from 'antd';
import DashboardFollowedGroups from './DashboardFollowedGroups';
import DashboardMyStories from './DashboardMyStories';
import DashboardMyChallenges from './DashboardMyChallenges';
import DashboardFollowedPeople from './DashboardFollowedPeople';
import withModal from '../hoc/withModal'
import moment from 'moment/moment';

const MyChallenges = withModal(DashboardMyChallenges)
const MyStories = withModal(DashboardMyStories)
const FollowedGroups = withModal(DashboardFollowedGroups)
const FollowedPeople = withModal(DashboardFollowedPeople)

const TabPane = Tabs.TabPane;

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.Helper.dashboardInitialState()
        this.setKey = this.setKey.bind(this);
    }


    async componentDidMount() {
        let res = await this.props.Crud.getUserInfo(this.props.Auth.getProfile().id);

        if (res.success) {
            this.setState({
                avatar: res.body.avatar,
                myChallenges: res.body.challenges,
                email: res.body.email,
                username: res.body.username,
            });
            for (let story of res.body.stories) {
                let currentStory = await this.props.Crud.getStoryById(story);

                if (currentStory.success) {
                    this.setState(prevState => ({
                        myStories: [...prevState.myStories, currentStory.body]
                    }));
                }
            }

            for (let person of res.body.followUsers) {
                let newRes = await this.props.Crud.getUserInfo(person);

                if (newRes.success) {
                    this.setState(prevState => ({
                        followPeople: [...prevState.followPeople, res.body]
                    }));
                    for (let storyId of newRes.body.stories) {
                        this.props.Crud.getStoryById(storyId).then((story) => {

                            story.body.username = newRes.body.username;
                            story.body.avatar = newRes.body.avatar;

                            this.setState(prevState => ({
                                storiesFromPeople: [...prevState.storiesFromPeople, story.body],
                            }));
                        });
                    }

                    for (let challengeId of newRes.body.challenges) {
                        this.props.Crud.getStoryById(challengeId).then((story) => {
                            story.body.username = newRes.body.username;
                            story.body.avatar = newRes.body.avatar;

                            this.props.Crud.getChallengeById(story.body.challenge).then((challenge) => {
                                if (moment(challenge.body.deadlineDate).isBefore(moment.now())){
                                    this.setState(prevState => ({
                                        storiesFromPeople: [...prevState.storiesFromPeople, story.body]
                                    }));
                                }
                            })
                        })
                    }
                }
            }

            for (let group of res.body.followGroup) {
                let newRes = await this.props.Crud.getGroupById(group);
                if (newRes.success) {
                    this.setState(prevState => ({
                        followGroup: [...prevState.followGroup, newRes.body],
                    }));

                    for (let story of newRes.body.stories) {
                        this.props.Crud.getUserInfo(story.createdBy).then((user) => {
                            if (story.createdBy !== this.props.Auth.getProfile().id) {
                                story.avatar = user.body.avatar;
                                story.username = user.body.username;
                                story.groupName = newRes.body.name;
                                story.groupId = newRes.body._id;

                                this.setState(prevState => ({
                                    storiesFromGroups: [...prevState.storiesFromGroups, story],
                                }));
                            }
                        });
                    }
                }
            }
        }
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    render() {
        const operations = <div style={{fontStyle: 'italic', marginRight: 20}}>
            Have a new story to share? Tell it to the world then.
            <Button style={{marginLeft: 15}} type='primary' onClick={() => this.props.history.push({
                pathname: '/story/create'
            })} className='Create' icon='create'>Create Story</Button>
        </div>;

        return (
            <div className='default-panel'>
                    <Tabs style={{marginLeft: 25}} onChange={this.setKey} activeKey={this.state.activeKey}
                          tabBarExtraContent={operations}>
                        <TabPane tab="Chatq" key="1">
                            <Tabs style={{marginBottom: 30}} tabPosition='left'>
                                <TabPane tab="Groups you follow" key="1">

                                    <FollowedGroups
                                        {...this.state}
                                        {...this.props}
                                    />
                                </TabPane>
                                <TabPane tab="People you follow" key="2">
                                    <FollowedPeople
                                        {...this.state}
                                        {...this.props}
                                    />
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="My Stories" key="2">
                            <MyStories
                                {...this.state}
                                {...this.props}
                            /></TabPane>
                        <TabPane tab="My Challenges" key="3">
                            <MyChallenges
                                {...this.state}
                                {...this.props} />
                        </TabPane>
                    </Tabs>
            </div>
        );
    }
}