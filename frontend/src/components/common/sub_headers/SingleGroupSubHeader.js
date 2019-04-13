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

    componentDidMount(){
        console.log(this.props);
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
        return (
            <div className='sub-header'>
                <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={50}>
                                <span className='sub-header-name' style={{
                                    color: '#45b4bf'
                                }}>
                                   {this.props.subHeaderLocation}</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={50}>
                                <span className='sub-header-link' onClick={() => this.showInfo()}
                                >Info</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '1%'
                    }}>
                            <DemoBox value={50}>
                                <span className='sub-header-link' onClick={() => this.showRules()}>
                                    Rules</span>
                            </DemoBox>
                        </span>
                    {this.props.username &&
                    <span style={{
                        marginLeft: '1%',
                        marginBottom: 15
                    }}>
                            {this.props.following ?
                                <span style={{
                                    height: 50,
                                }}>
                                        <Button type='primary'
                                                style={{
                                                    border: '#45b4bf solid 1px',
                                                    backgroundColor: 'white',
                                                    color: '#45b4bf'
                                                }}
                                                onClick={() => this.props.stopFollowing(this.props.subHeaderLocation,
                                                    this.props.username)}
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
                                                onClick={() => this.props.startFollowing(this.props.subHeaderLocation,
                                                    this.props.username)}
                                                icon='create'>
                                            Follow
                                        </Button>
                                    </span>
                            }
                        </span>}
                    {this.props.username &&
                    <span style={{
                        marginLeft: '1%',
                        marginBottom: 15
                    }}>
                        <span>
                            <Button
                                    style={{
                                        border: 'none',
                                        backgroundColor: '#202022',
                                        color: 'white'
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