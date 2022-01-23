import React, { Component } from 'react';
import { Card, Popover, Button, Row, Col, Typography } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
const { Text } = Typography;

function FlightCard({ style, selectedFlightData }) {
    // name: flight number
    // departure
    // arrival
    // departure time
    // estimated arrival time
    // time left
    // departure place current time
    // arrival place current time
    const arr_date = new Date(selectedFlightData['arr_time'])
    const dep_date = new Date(selectedFlightData['dep_time'])
    return (
        <div style={style}>
            <Card title={`${selectedFlightData['name']} (${selectedFlightData['flight_iata']})`} style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                <p>
                    <Text strong>{`${selectedFlightData['dep_iata']} &#8594; ${selectedFlightData['arr_iata']}`}</Text>
                </p>
                <p>
                    <Text strong>Status: </Text>
                    <Text>Active</Text>
                </p>
                <p>
                    <Text strong>Departure: </Text>
                    <Text>{`${arr_date.toDateString()} - ${arr_date.toTimeString()}`}</Text>
                </p>
                <p>
                    <Text strong>Arrival: </Text>
                    <Text>{`${dep_date.toDateString()} - ${dep_date.toTimeString()}`}</Text>
                </p>
                <p>
                    <Text strong>Delay: </Text>
                    <Text>{`${selectedFlightData['delay']} min`}</Text>
                </p>
            </Card>
        </div>
    );
}

export default FlightCard;