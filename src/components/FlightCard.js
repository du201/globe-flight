import React, { Component } from 'react';
import { Card, Popover, Button, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

function FlightCard(props) {
    // name: flight number
    // departure
    // arrival
    // departure time
    // estimated arrival time
    // time left
    // departure place current time
    // arrival place current time
    return (
        <>
        <Card 
            title={props.name}
            style={{ width: 300 }}
        >
            <Row>
                <Col span={4}>
                    <p>{props.departure}</p>
                </Col>
                <Col>
                    <ArrowRightOutlined />
                </Col>
                <Col span={4}>
                    <p>{props.arrival}</p>
                </Col>
            </Row>
        </Card>
        </>
    );
}

export default FlightCard;