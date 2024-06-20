import { useEffect, useState } from "react"
import TaskItem from "./TaskItem";
import { Table, Button, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import TaskForm from "./TaskForm";

export default function TaskList()
{
    const [taskData,setTaskData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(() => {
        fetch("http://localhost:5000/tasks/")           //getting API from backend
          .then(res => res.json())                      // Call res.json() correctly
          .then(data => {
            setTaskData(data)
            setLoading(false)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
      }, []);

      if (loading) {return <p>Loading...</p>}
    return (
      <>
        <div className="mx-auto mt-5" style={{ width: "80%", height: "80%" }}>
          <Table className="Table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {taskData.map((task) => {
                {/* Rendering data from API into Table */}
                const { id, title, description, status, dueDate } = task;

                return (
                  <>
                    <tr key={id}>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td>{status}</td>
                      <td>{dueDate}</td>
                      <td className="text-end">
                        <TaskItem buttonFunc="Update" id={id} />
                        <TaskItem buttonFunc="Delete" id={id} />
                      </td>
                    </tr>
                  </>
                );
              })}
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td className="text-end">
                  <Button variant="primary" onClick={handleShow}>
                    {/**onclick, put it into modal with taskForm() */}Create
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body><TaskForm/></Modal.Body>
        </Modal>
      </>
    );
}