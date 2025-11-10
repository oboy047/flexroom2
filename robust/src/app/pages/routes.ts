import { route } from "rwsdk/router";
import Home from "./Home";
import RoomList from "./rooms/RoomList";
import Login from "./auth/Login";
import { Admin } from "./admin/Admin";
import { RoomDetail } from "./rooms/RoomDetail";

export const appRoutes = [
  route("/", Home),
  route("/rooms", RoomList),
  route("/rooms/:id", RoomDetail),
  route("/login", Login),
  route("/admin", Admin),
];
