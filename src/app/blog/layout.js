"use client";
import React, { useEffect } from "react";
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
  
} from "reactstrap";
const Layout = ({children}) => {
  const router = useRouter();
  const auth=JSON.parse(localStorage.getItem("user"));
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    if (!auth) {
      router.push("/login");
    }
  }, [auth]);
  console.log(auth);
  const logout = () => {
    localStorage.removeItem("user");
  };
  return (
    <>
    <div className={`${styles.module_wrapper}  py-2`}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Image src={blog} alt="img not found" width={80} height={60} />
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
            {/* <DropdownItem header>Info</DropdownItem> */}
            {/* <DropdownItem>My Account</DropdownItem> */}
            <Link href={`/profile/${auth?.id}`}><DropdownItem>Edit Profile</DropdownItem></Link>
            
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
