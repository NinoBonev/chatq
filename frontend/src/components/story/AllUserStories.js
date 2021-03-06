/**
 * Created by NinoB on 6.3.2019 г.
 */

//TODO Create a list of all user stories after click over his avatar

import React from 'react';
import {Col, Row, Card, Popconfirm, Icon} from 'antd';
import {message} from 'antd/lib/index';
import BasicModal from "./BasicModal";

const {Meta} = Card;

export default class AllUserStories extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }

    handleDelete(id) {
        this.props.Crud.deleteStoryById(id).then((res) => {
            if (res.success) {
                message.success(res.body);
                this.setState({
                    stories: []
                });
                this.fetchAllStories();
            } else {
                message.error(res.body)
            }
        });
    }

    render() {
        return (
            <div>
                {this.props.stories.length > 0 ? <div>
                    <Row gutter={16}>
                    {this.props.stories.map((str) =>
                        <Col span={8}>
                            <Card
                                style={{marginBottom: 20, marginTop: 20}}
                                actions={this.props.isAdmin ? [<Popconfirm
                                    title="Are you sure delete this story?"
                                    onConfirm={() => this.handleDelete(str.id)} okText="Yes"
                                    cancelText="No">
                                    <Icon type="delete"/><span style={{marginLeft: 10}}>delete</span>
                                </Popconfirm>] : null}
                                cover={<div className='imageFadeOut'><img src={str.cover}
                                                                          style={{width: '100%'}}
                                                                          onClick={() => this.props.showModal(str.id, str.name)}
                                                                          alt=""
                                /></div>}
                            > <Meta
                                title={<a style={{color: 'black'}}
                                          onClick={() => this.props.showModal(str.id, str.name)}>
                                    {str.name}
                                </a>}
                            />
                                <div style={{
                                    marginTop: 20,
                                    minHeight: 150
                                }}>{str.info.substring(0, 300) !== str.info ?
                                    str.info.substring(0, 300) + '...'

                                    :
                                    str.info}</div>
                            </Card>
                        </Col>
                    )}
                    </Row>
                </div> : <Col span={24}>
                    <div align="center"
                         style={{fontSize: 20, fontStyle: 'italic', marginTop: 20, color: 'green'}}>
                        Not involved into any stories yet
                    </div>
                </Col>}
                <BasicModal {...this.props} />
            </div>
        )
    }
}