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
        console.log(this.props);
        this.props.Crud.getAllGroups().then((res) => {
            this.setState({
                groups: res
            })
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
                            pathname: `/groups/${group.name.toLowerCase()}`,
                            state: {groupName: group.name}
                        }}
                              style={{marginBottom: 20}} key={group.id}>
                            <Card
                                hoverable
                                cover={<img src={group.cover} alt=""  />}
                                actions={this.props.isAdmin ? [<Icon type="delete"
                                                                     onClick={console.log('delete')}/>,
                                    <Icon type="edit" onClick={console.log('edit')}/>] : ''}
                            > <Meta style={{minHeight: 120}} title={group.name}
                                    description={<div style={{
                                marginTop: 20,
                                minHeight: 150
                            }}>{group.info.substring(0, 300) !== group.info ?
                                group.info.substring(0, 300) + '...'

                                :
                                group.info}</div>} />
                                <p style={{fontStyle: 'italic', color: '#91d5ff'}} align="center">
                                    <span><Icon style={{marginRight: 10}} type="paper-clip" />Stories in group: <strong>{group.storiesById.length}</strong></span>
                                    <span style={{marginLeft: 20}}><Icon style={{marginRight: 10}}  type="team" />Followers: <strong>{group.followersByUsername.length}</strong></span>
                                </p>
                            </Card>
                        </Link>
                    </Col>)}
                </Row>
            </div>
        )
    }
}