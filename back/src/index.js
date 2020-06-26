const express = require("express");
const { uuid, isUuid } = require("uuidv4");
const app = express();

app.use(express.json());
//rota Get
// resquest = armazena as informações do usuário, ex: nome, email ...
// response = é o retorno da função

/*Metodos http
 * Get - ober informação do back
 * Post - Criar itens no back
 * Put/Patch - Alterar informação no back (put atualiza varias coisas e path atualiza informação especifica)
 * Delete - Apaga informação do back
 */

/*Tipos de parametros
 *
 * Query params: filtros e páginação
 * Routs Params: identificar recursos (update/delete)
 * Request body: conteúdo na hora de criar ou editar um recurso (Jsons)
 */

/*Middlewares
 *
 * intercptador de requisições
 * * interromper requisoções
 * alterar dados da requisição
 */

const projects = [];

//Middlewares
function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;
  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project id!" });
  }
  return next();
}
//app use
app.use(logRequests);
app.use("/projects/:id", validateProjectId);

//GET
app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;
  return response.json(results);
});

//POST
app.post("/projects", (request, response) => {
  const { title, owner, likes } = request.body;
  const project = { id: uuid(), title, owner, likes };
  projects.push(project);
  return response.json(project);
});

//PUT
app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found " });
  }
  const project = { id, title, owner };
  projects[projectIndex] = project;

  return response.json(project);
});

//DELETE
app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "project not found " });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("back end started!");
});
