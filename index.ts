// index.ts
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const port = 3010;

const client = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  const body = req.body;

  console.log(body);

  return res.json("Hello Express!");
});

app.post("/user", async (req, res) => {
  try {
    // 1. 어카운트 패스워드 받아오기
    const { account, password } = req.body;
    console.log(account, password);

    // 2. 유저가 존재하는지 확인
    const existUser = await client.user.findUnique({
      where: {
        account, // account: account,
      },
    });

    console.log(existUser);

    // 3. 있으면 리턴 (종료)
    if (existUser) {
      return res
        .status(400)
        .json({ ok: false, message: "Already exist user." });
    }

    // 4. 없으면 생성
    const newUser = await client.user.create({
      data: {
        account,
        password,
      },
    });

    console.log(newUser);

    // 5. 생성 후 종료
    return res.json({ ok: true, user: newUser });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`📡 Server is istening on port: ${port}`);
});
