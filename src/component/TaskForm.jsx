import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function TaskForm({ id }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskStat, setTaskStat] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title: taskTitle,
      description: taskDesc,
      status: taskStat,
      dueDate: taskDate,
    };

    let url = "http://localhost:5000/tasks/";
    let apiReq = "POST";
    if (id) {
      url = `http://localhost:5000/tasks/${id}`;
      apiReq = "PUT";
    }

    console.log(url)

    fetch(url, {
      method: apiReq,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then((res) => res.json())
      .then((data) => {console.log(data)})
      .catch((err) => console.log(err));
  };
  //get all the information from the form, do not use api here.
  //props is existing data api id, if props, then use navigation to task/[id] with all the information from the form
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
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
    </>
  );
}
