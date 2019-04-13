import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

const FooterClass = () => {
        return(
            <Footer style={{textAlign: 'center', backgroundColor: '#202022', color: 'white'}}>
                Nino Bonev ©2019 Created using React & Ant.Design
            </Footer>
        )
}

export default FooterClass