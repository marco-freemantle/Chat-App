import "./UserSearchModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserSearchModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      className="user-search-modal"
      centered
    >
      <Modal.Header closeButton className="user-search-modal-header">
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "aliceblue" }}
        >
          Search for a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="user-search-modal-body">
        <input placeholder="Search" className="user-search-modal-input"></input>
      </Modal.Body>
    </Modal>
  );
}

export default UserSearchModal;
