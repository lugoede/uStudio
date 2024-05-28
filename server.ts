import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const app = express();
const PORT = 3331;
// app.use(cors());
app.use(express.json());

// app.get("/products", (req, res) => {
//   res.status(200).json({ msg: "GET request working" });
// });

const womanUrl = "https://www.zalando.de/modetrends/";

axios(womanUrl)
  .then((response) => {
    const womamTrends = response.data;
    const $ = cheerio.load(womamTrends);
    const trends = [] as string[];
    $("div[data-trckng-component]", womamTrends).each(() => {
      const text = $(this).text();
      trends.push(text);
    });
    console.log(trends);
  })
  .catch((error) => console.log(error));

// const scrapeTrends = async (url: string, category: string) => {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);
//     const data = {
//       texts: [] as string[],
//       images: [] as string[],
//     };

//     $("*").each((index, element) => {
//       const text = $(element).text().trim();
//       if (text) {
//         data.texts.push(text);
//       }
//     });

//     $("img").each((index, element) => {
//       const imageUrl = $(element).attr("src");
//       if (imageUrl) {
//         data.images.push(imageUrl);
//       }
//     });
//     // console.log(data);

//     return { category, ...data };
//   } catch (error) {
//     throw new Error("Error while scraping Zalando");
//   }
// };

// app.get("/fashiontrends", async (req, res) => {
//   try {
//     const womenUrl = "https://www.zalando.de/modetrends/";
//     const menUrl = "https://www.zalando.de/neuheiten-herren/?_rfl=en";

//     const [womenData, menData] = await Promise.all([
//       scrapeTrends(womenUrl, "women"),
//       scrapeTrends(menUrl, "men"),
//     ]);

//     res.json({ women: womenData, men: menData });
//   } catch (error) {
//     res.status(500).send("Error while scraping Zalando");
//   }
// });

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
