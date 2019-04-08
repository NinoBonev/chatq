import React from 'react'
import {Row, Col, Button} from 'antd'

import withFollowing from '../../hoc/withFollowing'
import GroupInfo from "../../group/GroupInfo";
import GroupRules from "../../group/GroupRules";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class SingleGroupSubHeaderClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            infoVisible: false,
            rulesVisible: false
        }
    }

    showInfo = () => {
        this.setState({
            infoVisible: true,
        });
    }

    handleInfoOk = (e) => {
        console.log(e);
        this.setState({
            infoVisible: false,
        });
    }

    handleInfoCancel = (e) => {
        console.log(e);
        this.setState({
            infoVisible: false,
        });
    }
    showRules = () => {
        this.setState({
            rulesVisible: true,
        });
    }

    handleRulesOk = (e) => {
        console.log(e);
        this.setState({
            rulesVisible: false,
        });
    }

    handleRulesCancel = (e) => {
        console.log(e);
        this.setState({
            rulesVisible: false,
        });
    }

    render() {
        let cover = this.props.headerCoverSource

        return (
            <div className='sub-header'>
                <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name'>Group::Name</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link' onClick={() => this.showInfo()}
                                >Info</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '1%'
                    }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link' onClick={() => this.showRules()}>
                                    Rules</span>
                            </DemoBox>
                        </span>
                    {this.props.username &&
                    <span style={{
                        marginLeft: '1%'
                    }}>
                            {this.props.following ?
                                <span className='sub-header-link'>
                                        <Button type='primary'
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'chocolate',
                                                    color: 'white'
                                                }}
                                                onClick={() => this.props.stopFollowing(this.props.location.state.groupName,
                                                    this.props.username)}
                                               icon='create'>
                                            Stop Following
                                        </Button>
                                    </span>
                                :
                                <span className='sub-header-link'>
                                        <Button type='primary'
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'chocolate',
                                                    color: 'white'
                                                }}
                                                onClick={() => this.props.startFollowing(this.props.location.state.groupName,
                                                    this.props.username)}
                                                icon='create'>
                                            Follow
                                        </Button>
                                    </span>
                            }
                        </span>}
                    {this.props.username &&
                    <span style={{
                        marginLeft: '1%'
                    }}>
                        <span className='sub-header-link'>
                            <Button
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'white',
                                        color: 'chocolate'
                                    }}
                                    onClick={() => this.props.history.push({
                                        pathname: '/groups/create_story',
                                        state: this.props.group_name
                                    })} className='Create' icon='create'>
                                Add Story
                            </Button>
                        </span>
                    </span>}
                </Row>
                <GroupInfo {...this.state}
                           handleOk={this.handleInfoOk.bind(this)}
                           handleCancel={this.handleInfoCancel.bind(this)}/>
                <GroupRules {...this.state}
                            handleOk={this.handleRulesOk.bind(this)}
                            handleCancel={this.handleRulesCancel.bind(this)}/>
            </div>
        )
    }

}

const SingleGroupSubHeader = withFollowing(SingleGroupSubHeaderClass)

export default SingleGroupSubHeader