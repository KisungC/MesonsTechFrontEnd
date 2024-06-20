import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap";

export default function ShowAlertPanel({type, result}){
    console.log("in showpanel")

    const [isSuccess,setSuccess] = useState(true);

    useEffect(() => {
        if (result === false) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      }, [result]);
    
    return(
    <>
        <Modal show={true}>
          <Modal.Body>
            <p>{type} {isSuccess? "success" : "failed"}</p>
            </Modal.Body>
          </Modal>
    </>
    )
  }