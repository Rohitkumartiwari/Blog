"use client";
import React, { useEffect, useState,useContext } from "react";
import Styles from "../../../styles/Blog/blog.module.css";
import Image from "next/image";
import user from "../../../../public/images/users/user6.png";
import { Card, CardBody, Input ,Button} from "reactstrap";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { MdDelete,MdMessage } from "react-icons/md";
import { PageContext } from "../../context";
import LoadingComponent from "../loading";
import { BiSolidLike } from "react-icons/bi";

const UploadContentData = () => {
  const [likeData, seLiketData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [data, setData] = useState([]);
  const [likeBlog, setLike] = useState(false);
  const [fetchBlog, setFetchBlog] = useState(false);
  const [commentOpen, setCommentOpen] = useState(-1);
  const [loading, setLoading] = useState(false);
  const obj=useContext(PageContext);
  const[auth,setAuth]=useState();
  useEffect(()=>
    {
      const data= JSON.parse(localStorage.getItem("user"));
      setAuth(data)
    },[]);
  
  const[comment,setComment]=useState("");
  const filterData = likeData.filter((item) => item?.user_id == auth?.id);
  const like = (item) => {
    axios
      .post("/api/like", {
        user_id: auth?.id,
        post_id: item.post_id,
      })
      .then((response) => {
        setLike(!likeBlog);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  useEffect(() => {
    axios
      .get("/api/like")
      .then((response) => {
        seLiketData(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [likeBlog]);
  useEffect(() => {
    axios
      .get(`/api/blog?search=${obj.search}`)
      .then((response) => {
        setLoading(true);
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [fetchBlog,likeBlog,obj.search]);
  const totalLike = (item) => {
    let count = 0;
    likeData.map((it) => {
      if (it?.post_id == item?.post_id) {
        count++;
      }
    });
    return count;
  };
  const totalComment=(item)=>
    {
      let count = 0;
      commentData.map((it) => {
        if (it?.post_id == item?.post_id) {
          count++;
        }
      });
      return count;
    }
  const deleteBlog = (item) => {
    axios
      .delete(`/api/blog?id=${item?.post_id}`)
      .then((response) => {
        setFetchBlog(!fetchBlog);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
      axios
      .delete(`/api/like?id=${item?.post_id}`)
      .then((response) => {
        setFetchBlog(!fetchBlog);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const CommentBoxOpen=(item)=>
    {
      setCommentOpen(prev=>prev===item.post_id?-1:item.post_id)
    }
  const postComment=(item)=>
    {
      axios
      .post("/api/comment", {
        user_id: auth?.id,
        post_id: item.post_id,
        author:item?.author,
        comment:comment
      })
      .then((response) => {
        setCommentOpen(-1)
        console.log(response);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
    }
    useEffect(() => {
      axios
        .get("/api/comment")
        .then((response) => {
         
          setCommentData(response.data.data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    }, []);
   
  console.log(commentOpen,"idddd");
  return (
    <div>
      {loading?
      <div className="d-flex justify-content-center"><LoadingComponent/></div>
      :<>{data?.map((item) => {
        console.log(item,"itemmm");
        return (
         
          <Card key={item?.id}>
          <CardBody>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-2 align-items-center">
                <div className={Styles.blog_header_image}>
                  
                  <Image
                    src={
                      item?.profile_img
                        ? `/uploads/${item?.profile_img}`
                        : user
                    }
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
              {/* <p>
                <MdDelete
                  size={20}
                  color="red"
                  onClick={() => deleteBlog(item)}
                  className="cursor-pointer"
                />
              </p> */}
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
                {filterData?.find((it) => it?.post_id == item?.post_id) ? (
                  <BiSolidLike size={23} color="blue"/>
                ) : (
                  <BiSolidLike
                    size={23}
                    className="cursor-pointer"
                    onClick={() => {
                      like(item);
                      
                    }}
                  />
                )}
                <span className="ms-2 mb-0">
                  {" "}
                  {totalLike(item) != 0 && (
                    <>Total Like {totalLike(item)}</>
                  )}
                </span>
              </div>

              <div>
                <MdMessage
                  size={25}
                  className="cursor-pointer"
                  onClick={() => CommentBoxOpen(item)}
                />
                <span className="ms-2"> 

                {totalComment(item) != 0 && (
                    <>Total Comment {totalLike(item)+1}</>
                  )}

                </span>
              </div>
            </div>
            {commentOpen === item.post_id && (
              <div className="d-flex gap-2 align-items-center">
                <div className={Styles.blog_header_image}>
                  <Image
                    src={
                      item?.profile_img
                        ? `/uploads/${item?.profile_img}`
                        : user
                    }
                    alt="img not found"
                    width={40}
                    height={35}
                  />
                </div>
                <div className="w-100">
                {" "}
                <Input type="text" placeholder="Add a Comment" onChange={(e)=>setComment(e.target.value)}/>
               {" "}
              </div>
              <Button onClick={()=>postComment(item)} >
                Post
              </Button>
              </div>
              
            )}
            <>
            {commentData?.map((it)=>
            {
              if(it?.post_id==item?.post_id)
              return(
                <>
                <div className="d-flex gap-2 align-items-center">
                <div className={Styles.blog_header_image}>
                  <Image
                    src={
                      it?.profile_img
                        ? `/uploads/${it?.profile_img}`
                        : user
                    }
                    alt="img not found"
                    width={35}
                    height={35}
                  />
                </div>
                <div className="w-100">
                {" "}
                <p className="mb-0 fw-bold">{it.name}</p>
               <p className="mb-0">{it?.comment}</p>
               
              </div>
              </div>
                </>
              )
            })}
            
            
            </>
          </CardBody>
        </Card>
        );
      })}</>}
      
    </div>
  );
};

export default UploadContentData;
