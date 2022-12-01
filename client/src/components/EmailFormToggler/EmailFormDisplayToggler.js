import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import EmailComponent from "../EmailComponent/EmailComponent";
import './EmailFormToggler.scss';

export default function EmailFormDisplayToggler() {
  const [displayForm, setDisplayForm] = useState(false);
  const clickHandler = () => {
    setDisplayForm(!displayForm)
  }
  return (
    <>
    <Button onClick={clickHandler} className="email-form-button">
      {displayForm ? "Hide Email Form" : "Open Email Form"}
    </Button>
    {displayForm ?
    <EmailComponent/>
    :''
    }
    </>
  );
}
