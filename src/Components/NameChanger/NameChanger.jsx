import { React, useContext } from "react";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './NameChanger.scss'

function NameChanger({inputProps, icon}) {

  return (
    <div className="row">
      <div className="col-10">
        <TextInput
          {...inputProps}
        />
      </div>
      <div className="col-2 icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
}

export default NameChanger;
