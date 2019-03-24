/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {Tabs} from 'antd'
import SingleCurrentChallengeInfo from './SingleCurrentChallengeInfo'
import {message} from 'antd/lib/index';
import AllGroupStories from '../group/AllGroupStories';

const TabPane = Tabs.TabPane;

class SingleCurrentChallengeTabs extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            stories: []
        };

    }

    componentDidMount() {
        this.props.Crud.getChallengeById(this.props.match.params.id).then((res) => {
            if (res.success) {
                for (let story of res.body.stories) {
                    this.props.Crud.getStoryById(story).then((getStory) => {

                        this.props.Crud.getUserInfo(getStory.body.createdBy).then((user) => {
                            getStory.body.avatar = user.body.avatar;
                            getStory.body.username = user.body.username;

                            this.setState(prevState => ({
                                stories: [...prevState.stories, getStory.body]
                            }));
                        });
                    })

                }

            } else {
                message.error(res.message);
            }
        }).catch((err) => {
            message.error("Error");
        });
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    render(){
        let storiesSortedByDateCreate = this.state.stories.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        return(
            <div className='default-panel'>
            <Tabs style={{marginLeft: 25}} onChange={this.setKey.bind(this)} activeKey={this.state.activeKey}>
                <TabPane tab="Challenge Info" key="1">
                    <SingleCurrentChallengeInfo {...this.props}/>
                </TabPane>
                {this.props.isAdmin ?
                    <TabPane tab="See current stories" key="2">
                        <AllGroupStories {...this.props} stories={storiesSortedByDateCreate}/>
                    </TabPane>

                    :

                    null
                }
            </Tabs>
            </div>
        )
    }
}

export default SingleCurrentChallengeTabs