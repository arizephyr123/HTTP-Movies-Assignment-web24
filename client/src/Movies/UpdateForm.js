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

  //props param passes in id from url
  //movie state holds movie being updated, uses initialMovie const as initial Value

  const updateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const changeHandler = e => {
      //e.persist(); <-- needed??
      //holds value of changed movie property input on form
      let value = e.target.value;
      if (e.target.name === "id" || "metascore") {
        value = parseInt(value, 10);
      }
      setMovie({
        ...movie,
        [e.target.name]: value
      });
    };
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
