import { app } from "./app";

const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
    res.status(200).json({ msg: "Hello World!" });
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
