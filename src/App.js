import React, {useEffect, useState} from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data);
    });
  }, [] );

  async function handleAddRepository() {
    await api.post('repositories', {
      title: 'Novo projeto',
    })
    .then(response => {
      setProjects([...projects, response.data] )
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setProjects(projects.filter((projects) => projects.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {projects.map(project => {
            return (
              <li key={project.id}>{project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>
                  Remover
                </button>
              </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
