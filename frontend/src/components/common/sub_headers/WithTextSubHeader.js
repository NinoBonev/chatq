import React from 'react'
import {Row} from 'antd'

import Quote from '../utils/QuoteOfTheDay'
import SignInText from '../utils/SignInText'
import AllGroups from "../utils/AllGroups";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
const content = {
    allGroups: AllGroups,
    welcome: Quote,
    signIn: SignInText
}

class WithTextSubHeader extends React.Component{
    constructor(props){
        super(props)

        this.showContent = this.showContent.bind(this)
    }

    showContent = (input) => {
        return content[input]
    }

    render(){
        return (
            <div className='sub-header'>
                <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span  className='sub-header-name'>{this.showContent(this.props.showTextContent)}</span>
                            </DemoBox>
                        </span>
                </Row>
            </div>
        )
    }

}

export default WithTextSubHeader