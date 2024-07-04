"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const Page = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const[auth,setAuth]=useState();
  useEffect(()=>
    {
      const data= JSON.parse(localStorage.getItem("user"));
      setAuth(data)
    },[]);
   console.log(auth,"auth")
  useEffect(()=>
    {    
     if(auth)
      {
        router.push("/blog") 
      }
    },[auth]);
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        action: "login",
        email,
        password,
      }); 
      if (response.status === 200) {
       
        toast.success(response.data.
          message)
        router.push("/blog")
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.result));
      } 
      if (response.status === 404) {
        toast.danger(response.data.
          message)
      }
     
    } catch (error) {
      console.error("Error during login:", error);
      
    }
  };
 

  return (
    <div className="container my-5">
       <ToastContainer />
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Login</CardTitle>
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
              <Button className="mt-2" onClick={handleLogin}>
                Submit
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
