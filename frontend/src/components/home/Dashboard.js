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
import {message} from "antd/lib/index";

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


    componentDidMount() {
       this.props.Crud.getUserInfo(this.props.Auth.getUsername()).then(async (res) => {
           this.setState({
               avatar: res.avatar,
               email: res.email,
               username: res.username,
           });

           await this.fetchAllStories();

           for (let storyId of res.challengesById) {
               await this.props.Crud.getStoryById(storyId).then((story) => {
                   this.setState(prevState => ({
                       myChallenges: [...prevState.myChallenges, story]
                   }));
               });
           }

           for (let person of res.followingUsersByUsername) {
              await this.props.Crud.getUserInfo(person).then((newRes) => {
                  this.setState(prevState => ({
                      followPeople: [...prevState.followPeople, newRes]
                  }));

                  for (let storyId of newRes.stories) {
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
                              if (moment(challenge.deadlineDate).isBefore(moment.now())){
                                  this.setState(prevState => ({
                                      storiesFromPeople: [...prevState.storiesFromPeople, story]
                                  }));
                              }
                          })
                      })
                  }
              });
           }

           for (let group of res.followingGroupsByName) {
               await this.props.Crud.getGroupById(group).then((newRes) => {
                   this.setState(prevState => ({
                       followGroup: [...prevState.followGroup, newRes],
                   }));

                   for (let story of newRes.stories) {
                       this.props.Crud.getUserInfo(story.createdBy).then((user) => {
                           this.props.Auth.getProfile().then((profile) => {
                               if (story.createdBy !== profile.id) {
                                   story.avatar = user.body.avatar;
                                   story.username = user.body.username;
                                   story.groupName = newRes.body.name;
                                   story.groupId = newRes.body._id;

                                   this.setState(prevState => ({
                                       storiesFromGroups: [...prevState.storiesFromGroups, story],
                                   }));
                               }
                           })

                       });
                   }
               });
           }
       })

    }

    fetchAllStories(){
        this.props.Crud.getUserInfo(this.props.Auth.getUsername()).then(async (res) => {
            for (let storyId of res.storiesById) {
                this.props.Crud.getStoryById(storyId).then((story) => {
                    this.setState(prevState => ({
                        myStories: [...prevState.myStories, story]
                    }));
                });
            }
        })
    }

    handleStoryDelete = async (id) => {
        let res = await this.props.Crud.deleteStoryById(id)
        if (res.success) {
            message.success(res.body)
            this.setState({
                myStories: []
            });
            await this.fetchAllStories()
        }
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    render() {
        const operations = <div style={{fontStyle: 'italic', marginRight: 20}}>
            Have a new story to share? Tell it to the world then.
            <Button style={{marginLeft: 15}} type='primary' onClick={() => this.props.history.push({
                pathname: '/groups/create_story'
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
                                handleStoryDelete={this.handleStoryDelete.bind(this)}
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