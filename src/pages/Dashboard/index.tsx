import { PageContainer, ProCard } from '@ant-design/pro-components'
import { Col, Row } from 'antd';

const Dashboard = () => {


    return (
        <PageContainer

        >
            <Row gutter={15}>
                <Col xxl={4} xl={4} md={8} sm={24} style={{ border: '1px solid black' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem iste quaerat iusto deserunt modi?</Col>
                <Col xxl={4} xl={4} md={8} sm={24} style={{ border: '1px solid black' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem iste quaerat iusto deserunt modi?</Col>
                <Col xxl={8} xl={8} md={8} sm={24} style={{ border: '1px solid black' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem iste quaerat iusto deserunt modi?</Col>
                <Col xxl={8} xl={8} md={8} sm={24} style={{ border: '1px solid black' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem iste quaerat iusto deserunt modi?</Col>
            </Row>
        </PageContainer>
    );
};

export default Dashboard;

