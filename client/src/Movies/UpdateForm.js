import React from "react";

const UpdateForm = props => {
  console.log("UpdateForm", props);

  const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };

  return (
    <div>
      <form>
        <h4>Update Form</h4>
      </form>
    </div>
  );
};

export default UpdateForm;
