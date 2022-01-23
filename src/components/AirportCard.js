import { Descriptions, Radio, Button, Statistic, Card, Row, Col, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function AirportCard({ style, selectedAirportData }) {

    // todo:  update the time with real time value if have time
    let date = new Date(new Date().toLocaleString("en-US", { timeZone: selectedAirportData.timezone }));
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return (
        <div style={style}>
            <div style={{
                fontSize: "30px"
            }}>{selectedAirportData.name}</div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card size="small" style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                        <Statistic
                            title="Arrivals"
                            value={selectedAirportData.arr_count}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card size="small" style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                        <Statistic
                            title="Departures"
                            value={selectedAirportData.dep_count}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <p style={{ fontSize: "20px" }}>
                <Text strong>Current Weather</Text>
            </p>
            <p>
                <Text strong>Temperature: </Text>
                <Text>{selectedAirportData.temperature} F</Text>
            </p>
            <p>
                <Text strong>Relative Humidity: </Text>
                <Text>{selectedAirportData.humidity}%</Text>
            </p>
            <p>
                <Text strong>Wind: </Text>
                <Text>{selectedAirportData.wind} mph</Text>
            </p>
            <p>
                <Text strong>Forecast: </Text>
                <Text>{selectedAirportData.forecast}</Text>
            </p>
            <br />
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Time" value={date.toTimeString()} suffix="CST" valueStyle={{ fontSize: '15px' }} />
                </Col>
                <Col span={8}>
                    <Statistic title="Day" value={weekday[date.getDay()]} valueStyle={{ fontSize: '15px' }} />
                </Col>
                <Col span={8}>
                    <Statistic title="Date" value={date.toLocaleDateString()} valueStyle={{ fontSize: '15px' }} />
                </Col>
            </Row>
        </div>
    );
}

export default AirportCard;