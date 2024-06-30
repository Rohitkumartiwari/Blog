'use client'
import axios from 'axios';
import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Forms = () => {
  const[EmpName,setEmpName]=useState("");
  const[EmpAge,setEmpAge]=useState("");
  const[EmpCompany,setEmpCompany]=useState("");
  const handleSubmit=()=>
    {
      let data={
        EmpName,EmpAge,EmpCompany
      }
      axios.post("/api/users",data).then((response)=>{
        toast.success(response.data.message)
        setEmpName("");
        setEmpAge("");
        setEmpCompany("");
       }).catch((error)=>{
        console.log(error);
       })
    }
  return (
    <Row>
        <ToastContainer/>
      <Col>
   
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Form Example
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                  id="exampleName"
                  name="name"
                  // placeholder="with a placeholder"
                  type="text"
                  onChange={(e)=>setEmpName(e.target.value)}
                  value={EmpName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Age</Label>
                <Input
                  id="exampleAge"
                  name="age"
                  // placeholder="with a placeholder"
                  type="text"
                  onChange={(e)=>setEmpAge(e.target.value)}
                  value={EmpAge}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Company Name</Label>
                <Input
                  id="EmpCompany"
                  name="EmpCompany"
                  // placeholder="with a placeholder"
                  type="text"
                  value={EmpCompany}
                  onChange={(e)=>setEmpCompany(e.target.value)}
                />
              </FormGroup>
              <Button className="mt-2" onClick={handleSubmit}>Submit</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
