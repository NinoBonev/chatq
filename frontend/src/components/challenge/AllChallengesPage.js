/**
 * Created by NinoB on 24.2.2019 г.
 */

import React from 'react';
import {Tabs, Row, message} from 'antd';
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
        this.props.setSubHeaderKey('allChallenges')

        this.props.Crud.getAllChallenges().then((res) => {
            if (res.success){
                for (let challenge of res.body) {
                    let date = moment(challenge.deadlineDate).utc();

                    if (!date.isSameOrBefore(moment.now())) {
                        this.setState(prevState => ({
                            activeChallenges: [...prevState.activeChallenges, challenge]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        }));
                    } else {
                        this.setState(prevState => ({
                            oldChallenges: [...prevState.oldChallenges, challenge]
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        }));
                    }
                }
            } else {
                message.error(res.body)
            }
        })
    }


    render() {
        return (
            <div>
                <Row>
                    <div className='main-data-container'>
                        <Tabs style={{marginLeft: 25}} onChange={this.setKey} activeKey={this.state.activeKey}>
                            <TabPane tab="Join a challenge " key="1">
                                <AllCurrentChallengesTab {...this.props} {...this.state}/>
                            </TabPane>
                            {this.props.isAuth ?
                                <TabPane tab="Old challenges" key="2">
                                    <AllOldChallengesTab {...this.props} {...this.state}/>
                                </TabPane>

                                :

                                null
                            }
                        </Tabs>
                    </div>
                </Row>
            </div>
        );
    }
}


