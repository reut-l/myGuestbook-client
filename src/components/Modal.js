import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className="middle-container modal-container">
      <div onClick={(e) => e.stopPropagation()} className="modal-active-box">
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
