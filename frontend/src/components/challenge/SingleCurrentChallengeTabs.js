/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {Tabs} from 'antd'
import SingleCurrentChallengeInfo from './SingleCurrentChallengeInfo'
import {message, Row, Col} from 'antd/lib/index';
import AllGroupStories from '../group/AllGroupStories';
import withModal from "../hoc/withModal";

const TabPane = Tabs.TabPane;
const ListAllGroupStories = withModal(AllGroupStories)

class SingleCurrentChallengeTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            stories: []
        };

    }

    componentDidMount() {
        this.props.setSubHeaderKey('singleChallenge');

        this.props.Crud.getChallengeById(this.props.match.params.id).then((res) => {
            this.props.setHeaderCoverAvatar(res.body.cover)
            this.props.setHeaderCoverGroupInfo(
                res.body.name,
                '',
                '')
            if (res.success) {
                for (let storyById of res.body.storiesById) {
                    this.props.Crud.getStoryById(storyById).then((story) => {

                        if (story.success) {
                            this.props.Crud.getUserInfo(story.body.username).then((user) => {

                                if (user.success) {
                                    story.body.avatar = user.body.avatar;

                                    this.setState(prevState => ({
                                        stories: [...prevState.stories, story.body]
                                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    }));
                                } else {
                                    message.error(user.body)
                                }
                            });
                        } else {
                            message.error(story.body)
                        }
                    })
                }
            } else {
                message.error(res.body)
            }

        })
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    componentWillUnmount() {
        this.props.setContentKey('')
        this.props.setHeaderCoverVisibility(false);
        this.props.setHeaderCoverAvatar('');
        this.props.setSubHeaderKey('')
        this.props.setSubHeaderLocation('')
        this.props.clearHeaderCoverGroupInfo()
    }

    render() {
        return (
            <div className='default-panel'>
                <Tabs style={{marginLeft: 25}} onChange={this.setKey.bind(this)} activeKey={this.state.activeKey}>
                    <TabPane tab="Challenge Info" key="1">
                        <SingleCurrentChallengeInfo {...this.props}/>
                    </TabPane>
                    {this.props.isAdmin ?
                        <TabPane tab="See current stories" key="2">
                            <div>
                                <ListAllGroupStories {...this.props} {...this.state}/>
                            </div>
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