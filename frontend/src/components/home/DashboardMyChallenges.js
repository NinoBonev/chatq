/**
 * Created by NinoB on 2.3.2019 г.
 */

import React from 'react'
import {Row, Col, Card, Icon, Popconfirm, Button, message} from 'antd'
import BasicModal from '../story/BasicModal'
import moment from 'moment'

const {Meta} = Card;

export default class DashboardMyChallenges extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            challenges: [],
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.fetchAllStories()
        this.setState({isLoading: false})
    }

    fetchAllStories() {
        this.setState({
            challenges: this.props.myChallenges
        })
    }

    async handleDelete(id) {
        let res = await this.props.Crud.deleteStoryById(id)
        if (res.success) {
            message.success("Story deleted successfully")
            this.setState({
                challenges: []
            })
            this.fetchAllStories()
        }
    }

    render() {
        return (
            <Row gutter={16}>
                <div className='main-data-container'>
                    <Col offset={1} span={2}>
                        <div align="right" className='dashboard-side-menu-header'>
                            Menu
                        </div>
                    </Col>
                    <Col span={20}>
                    {this.state.challenges.length > 0 ? <div>{this.state.challenges.map((chal) =>
                        <Col span={8}>
                            <div className='cardZoomIn'>
                                <Card
                                    style={{marginBottom: 20}}
                                    cover={<div className='imageFadeOut'><img
                                        onClick={() => this.props.showModal(chal.id, chal.name)}
                                        src={chal.cover} alt="" style={{width: '100%'}}/></div>}
                                    actions={moment(chal.deadlineDate).isAfter(moment.now()) ?
                                        [<Popconfirm title="Are you sure delete this story?"
                                                     onConfirm={() => this.handleDelete(chal.id)} okText="Yes"
                                                     cancelText="No">
                                            <Icon type="delete"/>
                                            <span style={{marginLeft: 10}}>delete
                                </span>
                                        </Popconfirm>,
                                            <Popconfirm title="Are you sure edit this story?"
                                                        onConfirm={() => this.props.history.push(
                                                            {pathname: `/challenges/edit_story/${chal.id}`})}
                                                        okText="Yes" cancelText="No">
                                                <Icon type="edit"/><span style={{marginLeft: 10}}>edit</span>
                                            </Popconfirm>] :
                                        [<div style={{fontStyle: 'italic', fontSize: 12}}>
                                            You can not edit stories from closed challenges
                                        </div>]}
                                > <Meta
                                    title={<a style={{color: 'black'}}
                                              onClick={() => this.props.showModal(chal.id, chal.name)}>
                                        {chal.name}
                                    </a>}
                                />
                                    <div
                                        style={{marginTop: 20, minHeight: 120}}>{chal.info.substring(0, 300) !== chal.info ?
                                        chal.info.substring(0, 300) + '...'

                                        :
                                        chal.info}</div>
                                </Card>
                            </div>
                        </Col>)}
                    </div>

                    :
                    <div>
                    <h1 style={{top: 20}} align="center">Seems that you are not involved into any challenges yet</h1>
                        <div align="center" style={{marginTop: 20, fontSize: 16}}>Browse our challenges so you can find one that you like</div>
                        <div align="center" style={{marginTop: 10}}><Button onClick={() =>
                        this.props.history.push("/challenges")
                    }>Challenges</Button>
                        </div>
                    </div>}
                    </Col>
                    <BasicModal {...this.props}/>
                </div>
            </Row>
        )
    }
}
