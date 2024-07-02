"use client";
import React, { useState, useEffect } from "react";
import Styles from "../../../styles/Blog/blog.module.css";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import blog from "../../../../public/images/logos/IMG_2950 (1).jpg";
import Image from "next/image";
import axios from "axios";
import usersLogo from "../../../../public/images/users/user6.png"
const UplaodContent = () => {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const[data,setData]=useState([]);
  const[auth,setAuth]=useState();
  useEffect(()=>
  {
    const data= JSON.parse(localStorage.getItem("user"));
    setAuth(data)
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/register"); 
        console.log(response?.data)
        setData(response.data.data); 
      
      } catch (error) {
       console.log(error)
      }
    };

    fetchData();
  }, []);
const user=(data?data:[])?.filter((item)=>item?.id==auth?.id);
  const toggle = () => setModal(!modal);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
  };
  const postBlog = async () => {
    const formData = new FormData();
    formData.append("image_filename", image);
    formData.append("content", content);
    formData.append("author", auth?.id);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        
        body: formData,
      });

      const data = await response.json();
      setImagePreview(null);
      setModal(!modal)
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <div>
      <Card className="mb-3">
        <CardBody>
          <div className="row">
            <div className="d-flex gap-2 align-items-center">
              <div className={Styles.blog_header_image}>
                <Image src={user?.[0]?.profile_img?`/uploads/${user?.[0]?.profile_img}`:usersLogo} alt="img not found" width={60} height={55} style={{objectFit:"cover"}}/>
              </div>
              <div className="w-100">
                <button
                  className={Styles.input_text}
                  onClick={() => setModal(!modal)}
                >
                  Start a post
                </button>
              </div>
              <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>
                  <p>Rohit Kumar Tiwari</p>
                </ModalHeader>
                <ModalBody>
                  <textarea
                    placeholder="what do you want to talk?"
                    className={Styles.modal_text}
                    rows="4"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </ModalBody>
                <ModalBody>
                  {imagePreview && (
                    <div className="d-flex justify-content-center position-relative">
                      <Image
                        src={imagePreview}
                        alt="Uploaded"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                        width={300}
                        height={300}
                      />
                    </div>
                  )}
                  <input type="file" onChange={handleFileChange} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={postBlog}>
                    Post
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => {
                      toggle();
                      setImage("");
                    }}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UplaodContent;
