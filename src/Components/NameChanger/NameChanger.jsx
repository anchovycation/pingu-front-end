import React, { useContext } from "react";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NameChangerContext } from "../../Contexts";

import './NameChanger.scss'

function NameChanger({inputProps, icon}) {
  const { setWillBeRenamed, changeName } = useContext(NameChangerContext);

  return (
    <div className="row">
      <div className="col-10">
        <TextInput
        {...inputProps}
        valueSetter={setWillBeRenamed}
        />
      </div>
      <div className="col-2 icon">
        <FontAwesomeIcon icon={icon} onClick={changeName} />
      </div>
    </div>
  );
}

export default NameChanger;
