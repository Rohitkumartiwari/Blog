'use client'
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import ProjectTables from "@/app/(DashboardLayout)/components/dashboard/ProjectTable";

const Tables = () => {
  return (
    <Row>
     
     
      <Col lg="12">
        <ProjectTables />
      </Col>
     
    </Row>
  );
};

export default Tables;
