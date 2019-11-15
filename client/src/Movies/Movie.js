import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    //console.log("CDM", this.props)
    this.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    console.log("deleteMovie", this.state.movie.id)
axios
.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
.then(res => {
  console.log(res.data);
  alert(`Successfully Deleted ${this.state.movie.title}`);
;
this.props.history.push("/");
})
.catch(err => {
  console.log(err);
  // alert("There was a problem. Please try delete again later.")
})

  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="buttons-wrapper">
        <MovieCard movie={this.state.movie} />
        <button className="save button" onClick={this.saveMovie}>
          Save
        </button>
        <button className="edit button" onClick={props => this.props.history.push(`/update-movie/${this.props.match.params.id}`)}>
          Edit
        </button>
        <button className="delete button" onClick={this.deleteMovie}>
          Delete
        </button>
      </div>
    );
  }
}
