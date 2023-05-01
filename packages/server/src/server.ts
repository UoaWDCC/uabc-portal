import { app } from "./app";
import { connectDB } from "./mongo";

connectDB()

const port = process.env.PORT || 3000;

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );

