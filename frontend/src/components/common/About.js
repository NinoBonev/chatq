/**
 * Created by NinoB on 5.3.2019 г.
 */

import React from 'react';
import {Row, Col} from 'antd'
import Header from "./Header";

//Add about info ----> The idea behind Gotcha ---> Open groups and Challenges
class About extends React.Component {

    componentDidMount() {
        this.props.setSubHeaderKey('about')
    }

    render() {
        return (
            <Row>
                <div className='main-data-container'>
                    <Col offset={4} span={16}>
                        <div align="center" style={{marginTop: 30}}><img width='60%'
                                                                         src='https://res.cloudinary.com/dar4inn2i/image/upload/v1552651172/contest.jpg'
                                                                         alt=""/></div>
                        <div align="center"
                             style={{marginTop: 30, fontStyle: 'italic', fontSize: 24, color: '#595959'}}>Chatq is your
                            point of inspirational. A place to share photos and make stories out of them
                        </div>
                        <div style={{marginTop: 40, color: 'red', fontStyle: 'italic', fontSize: 18}}>Why is it called
                            Chatq?
                        </div>
                        <div style={{marginTop: 10, fontSize: 16}}>Chatq comes from <strong>Chautauqua</strong> - a
                            movement that was created in the late
                            nineteenth century with a unique idea for education by lectures(talks). The first actual
                            lecture took place on the lake Chautauqua,
                            from where the name comes.
                        </div>
                        <div style={{marginTop: 20, color: 'red', fontStyle: 'italic', fontSize: 18}}>Chatauqua and
                            modern days
                        </div>
                        <div style={{marginTop: 10, fontSize: 16}}>Nowadays, in the technology era, internet literally
                            floods us with information about everything,
                            but not always with one that brings us satisfaction makes us more knowledgeable, aware or
                            inspired. We like the idea making a place,
                            where people can search for pure inspiration and
                            be a part of that, by creating their own story. So here we are now!
                        </div>
                        <div style={{marginTop: 20, color: 'red', fontStyle: 'italic', fontSize: 18}}>How does Chatq
                            works?
                        </div>
                        <div style={{marginTop: 10, fontSize: 16}}>Chatq is a place for pictures and stories, or more
                            accurate stories with pictures.
                            To create your story you should have a storyline consisting of 4 photos which are directly
                            connected to your story ,
                            Each photo should hold that part of your story that you consider most accurate for.
                            The final result should be a story of real inspiration with photos that makes the whole
                            experience stronger.
                            It is important that all the photo are being made by the user himself.
                            In the app, you can review and track the profiles of everyone you are interested in
                        </div>
                        <div style={{marginTop: 20, color: 'red', fontStyle: 'italic', fontSize: 18}}>Why 4?</div>
                        <div style={{marginTop: 5, fontSize: 16, fontStyle: 'italic'}}>Four is a magical number</div>
                        <div style={{marginTop: 10, fontSize: 16}}>Because we understand the world better because of its
                            four directions,
                            because we understand nature better because of the four seasons and the four elements
                            (water, air, fire, earth). Because we understand
                            better man thanks to the 4 aspects that have the personality - the physical, the astral
                            body, the soul and the spirit,
                            and the 4 basic functions that each of us possesses - sensitivity, sensitivity, logical
                            thought and intuition.
                            And last but not least, 4 are the elements of each story - introduction, thesis, statement
                            and conclusion.
                        </div>
                        <div style={{marginTop: 20, color: 'red', fontStyle: 'italic', fontSize: 18}}>Is there something
                            more?
                        </div>
                        <div style={{marginTop: 10, marginBottom: 50, fontSize: 16}}>Oh, yes :).One more thing. There
                            will be periodic challenges with a particular topic where everyone will be able to get
                            involved.
                        </div>
                    </Col>
                </div>
            </Row>

        )
    }

};

export default About