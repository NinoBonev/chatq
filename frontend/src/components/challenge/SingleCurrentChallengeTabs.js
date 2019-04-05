/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {Tabs} from 'antd'
import SingleCurrentChallengeInfo from './SingleCurrentChallengeInfo'
import {message} from 'antd/lib/index';
import AllGroupStories from '../group/AllGroupStories';
import withModal from "../hoc/withModal";

const TabPane = Tabs.TabPane;
const ListAllGroupStories = withModal(AllGroupStories)

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

                for (let storyById of res.storiesById) {
                    this.props.Crud.getStoryById(storyById).then((story) => {
                        this.props.Crud.getUserInfo(story.username).then((user) => {
                            story.avatar = user.avatar;

                            this.setState(prevState => ({
                                stories: [...prevState.stories, story]
                            }));
                        });
                    })

                }
        }).catch((err) => {
            message.error("Error");
        });
    }

    setKey(key) {
        this.setState({subHeaderKey: key});
    }

    render(){
        let storiesSortedByDateCreate = this.state.stories.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        return(
            <div className='default-panel'>
            <Tabs style={{marginLeft: 25}} onChange={this.setKey.bind(this)} activeKey={this.state.subHeaderKey}>
                <TabPane tab="Challenge Info" key="1">
                    <SingleCurrentChallengeInfo {...this.props}/>
                </TabPane>
                {this.props.isAdmin ?
                    <TabPane tab="See current stories" key="2">
                        <ListAllGroupStories {...this.props} data={storiesSortedByDateCreate}/>
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