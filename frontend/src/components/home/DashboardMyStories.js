/**
 * Created by NinoB on 2.3.2019 г.
 */


import React from 'react';
import {Row, Col, Card, Icon, Popconfirm, Button, message} from 'antd';
import BasicModal from '../story/BasicModal'

const {Meta} = Card;

export default class DashboardMyStories extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stories: [],
        };
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.fetchAllStories()
    }

    fetchAllStories() {
        this.setState({
            stories: this.props.myStories
        })
    }

    handleStoryDelete(id){
        this.props.Crud.deleteStoryById(id).then((res) => {
            if (res.success) {
                message.success(res.body);

                this.props.Crud.getUserInfo(this.props.username).then((user) => {
                    if (user.success){
                        this.setState({
                                stories: []
                            });
                        this.fetchAllStories()
                    } else {
                        message.error(user.body)
                    }
                })
            } else {
                message.error(res.body)
            }
        })
    }


    render() {
        return (
            <Row gutter={16}>
                <div className='main-data-container'>
                    <Col offset={1} span={2}>
                        <div align="right" style={{color: 'green'}}>
                            Menu
                        </div>
                        <div style={{
                            marginTop: 10
                        }}>
                            Something
                        </div>
                    </Col>
                    <Col span={20}>
                        {this.state.stories.length > 0 ? <div>{this.state.stories.map((str) =>
                                <div className='cardZoomIn'>
                                    <Col span={8}>
                                        <Card
                                            style={{marginBottom: 20}}
                                            cover={<div className='imageFadeOut'><img
                                                onClick={() => this.props.showModal(str.id, str.name)}
                                                src={str.cover} alt="" style={{width: '100%'}}/></div>}
                                            actions={[<Popconfirm title="Are you sure delete this story?"
                                                                  onConfirm={() => this.handleStoryDelete(str.id)}
                                                                  okText="Yes"
                                                                  cancelText="No">
                                                <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                            </Popconfirm>,
                                                <Popconfirm title="Are you sure edit this story?"
                                                            onConfirm={() => this.props.history.push(
                                                                {pathname: `/groups/edit_story/${str.id}`})}
                                                            okText="Yes" cancelText="No">
                                                    <Icon type="edit"/><span style={{marginLeft: 10}}>edit</span>
                                                </Popconfirm>]}
                                        > <Meta
                                            title={<a style={{color: 'black'}}
                                                      onClick={() => this.props.showModal(str.id, str.name)}>
                                                {str.name}
                                            </a>}
                                        />
                                            <div style={{marginTop: 20, minHeight: 120}}>{str.info.substring(0, 300) !== str.info ?
                                                str.info.substring(0, 300) + '...'

                                                :
                                                str.info}</div>
                                        </Card>
                                    </Col>
                                </div>
                            )}
                            </div>

                            :
                            <div>
                                <h1 style={{top: 20}} align="center">You've not created any Chatq stories yet</h1>
                                <div align="center" style={{marginTop: 20, fontSize: 16}}>Create your first story today</div>
                                <div align="center" style={{marginTop: 10}}><Button onClick={() =>
                                    this.props.history.push("/groups/create_story")
                                }>Create story</Button>
                                </div>
                            </div>
                        }
                    </Col>
                </div>
                <BasicModal {...this.props}/>
            </Row>
        );
    }
}
