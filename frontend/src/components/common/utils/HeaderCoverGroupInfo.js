import React from 'react'
import {Row} from 'antd'


const HeaderCoverGroupInfo = (props) => {
        return(
            <div style={{
                marginTop: 120
            }}>
                <Row>
                    <div style={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 36,
                        borderBottom: 'white solid 1px',
                    }}>{props.name}
                    </div>
                </Row>
                <Row >
                    <div style={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 16,
                        marginTop: 5
                    }}><span>{props.stories} stories</span> --
                        <span> {props.followers} followers</span>
                    </div>
                </Row>
            </div>
        )
}

export default HeaderCoverGroupInfo;