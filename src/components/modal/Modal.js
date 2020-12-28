import React, { Fragment } from 'react';
import './Modal.css';

const Modal = (props) => {
    const handleClose = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    (() => {
        const modal = document.getElementById("myModal");
        if(modal) {
            modal.style.display = "block";
        }
    })();

    return(
        <Fragment>
                <div id="myModal" className="modal">
                <span id="close" className="close" onClick={handleClose}>&times;</span>
                    <div className="modal-text">
                        {props.message}
                    </div>
                </div>
        </Fragment>
        
    );
}

export default Modal;
