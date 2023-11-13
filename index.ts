import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3010; // 백엔드 포트 번호

app.get("/", (req: Request, res: Response) => {
  return res.send("Hello Express!");
});

app.listen(port, () => {
  console.log(`📡 Server is istening on port: ${port}`);
});
