import { Descriptions, Radio, Button, Statistic, Card, Row, Col, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title } = Typography;

function AirportCard(props) {

    return (
        <div style={props.style}>
            <Title level={2}>Chicago (ORD)</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Arrivals"
                            value={11}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Departures"
                            value={9}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
            <br />
            <br />
            <Descriptions
                title="Current Weather"
                bordered
                column={{ xxl: 5, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Temperature">31</Descriptions.Item>
                <Descriptions.Item label="Relative Humidity">56%</Descriptions.Item>
                <Descriptions.Item label="Wind">18 mph</Descriptions.Item>
                <Descriptions.Item label="Forecast">Few Clouds</Descriptions.Item>
            </Descriptions>
            <br />
            <br />
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Time" value="1:38:17 pm" suffix="CST" />
                </Col>
                <Col span={8}>
                    <Statistic title="Day" value="Saturday" />
                </Col>
                <Col span={8}>
                    <Statistic title="Date" value="January 22, 2022" />
                </Col>
            </Row>
        </div>
    );
}

export default AirportCard;