/**
 * Created by NinoB on 24.2.2019 г.
 */

import React from 'react';
import {Tabs, Row, message} from 'antd';
import moment from 'moment';
import Login from '../forms/LoginPage';
import AllCurrentChallengesTab from './AllCurrentChallengesTab';
import AllOldChallengesTab from './AllOldChallengesTab';
import Cover from '../../resources/history4.jpg'

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
        window.scrollTo(0,0);
        this.props.setSubHeaderKey('allChallenges');
        this.props.setContentKey('activeChallenges');
        this.props.setHeaderCoverVisibility(true)

        this.props.Crud.getAllChallenges().then((res) => {
            if (res.success){
                this.props.setHeaderCoverSource(Cover)
                for (let challenge of res.body) {
                    console.log(challenge);
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

    componentWillUnmount(){
        this.props.setHeaderCoverVisibility(false)
        this.props.setContentKey('')
    }


    render() {
        let content = {
            activeChallenges: <AllCurrentChallengesTab
                {...this.state}
                {...this.props}
            />,
            pastChallenges: <AllOldChallengesTab
                {...this.state}
                {...this.props}
            />,
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


