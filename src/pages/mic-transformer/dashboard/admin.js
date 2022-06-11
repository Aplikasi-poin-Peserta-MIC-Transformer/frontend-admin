import React from 'react'
import Content from "../../../layout/content/Content";
import DataCard from "../../../components/partials/default/DataCard";
import {
  Block,
  Row,
  Col,
} from "../../../components/Component";
import {
  DefaultCustomerChart,
  DefaultOrderChart,
  DefaultRevenueChart,
  DefaultVisitorChart,
} from "../../../components/partials/charts/default/DefaultCharts";

const Dashboard = () => {
  return (
    <Content>
      <Block>
        <Row className="g-gs">
          <Col xxl="3" sm="6">
            <DataCard
              title="Events"
              // percentChange={"4.63"}
              up={true}
              chart={<DefaultOrderChart />}
              amount={"1975"}
            />
          </Col>
          <Col xxl="3" sm="6">
            <DataCard
              title="User Event"
              // percentChange={"2.63"}
              up={false}
              chart={<DefaultRevenueChart />}
              amount={"2293"}
            />
          </Col>
          <Col xxl="3" sm="6">
            <DataCard
              title="Voucher"
              // percentChange={"4.63"}
              up={true}
              chart={<DefaultCustomerChart />}
              amount={"847"}
            />
          </Col>
          <Col xxl="3" sm="6">
            <DataCard
              title="GIFT"
              // percentChange={"2.63"}
              up={false}
              chart={<DefaultVisitorChart />}
              amount={"100"}
            />
          </Col>
        </Row>
      </Block>
    </Content>
  )
}

export default Dashboard