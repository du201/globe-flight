import React, { Component } from 'react';
import { Card, Popover, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const { Text } = Typography;

function FlightCard({ style, selectedAirportData }) {
    // name: flight number
    // departure
    // arrival
    // departure time
    // estimated arrival time
    // time left
    // departure place current time
    // arrival place current time
    return (
        <div style={style}>
            <Card title="United Airlines (UA149)" style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                <p>
                    <Text strong>ORD &#8594; LAX</Text>
                </p>
                <p>
                    <Text strong>Status: </Text>
                    <Text>Scheduled</Text>
                </p>
                <p>
                    <Text strong>Departure: </Text>
                    <Text>Sunday, 20 Jan 2022 - 18:00</Text>
                </p>
                <p>
                    <Text strong>Arrival: </Text>
                    <Text>Monday, 21 Jan 2022 - 2:00</Text>
                </p>
                <p>
                    <Text strong>Delay: </Text>
                    <Text>40 min</Text>
                </p>
            </Card>
        </div>
    );
}

export default FlightCard;