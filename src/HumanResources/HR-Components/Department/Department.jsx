import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "./style.css";

// const TableData = [
//   { company: "Company A", department: "1" },
//   { company: "Company B", department: "2" },
//   { company: "Company C", department: "3" },
//   { company: "Company F", department: "4" },
//   { company: "Company E", department: "5" },
//   { company: "Company D", department: "6" },
// ];

const Department = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null); 

  let navigate = useNavigate();


  //not in use
  // const handleAdd = () => {
  //   setCompany("");
  //   setDepartment("");
  //   setShowAdd(true);
  // };

  // const handleAddSave = () => {
  //   setTableData([...tableData, { company, department }]);
  //   setShowAdd(false);
  // };

  // const handleEdit = (index) => {
  //   setCompany(tableData[index].company);
  //   setDepartment(tableData[index].department);
  //   setEditIndex(index);
  //   setShowEdit(true);
  // };

  // const handleEditSave = () => {
  //   const newData = [...tableData];
  //   newData[editIndex] = { company, department };
  //   setTableData(newData);
  //   setShowEdit(false);
  // };

  // const handleDelete = (index) => {
  //   const newData = [...tableData];
  //   newData.splice(index, 1);
  //   setTableData(newData);
  // };



  //add new entry
  const handleAdd = () => {
    setCompany("");
    setDepartment("");
    setShowAdd(true);
  };

  const handleAddSave = async ()=>{
    const response = await fetch("http://localhost:5000/api/hr/department/",{
      method: "POST",
      body: JSON.stringify({company, department}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()

    if(response.ok){
      console.log("New entry added")
    }else{
      console.log(response.error)
    }
  }

  //delete an entry
  const handleDelete = async (id) =>{
    const response = await fetch("http://localhost:5000/api/hr/department/"+id,{
      method:"DELETE"
    })

    if(response.ok){
      console.log("Entry deleted successfully")
    }else{
        console.log(response.error)
    }
  }

  //edit an entry
  const handleEdit = (id,index) =>{
    setCompany(tableData[index].company)
    setDepartment(tableData[index].department)
    setEditId(id)
    setShowEdit(true)
  }

  const handleEditSave = async ()=>{
    const response = await fetch("http://localhost:5000/api/hr/department/"+editId,{
      method: "PATCH",
      body: JSON.stringify({company , department}),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await response.json()

    if(response.ok){
      console.log("Entry edited")
    }else{
      console.log(response.error)
    }
  }


  //initial data loading from the databse
  useEffect(()=>{
      const fetchData = async () =>{
        const response = await fetch("http://localhost:5000/api/hr/department/")
        const data = await response.json()

        if(response.ok){
          setTableData(data)
        }
      }
      fetchData()
  },[tableData])


  return (
    <div className="table-container">
      <div className="header">
        <button onClick={() => navigate(-1)} className="back-button1">Back</button>
        <h3 className="text">Department Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
          <i className="bi bi-plus-lg"></i>Add
        </Button>
      </div>

      <Table className="table" bordered hover size="sm">
        <thead className="thead">
          <tr className="role-table-heading">
            <th>Company name</th>
            <th>Department</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data,index) => (
            <tr key={data._id}>
              <td>{data.company}</td>
              <td>{data.department}</td>
              <td className="actions-column">
                <i className="bi bi-pencil-square action-icons" onClick={() => handleEdit(data._id,index)}></i>
                <i className="bi bi-trash3-fill action-icons" onClick={() => handleDelete(data._id)}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group >
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleAddSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text">Edit Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-dark" className="btn" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="btn btn-dark" className="btn" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Department