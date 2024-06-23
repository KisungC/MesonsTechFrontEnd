import TaskForm from "./TaskForm"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AlertDialog } from "react-bootstrap"
import {useState} from 'react'
import ShowAlertPanel from "./ShowAlertPanel"

export default function TaskItem({buttonFunc, id})
{
    //for error handling
    const [isError, setError] = useState(true)
    const [showAlert, setShowAlert] = useState(false)

    //for Modals
    const [showDelete, setShowDelete] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)

    function handleClose(){
      if (buttonFunc == "Update")
        {setShowUpdate(false)}
      else {setShowDelete(false)}
    } 
    const buttonVariant = buttonFunc == "Update" ? "primary" : "danger"

    const buttonOnClick = () => {       /* For showing Modal on the screen, conditional upon buttonFunc */
      if (buttonFunc === 'Update') {
        setShowUpdate(true)
      } else {
        setShowDelete(true)
      }
    };

    const handleSubmit = (e) => {       /* When "Delete" button is clicked, deletes the item data on DynamoDB */
      e.preventDefault();

      fetch(`https://Mesonsprojecttester.ca-central-1.elasticbeanstalk.com/${id}`,{
        method:'DELETE'})
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          setError(false)
          setShowDelete(false)        /* Close Delete Modal */
          setShowAlert(true)          /* Open Alert Modal */
          setTimeout(()=>{
            window.location.reload(); /* After user read the message, reload the page */
          }, 1500)
          
        })
        .catch(err=>
          {
            console.log(err)
            setError(true)
            setShowDelete(false)
            setShowAlert(true)
            setTimeout(()=>{
              window.location.reload(); /* After user read the message, reload the page */
            }, 1500)
          })
    }

    return(
        <>            
            <Button variant={buttonVariant} size="sm" onClick={buttonOnClick}> {buttonFunc}</Button>  {/* Update/Delete Button */}

            {/**Delete Confirmation Modal */}
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
                <p>If the field is empty, then it won't update the corresponding data</p>
                <TaskForm id={id} handleClose={handleClose}/>           {/* Populate Form in the body  */}
              </Modal.Body>
            </Modal>

            {showAlert ? <ShowAlertPanel type="Delete" result={isError} /> : null}

        </>
    )
}