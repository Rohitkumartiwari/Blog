'use client'
import React ,{useState}from 'react';
 import axios from 'axios';
import { useParams } from 'next/navigation';
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
    Form,
  } from "reactstrap";
const Page = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[mobile,setMobile]=useState();
    const[working,setWorking]=useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const params = useParams();
    console.log(params?.id,"params")
    const handleFileChange = (e) => {
        
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreview(objectUrl);
      };
     
        const updateProfile = async () => {
            const formData = new FormData();
            formData.append("profile_img", image);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("working", working);
            try {
            
            axios
            .put(`/api/register?id=${params?.id}`, formData)
            .then((response) => {
              toast.success(response.data.message);
            //   fetchData();
           
            console.log(response)
            })
            .catch((error) => {
              console.log("Error updating data:", error);
            });
          }
          catch (error) {
              console.error("Error creating article:", error);
            }
        }
  return (
    <div className='container'>
         <ToastContainer />
       <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <Card className='p-4'>
          <CardTitle tag="h5" className='text-center '>Update Profile</CardTitle>
            <CardBody>
             
             <Form>
             <FormGroup>
                <Label for="exampleEmail">Name</Label>
                <Input
                 type='text'
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                 type='text'
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Mobile</Label>
                <Input
                 type='text'
                 value={mobile}
                 onChange={(e)=>setMobile(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Profile</Label>
                <Input
                 type='text'
                 value={working}
                 onChange={(e)=>setWorking(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Image</Label>
                <Input
                 type='file'
                 onChange={handleFileChange}
                />
              </FormGroup>
              <Button className="mt-2" onClick={updateProfile}>Submit</Button>
             </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
