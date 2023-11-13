// index.ts
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3010; // 백엔드 포트 번호

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const body = req.body;

  console.log(body);

  return res.json("Hello Express!");
});

app.listen(port, () => {
  console.log(`📡 Server is istening on port: ${port}`);
});
