/**
 * Created by NinoB on 24.2.2019 г.
 */

import React from 'react';
import {Tabs, message} from 'antd';
import moment from 'moment';
import Login from '../forms/LoginPage';
import AllCurrentChallengesTab from './AllCurrentChallengesTab';
import AllOldChallengesTab from './AllOldChallengesTab';

const TabPane = Tabs.TabPane;


//TODO Separate the old challenges ---> Ongoing voting (1 month voting time) -----> Old challenge
export default class AllChallengesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeChallenges: [],
            oldChallenges: [],
            activeKey: '1'
        };

        this.setKey = this.setKey.bind(this);
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    componentDidMount() {
        this.props.Crud.getAllChallenges().then((res) => {
            for (let challenge of res) {
                    let date = moment(challenge.deadlineDate).utc();

                    if (!date.isSameOrBefore(moment.now())) {
                        this.setState(prevState => ({
                            activeChallenges: [...prevState.activeChallenges, challenge]
                        }));
                        console.log(this.state);
                    } else {
                        this.setState(prevState => ({
                            oldChallenges: [...prevState.oldChallenges, challenge]
                        }));
                    }
                }
        }).catch((err) => {
            message.error('Error');
        });
    }


    render() {
        let activeChallengesSortedByDateCreate = this.state.activeChallenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        let oldChallengesSortedByDateCreate = this.state.oldChallenges.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return (
            <div className='default-panel'>
                <Tabs style={{marginLeft: 25}} onChange={this.setKey} activeKey={this.state.activeKey}>
                    <TabPane tab="Join a challenge " key="1">
                        <AllCurrentChallengesTab {...this.props} challenges={activeChallengesSortedByDateCreate}/>
                    </TabPane>
                    {this.props.isAuth ?
                        <TabPane tab="Old challenges" key="2">
                            <AllOldChallengesTab {...this.props} challenges={oldChallengesSortedByDateCreate}/>
                        </TabPane>

                        :

                        null
                    }
                </Tabs>
            </div>

        );
    }
}


