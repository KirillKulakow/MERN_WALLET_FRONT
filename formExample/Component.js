import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBasicInputs } from "../../redux/actions/basicInfo";
const Component = () => {
  const { jobTitle } = useSelector((state) => state.resume.basicInfo);
  const dispatch = useDispatch();

  const inputChange = (e) => {
    dispatch(changeBasicInputs(e));
  };

  return (
    <div>
      <input
        type="text"
        name="jobTitle"
        value={jobTitle}
        onChange={inputChange}
      />
    </div>
  );
};

export default Component;
