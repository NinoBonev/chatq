/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react'

import AnonymousHeadroom from "./main_headers/AnonymousHeadroom";
import AuthenticatedHeadroom from './main_headers/AuthenticatedHeadroom'


const Header = (props) => {

        return (
            props.Auth.isLoggedIn() ? <AuthenticatedHeadroom {...props}/> :
                <AnonymousHeadroom  {...props}/>

        )
}

export default Header