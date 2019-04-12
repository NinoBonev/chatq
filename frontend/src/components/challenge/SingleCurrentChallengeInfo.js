/**
 * Created by NinoB on 5.3.2019 г.
 */

import React, {Component} from 'react';
import {Row, Col, Card, Statistic, Button, message} from 'antd';

const {Meta} = Card;
const Countdown = Statistic.Countdown;

class SingleCurrentChallengeInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeKey: '1',
            stories: []
        };

    }

    componentDidMount() {
        this.props.Crud.getChallengeById(this.props.match.params.id).then((res) => {
            if (res.success){
                this.setState(prevState => ({
                    name: res.body.name,
                    cover: res.body.cover,
                    info: res.body.info,
                    deadlineDate: res.body.deadlineDate,
                }));
            } else {
                message.error(res.body)
            }

        })
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    render() {
        //TODO: Sorting is not working
        return (

            <div style={{margin: 30}} className="login-form">
                <Row gutter={16}>
                    <Col span={8}>
                        <div align="center" style={{margin: 30}}>
                            <img src={this.state.cover} width='100%' alt=""/>
                            <div style={{marginTop: 20, fontSize: 24, color: 'red'}}>Time left to join:</div>
                            <div style={{marginTop: 10,}}><Countdown value={this.state.deadlineDate}
                                                                     format="D day HHh:mm:ss"/></div>
                            <div style={{fontSize: 18, marginTop: 10, color: 'red'}}>Have your great story to add?</div>
                            <Button type='danger' style={{marginTop: 10}}
                                    onClick={() => this.props.history.push({
                                        pathname: '/challenges/create_story',
                                        state: this.state.name
                                    })}
                                    className='Create' icon='create'>
                                Add your story
                            </Button>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div align="center">
                            <div style={{fontSize: 30, marginTop: 20}}>{this.state.name}</div>
                            <Col span={18} offset={3}>
                                <div style={{fontSize: 18, marginTop: 20}}>{this.state.info}</div>
                            </Col>

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SingleCurrentChallengeInfo;