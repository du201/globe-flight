"use strict";
const { Descriptions, Radio, Button, Statistic, Card, Row, Col, Typography } = antd;
const { ArrowUpOutlined, ArrowDownOutlined } = icons;
const { Title } = Typography;
class Demo extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            size: 'default',
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(Title, { level: 2 }, "Chicago (ORD)"),
            React.createElement(Row, { gutter: 16 },
                React.createElement(Col, { span: 12 },
                    React.createElement(Card, null,
                        React.createElement(Statistic, { title: "Arrivals", value: 11, valueStyle: { color: '#3f8600' }, prefix: React.createElement(ArrowUpOutlined, null) }))),
                React.createElement(Col, { span: 12 },
                    React.createElement(Card, null,
                        React.createElement(Statistic, { title: "Departures", value: 9, valueStyle: { color: '#cf1322' }, prefix: React.createElement(ArrowDownOutlined, null) })))),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Descriptions, { title: "Current Weather", bordered: true, column: { xxl: 5, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 } },
                React.createElement(Descriptions.Item, { label: "Temperature" }, "31"),
                React.createElement(Descriptions.Item, { label: "Relative Humidity" }, "56%"),
                React.createElement(Descriptions.Item, { label: "Wind" }, "18 mph"),
                React.createElement(Descriptions.Item, { label: "Forecast" }, "Few Clouds")),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(Row, { gutter: 16 },
                React.createElement(Col, { span: 8 },
                    React.createElement(Statistic, { title: "Time", value: "1:38:17 pm", suffix: "CST" })),
                React.createElement(Col, { span: 8 },
                    React.createElement(Statistic, { title: "Day", value: "Saturday" })),
                React.createElement(Col, { span: 8 },
                    React.createElement(Statistic, { title: "Date", value: "January 22, 2022" })))));
    }
}
ReactDOM.render(React.createElement(Demo, null), mountNode);