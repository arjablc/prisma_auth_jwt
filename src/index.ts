import express from "express";
import { signUpHandler, loginHandler, logoutHandler } from "./userController";
import cookieParser from "cookie-parser";
import { deserializeUser } from "./deserializeUser";
import { getResouceHandler } from "./resource";
import { requireUser } from "./requireUser";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.clear();
app.post("/login", loginHandler);
app.post("/sign-up", signUpHandler);
app.delete("/logout", logoutHandler);
app.use(deserializeUser);
app.get("/resources", requireUser, getResouceHandler);
app.listen(8000, () => {
  console.log("Server started successfully at http://localhost:8000");
});
