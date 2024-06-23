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

    function handleClose()
    {
        setShow(false);
    }
    const handleShow = () => setShow(true);
  
    useEffect(() => {
        fetch("https://Mesonsprojecttester.ca-central-1.elasticbeanstalk.com")           //getting API from backend
          .then(res => res.json())                      // Call res.json() correctly
          .then(data => {
            setTaskData(data)                           //setting data into the variable to work with
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
                        <TaskItem buttonFunc="Update" id={id} />                {/* Creating Modal for Update and Delete */}
                        <TaskItem buttonFunc="Delete" id={id} />
                      </td>
                    </tr>
                  </>
                );
              })}
              <tr>
                <td />                                          {/* adding empty columns for "Create" button spacing */}
                <td />
                <td />
                <td />
                <td className="text-end">
                  <Button variant="primary" onClick={handleShow}>   {/* Cliking the "Create", put it into modal with taskForm() */}
                    Create                                          {/* Decided not to use TaskItem due to project spec */}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Modal show={show} onHide={handleClose}>                    {/* Modal for Create button */}
          <Modal.Header closeButton>
            <Modal.Title>Create Task</Modal.Title>
          </Modal.Header>
          <Modal.Body><TaskForm handleClose={handleClose}/></Modal.Body>
        </Modal>
      </>
    );
}