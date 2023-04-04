import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const State = () => {
  const [tableData, setTableData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [editId, setEditId] = useState(null); 

  let navigate = useNavigate();

  //add new entry
  const handleAdd = () => {
    setCountry("");
    setState("");
    setShowAdd(true);
  };

  const handleAddSave = async ()=>{
    const response = await fetch("http://localhost:5000/api/hr/state/",{
      method: "POST",
      body: JSON.stringify({country, state}),
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
    const response = await fetch("http://localhost:5000/api/hr/state/"+id,{
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
    setCountry(tableData[index].country)
    setState(tableData[index].state)
    setEditId(id)
    setShowEdit(true)
  }

  const handleEditSave = async ()=>{
    const response = await fetch("http://localhost:5000/api/hr/state/"+editId,{
      method: "PATCH",
      body: JSON.stringify({country , state}),
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
        const response = await fetch("http://localhost:5000/api/hr/state/")
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
        <h3 className="text">State Details</h3>
        <Button className="add-button btn-dark" onClick={handleAdd}>
          <i className="bi bi-plus-lg"></i>Add
        </Button>
      </div>

      <Table className="table" bordered hover size="sm">
        <thead className="thead">
          <tr className="role-table-heading">
            <th>Country</th>
            <th>State</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data,index) => (
            <tr key={data._id}>
              <td>{data.country}</td>
              <td>{data.state}</td>
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
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
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
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

export default State