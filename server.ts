import express from "express";

const app = express();
const PORT = 3331;
// app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  res.status(200).json({ msg: "GET request working" });
});

// app.get("/project/:id", (req, res) => {
//   const project = projects.find((p) => p.id === req.params.id);
//   if (project) {
//     res.status(200).json(project);
//   } else {
//     res.status(404).send("Project not found");
//   }
// });

// app.post("/projects", (req, res) => {
//   const { title, date, description } = req.body;
//   const newProject = { id: uuidv4(), title, date, description };
//   projects.push(newProject);
//   res.json(newProject);
// });

// app.put("/api/project/:id", (req, res) => {
//   console.log("Hello world");
//   const id = req.params.id;
//   const { title, description, date } = req.body;
//   const project = projects.find((project) => {
//     return project.id === id;
//   });

//   if (project) {
//     project.title = title;
//     project.description = description;
//     project.date = date;
//   } else res.status(404).send("Project not found");
// });

// app.delete("/api/project/:id", (req) => {
//   const id = req.params.id;
//   projects = projects.filter((project) => project.id !== id);
// });

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
