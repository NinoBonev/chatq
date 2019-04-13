import React from 'react'
import {Row , Button} from 'antd'
import {message} from "antd/lib/index";
import withFollowingUser from "../../hoc/withFollowingUser";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class UserSubHeaderClass extends React.Component{


    render(){
        return (
            <div className='sub-header'>
                <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '30%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name' style={{
                                    color: '#45b4bf'
                                }}>Browse all <span style={{
                                    color: 'black'
                                }}>{this.props.user}</span> stories from: </span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link' onClick={() => {
                                    this.props.setContentKey('userStories')
                                }}>Groups</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '1%'
                    }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link' onClick={() => {
                                    this.props.setContentKey('userChallenges')
                                }}>Challenges</span>
                            </DemoBox>
                        </span>
                    {this.props.user &&
                    <span style={{
                        marginLeft: '1%',
                        marginBottom: 15
                    }}>
                            {this.props.followCurrentUser ?
                                <span style={{
                                    height: 50,
                                }}>
                                        <Button type='primary'
                                                style={{
                                                    border: '#45b4bf solid 1px',
                                                    backgroundColor: 'white',
                                                    color: '#45b4bf'
                                                }}
                                                onClick={() => this.props.stopFollowing(this.props.myUsername,
                                                    this.props.user)}
                                                icon='create'>
                                            Stop Following
                                        </Button>
                                    </span>
                                :
                                <span>
                                        <Button type='primary'
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: '#45b4bf',
                                                    color: 'white'
                                                }}
                                                onClick={() => this.props.startFollowing(this.props.myUsername,
                                                    this.props.user)}
                                                icon='create'>
                                            Follow
                                        </Button>
                                    </span>
                            }
                        </span>}
                </Row>
            </div>
        )
    }
}

const UserSubHeader = withFollowingUser(UserSubHeaderClass)

export default UserSubHeader