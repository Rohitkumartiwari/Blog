import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import { MdDelete, MdEditSquare } from "react-icons/md";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const ProjectTables = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [content, setContent] = useState({});
  const [EmpName, setEmpName] = useState("");
  const [EmpAge, setEmpAge] = useState("");
  const [EmpCompany, setEmpCompany] = useState("");
  const fetchData = () => {
    axios
      .get("/api/users")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setEmpName(content?.EmpName);
    setEmpAge(content?.EmpAge);
    setEmpCompany(content?.EmpCompany);
  }, [content]);
  const deleteData = (item) => {
    axios
      .delete(`/api/users?id=${item.id}`)
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateData = () => {
    const updatedData = {
      EmpName: EmpName,
      EmpAge: EmpAge,
      EmpCompany: EmpCompany,
    };

    axios
      .put(`/api/users?id=${content.id}`, updatedData)
      .then((response) => {
        toast.success(response.data.message);
        fetchData();
      })
      .catch((error) => {
        console.log("Error updating data:", error);
      });
  };
  return (
    <Card>
      <ToastContainer />
      <CardBody>
        <CardTitle tag="h5">Project Listing</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Overview of the projects
        </CardSubtitle>
        <div className="table-responsive">
          <Table className="text-nowrap mt-3 align-middle" borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>

                <th>Age</th>
                <th>Company</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>{index + 1}</td>
                  <td>{tdata.EmpName}</td>

                  <td>{tdata.EmpAge}</td>
                  <td>{tdata.EmpCompany}</td>
                  <td>
                    <MdDelete
                      color="red"
                      size={22}
                      className="cursor-pointer"
                      onClick={() => deleteData(tdata)}
                    />
                    <span>
                      <MdEditSquare
                        size={22}
                        color="green"
                        onClick={() => {
                          setModal(!modal);
                          setContent(tdata);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal isOpen={modal} toggle={toggle} content={content}>
            <ModalHeader toggle={toggle}> Update List</ModalHeader>
            <ModalBody>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Name</Label>
                    <Input
                      id="exampleName"
                      name="name"
                      placeholder="with a placeholder"
                      type="text"
                      onChange={(e) => setEmpName(e.target.value)}
                      value={EmpName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Age</Label>
                    <Input
                      id="exampleAge"
                      name="age"
                      placeholder="with a placeholder"
                      type="text"
                      onChange={(e) => setEmpAge(e.target.value)}
                      value={EmpAge}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Company Name</Label>
                    <Input
                      id="EmpCompany"
                      name="EmpCompany"
                      placeholder="with a placeholder"
                      type="text"
                      value={EmpCompany}
                      onChange={(e) => setEmpCompany(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  toggle();
                  updateData();
                }}
              >
                Update
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectTables;
