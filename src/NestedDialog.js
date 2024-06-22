import React, { useState, useEffect, useRef } from "react";

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "400px",
  backgroundColor: "#fff",
  border: "2px solid #000",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  padding: "16px",
  zIndex: 1000,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonStyle = {
  margin: "8px",
  padding: "8px 16px",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  cursor: "pointer",
};

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

const Modal = ({ open, handleClose, title, description, children }) => {
  const modalRef = useRef(null);

  useClickOutside(modalRef, handleClose);

  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div ref={modalRef} style={modalStyle}>
        <h2 style={{ marginBottom: "12px", fontSize: "1.5rem" }}>{title}</h2>
        <p style={{ marginBottom: "16px", fontSize: "1rem" }}>{description}</p>
        {children}
      </div>
    </div>
  );
};

function ParentModal() {
  const [open, setOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const parentModalRef = useRef(null);

  useClickOutside(parentModalRef, () => {
    if (childOpen) {
      setChildOpen(false);
    } else {
      setOpen(false);
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setChildOpen(false);
  };

  const handleChildOpen = () => {
    setChildOpen(true);
  };

  const handleChildClose = () => {
    setChildOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        if (open && !childOpen) {
          handleClose();
        } else if (childOpen) {
          handleChildClose();
        }
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [open, childOpen, handleClose, handleChildClose]);

  return (
    <div>
      <button style={buttonStyle} onClick={handleOpen}>
        Open modal
      </button>
      {open && (
        <Modal
          open={open}
          handleClose={handleClose}
          title="Parent Modal"
          description="This is the parent modal."
        >
          <button style={buttonStyle} onClick={handleChildOpen}>
            Open Child Modal
          </button>
          <Modal
            open={childOpen}
            handleClose={handleChildClose}
            title="Child Modal"
            description="This is the child modal."
          >
            <button style={buttonStyle} onClick={handleChildClose}>
              Close Child Modal
            </button>
          </Modal>
          <button style={buttonStyle} onClick={handleClose}>
            Close Parent Modal
          </button>
        </Modal>
      )}
    </div>
  );
}

export default ParentModal;
