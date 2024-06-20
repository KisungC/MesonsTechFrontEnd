import TaskForm from "./TaskForm"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {useState} from 'react'

export default function TaskItem({buttonFunc, id})
{
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleClose = buttonFunc == "Update" ? ()=>setShowUpdate(false) : () => setShowDelete(false);
  
    const buttonVariant = buttonFunc == "Update" ? "primary" : "danger"
    const buttonOnClick = () => {
      if (buttonFunc === 'Update') {
        setShowUpdate(true);
      } else {
        setShowDelete(true);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      handleClose;

      fetch(`http://localhost:5000/tasks/${id}`,{
        method:'DELETE'})
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
    }

    return(
        <>            
            <Button variant={buttonVariant} size="sm" onClick={buttonOnClick}> {buttonFunc}</Button>

            {/**Delete Modal */}
            <Modal show={showDelete} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
                
            {/**Update Modal */}
            <Modal show={showUpdate} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>If the field is empty, then it won't update</p>
                <TaskForm id={id}/>
              </Modal.Body>
            </Modal>
        </>
    )
}