import React from 'react'
import {Row} from 'antd'

import Quote from '../utils/QuoteOfTheDay'
import SignInText from '../utils/SignInText'
import AllGroups from "../utils/AllGroups";
import AllUsers from "../utils/AllUsers";
import SingleChallenge from "../utils/SingleChallenge";
import CreateChallenge from "../utils/CreateChallenge";
import Loading from "../utils/Loading";

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
const content = {
    allGroups: AllGroups,
    welcome: Quote,
    signIn: SignInText,
    allUsers: AllUsers,
    singleChallenge: SingleChallenge,
    createChallenge: CreateChallenge,
    loading: Loading
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
                <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name'>{this.showContent(this.props.showTextContent)}</span>
                            </DemoBox>
                        </span>
                </Row>
            </div>
        )
    }

}

export default WithTextSubHeader