"use client"
import React, { useState ,useEffect} from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useRouter } from 'next/navigation'
const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth= localStorage.getItem("user");
  useEffect(()=>
    {
     
     if(auth)
      {
        router.push("/blog") 
      }
     
    },[auth])
  const handleRegister = async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'register',
        name, 
        email,
        password,
      }),
    });
    const auth= localStorage.getItem("user");
  
    if(response.status===201)
      {
        router.push("/home")
      }
   
  }
  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Register</CardTitle>

              <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                  id="exampleName"
                  name="name"
                  // placeholder="with a placeholder"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleName"
                  name="email"
                  // placeholder="with a placeholder"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Password</Label>
                <Input
                  id="exampleName"
                  name="password"
                  // placeholder="with a placeholder"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FormGroup>
              <Button className="mt-2" onClick={handleRegister}>Submit</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;

