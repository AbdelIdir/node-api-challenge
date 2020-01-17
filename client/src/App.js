import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  const [formInput, setFormInput] = useState({
    name: undefined,
    description: undefined
  });
  const onValueChange = event => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };
  const [greeting, setGreeting] = useState("");
  const [projects, setProjects] = useState([]);
  // const [data, setData] = useState([]);

  const getProjects = props => {
    axios
      .get("/api/projects")
      // .then(res => res.json())
      .then(projects => {
        console.log(projects);
        setProjects(projects.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // fetch("http://127.0.0.1:5100/api/landing?name=tom")
    //   .then(res => res.json())
    //   .then(greeting => setGreeting(greeting), console.log(greeting))
    //   .catch(err => {
    //     console.log("catch", err);
    //   });

    getProjects();
  }, []);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5100/api/landing?name=tom")
  //     .then(res => res.json())
  //     .then(greeting => setGreeting(greeting), console.log(greeting))
  //     .catch(err => {
  //       console.log("catch", err);
  //     });
  // }, []);

  // fetch("http://127.0.0.1:5100/api/landing?name=tom")
  //   .then(res => res.json())
  //   .then(greeting => setGreeting(greeting), console.log(greeting))
  //   .catch(err => {
  //     console.log("catch", err);
  //   });

  const onHandleSubmit = (event, newProject) => {
    event.preventDefault();

    axios
      .post("/api/projects", newProject)
      .then(data => {
        setFormInput({
          name: "",
          description: ""
        });
        // console.log(data);
        // setProjects(projects);
        getProjects();
      })

      .catch(err => alert("type in a name and description, " + err));
  };
  const DeleteProject = id => {
    // event.preventDefault();

    axios
      .delete(`/api/projects/${id}`)
      .then(data => {
        // alert(data);
        console.log(data);
        // setProjects(projects);
        getProjects();
      })

      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p> {greeting}</p>

        <form onSubmit={event => onHandleSubmit(event, formInput)}>
          {/* <p>{formInput.name}</p>
          <p>{formInput.description}</p> */}
          <label>
            Add a project you would like to work on <br />
            <br />
            <input
              type="text"
              placeholder="name of the project"
              value={formInput.name}
              name="name"
              onChange={onValueChange}
            />
            <br />
            <input
              type="text"
              placeholder="description goes here"
              name="description"
              value={formInput.description}
              onChange={onValueChange}
            />
          </label>

          <button type="submit">Submit your project</button>
        </form>

        {projects.map(proj => {
          return (
            <div
              style={{
                width: "50%",
                height: "100%",
                background: "grey",
                margin: "20px",
                borderRadius: "15px",
                boxShadow: "10px 5px 5px pink"
              }}
              key={proj.id}
            >
              <h2 style={{ color: "black" }}>Name: {proj.name}</h2>
              <p style={{ color: "black", fontWeight: "bold" }}>
                Description: {proj.description}
              </p>
              <p>Id: {proj.id}</p>

              <button onClick={() => DeleteProject(proj.id)}>
                Delete this user
              </button>
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
