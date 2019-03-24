/**
 * Created by NinoB on 24.2.2019 г.
 */

import React from 'react'
import {Row, Col, Card, Icon, message} from 'antd'
import {Link} from 'react-router-dom'

const {Meta} = Card;

//TODO: Link is all over the Caregory Card -----> should be just over the image
export default class AllGroups extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };
    }

    componentDidMount() {
        this.props.Crud.getAllGroups().then((res) => {
            if (res.success) {
                this.setState({
                    groups: res.body
                });
            } else {
                message.error(res.message);
            }
        }).catch((err) => {
            message.error("Error");
        });
    }

    render() {
        return (
            <div>
                <Row gutter={16} style={{margin: 30}} >
                    <p align="center" style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Palatino'}}>Browse our Chatq groups</p>
                    {this.state.groups.map((group) => <Col span={8}>
                        <Link to={{
                            pathname: `/groups/${group._id}`,
                            state: {groupId: group._id}
                        }}
                              style={{marginBottom: 20}} key={group._id}>
                            <Card
                                hoverable
                                cover={<img src={group.cover} alt=""  />}
                                actions={this.props.isAdmin ? [<Icon type="delete"
                                                                     onClick={console.log('delete')}/>,
                                    <Icon type="edit" onClick={console.log('edit')}/>] : ''}
                            > <Meta style={{minHeight: 120}} title={group.name}
                                    description={group.info}/>
                                <p style={{fontStyle: 'italic', color: '#91d5ff'}} align="center">
                                    <span><Icon style={{marginRight: 10}} type="paper-clip" />Stories in group: <strong>{group.stories.length}</strong></span>
                                    <span style={{marginLeft: 20}}><Icon style={{marginRight: 10}}  type="team" />Followers: <strong>{group.followers.length}</strong></span>
                                </p>
                            </Card>
                        </Link>
                    </Col>)}
                </Row>
            </div>
        )
    }
}