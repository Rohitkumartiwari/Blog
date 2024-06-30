"use client";
import React, { useState,useEffect } from "react";
import UplaodContent from "./_components/uplaodContent";
import UploadContentData from "./_components/uploadContentData";
import Image from "next/image";
import blog from "../../../public/images/logos/IMG_2950 (1).jpg";
import Styles from "../../styles/Blog/blog.module.css";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
 
} from "reactstrap";

const Home = () => {
  const auth=JSON.parse(localStorage.getItem("user"));
  const[data,setData]=useState([]);

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
      <div className="row my-2">
        <div className="col-md-4">
          <Card>
            <CardBody className="text-center">
              <div className="d-flex justify-content-center">
              <div className={Styles.blog_header_image}>
                <Image src={`/uploads/${user?.[0]?.profile_img}`} alt="img not found" width={70} height={65} style={{objectFit:"cover"}}/>
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
        <div className="col-md-8">
         <UplaodContent/>
          <UploadContentData/>
        </div>
      </div>
    </div>
  );
};

export default Home;