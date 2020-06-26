import React, { useState } from "react";
import Header from "./components/Header";
// componmente
// propriedade
// estado

function App() {
  const [projects, setProjects] = useState(["dev App", "front End"]);

  //useState retorna array com 2 posições
  //1 - o valor total de projetos
  //2 - função de update

  function hundleAddProject() {
    setProjects([...projects, `New Project ${Date.now()}`]);
    console.log(projects);
  }

  return (
    <>
      <Header title="Porjects" />
      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>

      <button type="button" onClick={hundleAddProject}>
        Add project
      </button>
    </>
  );
}

export default App;
