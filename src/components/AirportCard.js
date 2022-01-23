import { Descriptions, Radio, Button, Statistic, Card, Row, Col, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
const { Title } = Typography;

function AirportCard(props) {

    // todo:  fix the style of this card
    return (
        <div style={props.style}>
            <div style={{ fontSize: "30px" }}>Chicago (ORD)</div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card size="small">
                        <Statistic
                            title="Arrivals"
                            value={11}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card size="small">
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
                size="small"
                layout="vertical"
            >
                <Descriptions.Item label="Temperature" contentStyle={{ fontSize: '15px' }}>31</Descriptions.Item>
                <Descriptions.Item label="Relative Humidity" contentStyle={{ fontSize: '15px' }}>56%</Descriptions.Item>
                <Descriptions.Item label="Wind" contentStyle={{ fontSize: '15px' }}>18 mph</Descriptions.Item>
                <Descriptions.Item label="Forecast" contentStyle={{ fontSize: '15px' }}>Few Clouds</Descriptions.Item>
            </Descriptions>
            <br />
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