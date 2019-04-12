/**
 * Created by NinoB on 2.3.2019 г.
 */


import React from 'react';
import {Row, Col, Card, Icon, Popconfirm, message} from 'antd';
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
        this.fetchAllStories()
    }

    fetchAllStories() {
        this.setState({
            stories: this.props.myStories
        })
    }

    handleStoryDelete = (id) =>{
        this.props.handleDelete(id).then(() => {
            this.fetchAllStories()
        })
    }

    componentWillUnmount(){
        this.setState({
            stories: []
        });
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

                            <h1 style={{top: 20}} align="center">Please add stories</h1>}
                    </Col>
                </div>
                <BasicModal {...this.props}/>
            </Row>
        );
    }
}
