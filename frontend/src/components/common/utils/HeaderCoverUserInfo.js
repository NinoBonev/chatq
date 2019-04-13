import React from 'react'
import {Row, Col} from 'antd'
const HeaderCoverUserInfo = (props) => {
        return(
            <div style={{
                marginTop: 120
            }}>
                <Row>
                    <div style={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 24,
                        borderBottom: 'white solid 1px'
                    }}>{props.name}<span style={{color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 20,
                        marginLeft: 5
                    }}>({props.username})</span> </div>
                </Row>
                <Row >
                    <div style={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 16,
                        marginTop: 5
                    }}><span>{props.stories} stories</span> --
                        <span> {props.followers} followers</span> --
                        <span> {props.following} following</span>
                    </div>
                </Row>
            </div>
            )
}

export default HeaderCoverUserInfo;