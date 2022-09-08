import React, {useState} from "react";

import Button from "react-bootstrap/Button";
import EmailComponent from "./EmailComponent/EmailComponent";

export default function EmailFormDisplayToggler() {
  const [displayForm, setDisplayForm] = useState(false);
  const clickHandler = () => {
    setDisplayForm(!displayForm)
  }
  return (
    <>
    <Button onClick={clickHandler} className="button">
      {displayForm ? "Hide Email Form" : "Open Email Form"}
    </Button>
    {displayForm ?
    <EmailComponent/>
    :''
    }
    </>
  );
}
