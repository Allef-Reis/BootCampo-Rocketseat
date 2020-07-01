import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import api from "./services/api";
//import background from "./assets/fire.jpg";
// componmente
// propriedade
// estado
//useState retorna array com 2 posições
//1 - o valor total de projetos
//2 - função de update

function App() {
  //useState
  const [projects, setProjects] = useState([]);

  //useEffect
  useEffect(
    () =>
      api.get("/projects").then((response) => {
        setProjects(response.data);
      }),
    []
  );

  async function hundleAddProject() {
    // setProjects([...projects, `New Project ${Date.now()}`]);
    const response = await api.post("projects", {
      title: `New Project ${Date.now()}`,
      owner: "allef reis",
    });
    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Porjects" />
      {
        //} <img width={800} src={background} />
      }
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={hundleAddProject}>
        Add project
      </button>
    </>
  );
}

export default App;
