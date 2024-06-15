import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [inpData, setInpData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const openForm = () => {
    setFormVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(inpData.phone)) {
      alert("Invalid phone number. Please enter a valid 10-digit phone number");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(inpData.dob);
    if (selectedDate >= currentDate) {
      alert("Invalid date of birth. Date of birth cannot be in the future.");
      return;
    }

    setInpData({
      username: "",
      email: "",
      phone: "",
      dob: "",
    });
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: `${formVisible ? "#7f7f7f" : "#fff"}` }}
    >
      <div className={`${formVisible ? "disabled" : ""}`}>
        <h1>User Details Modal</h1>
        <button onClick={openForm}>Open Form</button>
      </div>

      {formVisible && (
        <div ref={modalRef} className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h2>Fill Details</h2>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={inpData.username}
                onChange={(e) => {
                  setInpData({ ...inpData, username: e.target.value });
                }}
                required
                placeholder="JohnDoe123"
              />
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inpData.email}
                onChange={(e) => {
                  setInpData({ ...inpData, email: e.target.value });
                }}
                required
                placeholder="johndoe@gmail.com"
              />
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={inpData.phone}
                onChange={(e) => {
                  setInpData({ ...inpData, phone: e.target.value });
                }}
                required
                placeholder="xxxxxxxxxx"
              />
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={inpData.dob}
                onChange={(e) => {
                  setInpData({ ...inpData, dob: e.target.value });
                }}
                required
              />

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
