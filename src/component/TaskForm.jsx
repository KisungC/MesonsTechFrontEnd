import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ShowAlertPanel from "./ShowAlertPanel";

export default function TaskForm({ id, handleClose }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStat, setTaskStat] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [isError, setError] = useState(false);

  const handleSubmit = (e) => {     {/* When sumbit button is clicked, do fetch api */}
    e.preventDefault();
    const taskData = {
      title: taskTitle,
      description: taskDesc,
      status: taskStat,
      dueDate: taskDate,
    };

    {/* Adding conditional, if it's POST or PUT request */}
    let url = "http://mesonstechprojectbackend.ca-central-1.elasticbeanstalk.com/tasks/";
    let apiReq = "POST";
    if (id) {
      url = `http://mesonstechprojectbackend.ca-central-1.elasticbeanstalk.com/tasks/${id}`;
      apiReq = "PUT";
    }

    fetch(url, {
      method: apiReq,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setError(false)
        setTimeout(()=>{
            handleClose()           //Closes modal
        },1500)
          setShowAlert(true)        //Show alert modal
        setTimeout(()=>{
            window.location.reload();
          }, 1500)
    })
      .catch((err) => {
        console.log(err)
        setError(true)
        handleClose()
        setShowAlert(true)
        setTimeout(()=>{
          window.location.reload();
        }, 1500)
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => setTaskTitle(e.target.value)}      
          />                                                    {/* Set client data into a variable */}
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) => setTaskDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Control
            type="text"
            placeholder="Status"
            onChange={(e) => setTaskStat(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Control
            type="text"
            placeholder="Due Date"
            onChange={(e) => setTaskDate(e.target.value)}
          />
        </Form.Group>
        <br />
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button variant="primary" type="submit">
            {id ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </Form>

        {showAlert?<ShowAlertPanel type={id?"Update":"Create"} result={isError}/>:null}

    </>
  );
}
