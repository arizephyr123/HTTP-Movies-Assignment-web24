import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  console.log("UpdateForm", props);

  //props param passes in id from url
  //movie state holds movie being updated, uses initialMovie const as initial Value

  const [movie, setMovie] = useState(initialMovie);

  const changeHandler = e => {
    //e.persist(); <-- needed??
    //holds value of changed movie property input on form
    let value = e.target.value;
    if (e.target.name === "id" || "metascore") {
      value = parseInt(value, 10);
    } else if (e.target.name === "stars"){
value = value.split(",");
console.log("stars array?", value)
    } else {
return value
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  useEffect(() => {
    if (props.movies.length > 0) {
      const newMovie = props.items.find(
        item => `${item.id}` === props.match.params.id
      );
      setMovie(newMovie);
    }
  }, [props.items, props.match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log("handleSubmit", movie, res.data);
        props.updateMovies(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  };

  //loading state if we don't have data yet
  if(props.movies.length === 0){
      return <h2>Loading movie data...</h2>
  };

  return (
    <div>
         <h4>Update Form</h4>
      <form onSubmit={handleSubmit}>
          <input
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='Title'
          value={movie.title}
          />
          <input
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='Director'
          value={movie.director}
          />
          <input
          type='number'
          name='metascore'
          onChange={changeHandler}
          placeholder='Metascore'
          value={movie.metascore}
          />
          <input
          type='string'
          name='stars'
          onChange={changeHandler}
          placeholder='Actors'
          value={movie.stars}
          />
          <button>Update</button>
       
      </form>
    </div>
  );
};

export default UpdateForm;
