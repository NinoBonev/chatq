/**
 * Created by NinoB on 2.3.2019 г.
 */

import React from 'react'
import {Row, Col, Card, Icon, Popconfirm, message} from 'antd'
import BasicModal from './BasicModal'
import moment from 'moment'

const {Meta} = Card;

export default class DashboardMyChallenges extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            challenges: [],
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.fetchAllStories()
        this.setState({isLoading: false})
    }

    fetchAllStories(){
        for (let challenge of this.props.myChallenges) {
            this.props.Crud.getStoryById(challenge).then((res) => {
                if (res.success) {
                    this.props.Crud.getChallengeById(res.body.challenge).then((challengeInfo) => {
                        res.body.deadlineDate = challengeInfo.body.deadlineDate
                        this.setState(prevState => (
                            { challenges: [...prevState.challenges , res.body]
                            }));
                    })
                }
            }).catch((err) => {
                message.error("Error");
            });
        }
    }

    handleDelete(id){
        console.log(id);
        this.props.Crud.deleteStoryFromChallengeById(id).then((res) => {
            if(res.success){
                message.success("Story deleted successfully")
                this.setState({
                    challenges: []
                })
                this.fetchAllStories()
            }
        })
    }

    render () {
        let myChallengesSortedByDateCreate = this.state.challenges.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        return(
            <Row gutter={16}>
            <div>{myChallengesSortedByDateCreate.length > 0 ? <div>{myChallengesSortedByDateCreate.map((chal) =>
                <Col span={8}>
                    <Card
                        style={{marginBottom: 20}}
                        hoverable
                        cover={<img onClick={() => this.props.showModal(chal._id)}
                                    src={chal.cover} alt="" style={{width: '100%'}}/>}
                        actions={moment(chal.deadlineDate).isAfter(moment.now()) ? [<Popconfirm title="Are you sure delete this story?" onConfirm={() => this.handleDelete(chal._id)} okText="Yes" cancelText="No">
                            <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                        </Popconfirm>,
                            <Popconfirm title="Are you sure edit this story?" onConfirm={() => this.props.history.push({pathname: `/challenge/edit/${chal._id}`})} okText="Yes" cancelText="No">
                                <Icon type="edit"/><span style={{marginLeft: 10}}>edit</span>
                            </Popconfirm>] : [<div style={{fontStyle: 'italic', fontSize: 12}}>You can not edit stories from closed challenges</div>]}
                    > <Meta
                        title={<a style={{color: 'black'}} onClick={() => this.props.showModal(chal._id)}>
                            {chal.name}
                            </a>}
                    />
                        <div style={{marginTop: 20, minHeight: 120}}>{chal.info.substring(0, 300) !== chal.info ?
                            chal.info.substring(0, 300) + '...'

                            :
                            chal.info}</div>
                    </Card>
                </Col>)}
                </div>

                :

                <h1 style={{top: 20}} align="center">Please join some of our challenges</h1>}
                <BasicModal {...this.props}/>
                </div>
            </Row>
        )
    }
}
