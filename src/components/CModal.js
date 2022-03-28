import React, { useState } from 'react';
import '../styles/modal.scss';
import { Modal, Button, InputGroup,FormControl, Toast } from 'react-bootstrap';
import nearAPI from 'near-api-js';
import { logout } from '../utils.js';

function CModal(props) {
  const { show, setShow, deposit, withdrawal, showPopupModal } = props;
  const [inputBox, setInputBox] = useState("0");
  const [toastshow, setToastShow] = useState("false");

  const handleClose = () => setShow(false);

  const printer = () => {
    console.log(inputBox);
  }


  return (
    <>
    <div className='dark-modal'>
      <Modal show={show} onHide={handleClose} className='dark-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Funding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            To play on Classy Kangaroo Coin Flip you first need to deposit some Ⓝ
            <br/>
            You also can't bet more than your deposited balance.
          </p>
          <p>How much do you want to deposit?</p>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Ⓝ</InputGroup.Text>
            <FormControl
              value={inputBox}
              onChange={evt => setInputBox(evt.target.value)}
              placeholder="value to deposit"
              aria-label=""
              aria-describedby="basic-addon1"
              type="number"
            />
          </InputGroup>
        </Modal.Body> 
        <Modal.Footer>
          <Button className="bg-white text-purple" variant="secondary" onClick={_ =>inputBox > 0.1 ? deposit(inputBox) : showPopupModal('Error !','Min Deposit are 0.11')}>
            Deposit
          </Button>
          <Button className="bg-purple text-white" variant="primary" onClick={_ => withdrawal()}>
            Withdraw my balance 
          </Button>
          <Button className="bg-dark text-white" variant="primary" onClick={_ => logout()}>
            logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  </>
  );
}

export default CModal;