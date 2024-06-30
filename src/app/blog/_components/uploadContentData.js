"use client";
import React, { useEffect, useState } from "react";
import blog from "../../../../public/images/logos/IMG_2950 (1).jpg";
import Styles from "../../../styles/Blog/blog.module.css";
import Image from "next/image";
import user from "../../../../public/images/users/user6.png"
import { Card, CardBody } from "reactstrap";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { FcLike } from "react-icons/fc";
const UploadContentData = () => {
  const [likeData, seLiketData] = useState([]);
  const [data, setData] = useState([]);
  const [author, setAuthor] = useState(1);
  const [likeBlog, setLike] = useState(false);
  const auth=JSON.parse(localStorage.getItem("user"));
 const filterData=likeData.filter((item)=>item?.user_id==auth?.id);

  const like = (item) => {
    axios
      .post("/api/like",{
        user_id:auth?.id,
        post_id:item.post_id
      }) 
      .then((response) => {
       console.log(response)
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
     
  
  };
  useEffect(()=>
{
    axios
    .get("/api/like")
    .then((response) => {
      seLiketData(response.data.data);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
},[likeBlog])
  useEffect(() => {
   
    axios
      .get("/api/blog")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      {data?.map((item) => {
      
        return (
          <>

            <Card key={item?.id}>
              <CardBody>
                <div className="d-flex align-items-center gap-2 align-items-center">
                  <div className={Styles.blog_header_image}>
                    <Image
                    src={item?.profile_img?`/uploads/${item?.profile_img}`:user}
                      alt="img not found"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h5 className="mb-0">{item?.name}</h5>
                    <p className="mb-0 fs-6">{item?.email}</p>
                  </div>
                </div>
                <p className="my-2">{item?.content}</p>
                <div
                  className={`${Styles.blog_image} d-flex justify-content-center`}
                >
                  <img
                    src={`http://localhost:3000/uploads/${item?.image_filename}`}
                    alt="img not found"
                    width="100%"
                    height={506}
                    className={Styles.img_property}
                  />
                </div>
                <div className="my-1 d-flex justify-content-between">
                  <div>
                  {filterData?.find((it)=>it?.post_id==item?.post_id)?<FcLike size={23}/>:<FaRegHeart size={23} className="cursor-pointer" onClick={()=>{like(item);setLike(!likeBlog)}} />}
                    <span className="ms-2">
                      {" "}
                      Like
                    </span>
                  </div>

                  <div>
                    <FaRegCommentAlt size={23} className="cursor-pointer" />
                    <span className="ms-2"> Comment</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default UploadContentData;
