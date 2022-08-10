import React from "react";
import { Form } from "react-bootstrap";
import "./TypePicker.scss";

export default function TypePicker(props) {
  const { label, type, setType } = props;

  return (
    <Form.Group controlId="type" className="type">
      <Form.Label className="mb-0">{label}</Form.Label>
      <Form.Control
        as="select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="M">M</option>
        <option value="T">T</option>
      </Form.Control>
    </Form.Group>
  );
}
