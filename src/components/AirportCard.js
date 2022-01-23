import { Descriptions, Radio, Button, Statistic, Card, Row, Col, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function AirportCard(props) {

    // todo:  fix the style of this card
    return (
        <div style={props.style}>
            <div style={{ fontSize: "30px" }}>Chicago (ORD)</div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card size="small" style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                        <Statistic
                            title="Arrivals"
                            value={11}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card size="small" style={{ backgroundColor: "rgba(0,0,0,0)" }} bordered={false}>
                        <Statistic
                            title="Departures"
                            value={9}
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
                <Text>31</Text>
            </p>
            <p>
                <Text strong>Relative Humidity: </Text>
                <Text>56%</Text>
            </p>
            <p>
                <Text strong>Wind: </Text>
                <Text>18 mph</Text>
            </p>
            <p>
                <Text strong>Forecast: </Text>
                <Text>Few Clouds</Text>
            </p>
            <br />
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Time" value="1:38:17 pm" suffix="CST" valueStyle={{ fontSize: '15px' }} />
                </Col>
                <Col span={8}>
                    <Statistic title="Day" value="Saturday" valueStyle={{ fontSize: '15px' }} />
                </Col>
                <Col span={8}>
                    <Statistic title="Date" value="January 22, 2022" valueStyle={{ fontSize: '15px' }} />
                </Col>
            </Row>
        </div>
    );
}

export default AirportCard;