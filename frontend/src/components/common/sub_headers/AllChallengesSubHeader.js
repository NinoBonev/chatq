import React from 'react'
import {Row, Button} from 'antd'

import GroupInfo from "../../group/GroupInfo";
import GroupRules from "../../group/GroupRules";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AllChallengesSubHeader extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='sub-header'>
                <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span style={{
                                    marginBottom: 3
                                }} className='sub-header-name' style={{
                                    color: '#45b4bf'
                                }}>Challenges</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span  className='sub-header-link' onClick={() => {
                                    this.props.setContentKey('activeChallenges')
                                }}>Active Challenges</span>
                            </DemoBox>
                        </span>
                    {this.props.Auth.isLoggedIn && <span style={{
                        marginLeft: '1%'
                    }}>
                           <DemoBox value={60}>
                                <span  className='sub-header-link' onClick={() => {
                                    this.props.setContentKey('pastChallenges')
                                }}>Past Challenges</span>
                            </DemoBox>
                        </span>}
                </Row>
            </div>
        )
    }
}