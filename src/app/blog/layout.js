"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/homeLayout/home.module.css";
import user1 from "../../../public/images/users/user1.jpg";
import blog from "../../../public/images/logos/blog.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Input,
} from "reactstrap";
import { PageContext } from "../context";
const Layout = ({ children }) => {
  const router = useRouter();
  const obj = useContext(PageContext);
  const [auth, setAuth] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setAuth(data);
  }, []);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const[data,setData]=useState("");
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const logout = () => {
    localStorage.removeItem("user");
  };

  return (
    <>
      <div className={`${styles.module_wrapper}  py-2`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <Image src={blog} alt="img not found" width={80} height={60} />
            <div className="w-100 " >
              {" "}
              <Input
                type="text"
                placeholder="Search Users"
                onChange={(e) => obj.setSearch(e.target.value)}
                className=""
              />{" "}
              
            </div>
            <div className="d-flex gap-2">
              <Link href="/">
                <button className={styles.dashboard}>Dashboard</button>
                
              </Link>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="white">
                  <div style={{ lineHeight: "0px" }}>
                    <Image
                      src={user1}
                      alt="profile"
                      className="rounded-circle"
                      width="20"
                      height="20"
                    />
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                
                  <Link href={`/profile/${auth?.id}`}>
                    <DropdownItem>Edit Profile</DropdownItem>
                  </Link>

                  {/* <DropdownItem divider /> */}

                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Layout;
