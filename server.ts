import express from "express";
import cors from "cors";
// import axios from "axios";
// import cheerio from "cheerio";

import puppeteer from "puppeteer";

const app = express();
const PORT = 3331;
app.use(cors());
app.use(express.json());

// app.get("/products", (req, res) => {
//   res.status(200).json({ msg: "GET request working" });
// });

//------------------ PUPPETEER SCRAPING ---------------------------------------

interface Product {
  title: string | null;
  image: string | null;
  link: string | null;
}

const scrapeZalandoWithPuppeteer = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
    );

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const requestUrl = request.url();

      if (requestUrl.startsWith("https://www.zalando.de")) {
        request.continue();
      } else {
        request.abort();
      }
    });

    await page.goto("https://www.zalando.de/modetrends/", {
      waitUntil: "networkidle0",
    });

    const products = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll(
          ".XLgdq7._0xLoFW.JgpeIw.r9BRio.be4rWJ.xlsKrm._4oK5GO.bhd0J_.AEfWtw._0xLoFW.be4rWJ.heWLCX > li"
        )
      );
      const results: Product[] = [];

      items.forEach((item) => {
        const titleElement = item.querySelector("article");
        const imageElement = item.querySelector("img");
        const linkElement = item.querySelector("a");

        const title = titleElement ? titleElement.innerText.trim() : null;
        const link = linkElement ? linkElement.href : null;
        const image = imageElement
          ? imageElement.getAttribute("src") ||
            imageElement.getAttribute("data-src")
          : null;

        if (title || image || link) {
          results.push({ title, link, image });
        }
      });

      return results;
    });

    await browser.close();

    console.log(`Products found:`, products);

    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error while scraping Zalando: ${error.message}`);
    } else {
      throw new Error("Unknown error occurred while scraping Zalando");
    }
  }
};

app.get("/fashiontrends", async (req, res) => {
  try {
    const products = await scrapeZalandoWithPuppeteer();

    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).send("No products found");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(`Error while scraping: ${error.message}`);
    } else {
      res.status(500).send("Unknown error occurred while scraping");
    }
  }
});

// const scrapeZalandoWithPuppeteer = async (): Promise<Product[]> => {
//   try {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto("https://www.zalando.de/modetrends/");
//     const htmlContent = await page.content();
//     console.log(htmlContent);

//     const products = await page.evaluate(() => {
//       const items = document.querySelectorAll(
//         ".sDq_FX _2kjxJ6 FxZV-M HlZ_Tf DgFgr2"
//       );
//       const results: Product[] = [];
//       items.forEach((item) => {
//         const title = (
//           item.querySelector("h2") as HTMLElement
//         )?.innerText.trim();
//         // const imageUrl = (
//         //   item.querySelector("img") as HTMLImageElement
//         // )?.getAttribute("src");
//         if (title) {
//           results.push({ title });
//         }
//       });
//       return results;
//     });

//     await browser.close();

//     console.log(`Products found:`, products);

//     return products;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Error while scraping Zalando: ${error.message}`);
//     } else {
//       throw new Error("Unknown error occurred while scraping Zalando");
//     }
//   }
// };

// app.get("/fashiontrends", async (req, res) => {
//   try {
//     // const url = "https://www.zalando.de/modetrends/";
//     const products = await scrapeZalandoWithPuppeteer();

//     if (products.length > 0) {
//       res.json(products);
//     } else {
//       res.status(404).send("No products found");
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).send(`Error while scraping: ${error.message}`);
//     } else {
//       res.status(500).send("Unknown error occurred while scraping");
//     }
//   }
// });

//------------------ CHEERIO / AXIOS SCRAPING ---------------------------------------

// const womanUrl = "https://www.zalando.de/modetrends/";
// axios(womanUrl)
//   .then((response) => {
//     const womamTrends = response.data;
//     const $ = cheerio.load(womamTrends);
//     const trends = [] as string[];
//     $("div[data-trckng-component]", womamTrends).each(() => {
//       const text = $(this).text();
//       trends.push(text);
//     });
//     console.log(trends);
//   })
//   .catch((error) => console.log(error));

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

// --------------------PROJECTMANAGEMENT REQUESTS-------------------------------------

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

app.get("/test-cors", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("CORS is working!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
