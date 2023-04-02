import { app } from "./app";
import { connectDB } from "./config/db";
import { Booking } from "./booking/booking";

const port = process.env.PORT || 3001;

connectDB();

app.get("/", (req, res, next) => {
    res.status(200).json({ msg: "Hello World!" });
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
