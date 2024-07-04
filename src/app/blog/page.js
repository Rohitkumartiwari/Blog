"use client";
import React, { useState,useEffect } from "react";
import UplaodContent from "./_components/uplaodContent";
import UploadContentData from "./_components/uploadContentData";
import Image from "next/image";
import blog from "../../../public/images/logos/IMG_2950 (1).jpg";
import Styles from "../../styles/Blog/blog.module.css";
import usersLogo from "../../../public/images/users/user6.png"
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
 
} from "reactstrap";

const Home = () => {
  const[auth,setAuth]=useState();
  useEffect(()=>
  {
    const data= JSON.parse(localStorage.getItem("user"));
    setAuth(data)
  },[]);
  const[data,setData]=useState([]);
console.log(auth,"auth")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/register"); 
       
        setData(response.data.data); 
      
      } catch (error) {
       console.log(error)
      }
    };

    fetchData();
  }, []);
const user=(data?data:[])?.filter((item)=>item?.id==auth?.id);
  return (
    <div className="container">
      <section className=" row my-2">
        <div className={`${ Styles.fixed_column} col-md-4`}>
          <Card>
            <CardBody className="text-center">
              <div className="d-flex justify-content-center">
              <div className={Styles.blog_header_image}>
                <Image src={user?.[0]?.profile_img?`/uploads/${user?.[0]?.profile_img}`:usersLogo} alt="img not found" width={70} height={65} style={{objectFit:"cover"}}/>
              </div>
              </div>
           
              <CardTitle tag="h5" className="my-2">
                <div>
                {user?.[0]?.name}
                </div>
                <p className="fs-6">
                {user?.[0]?.Working
              }
                </p>
               </CardTitle>
            </CardBody>
          </Card>
        </div>
        <div className={`${ Styles.scrollable_column }  col-md-8`}>
         <UplaodContent/>
          <UploadContentData/>
        </div>
      </section>
    </div>
  );
};

export default Home;
