import { route } from "rwsdk/router";
import Home from "./Home";
import RoomList from "./rooms/RoomList";
import Login from "./auth/Login";
import Admin from "./admin/Admin";
import AdminPage from "./admin/adminPage";
import RoomsPayment from "./rooms/RoomPayment";
import { RoomDetail } from "./rooms/RoomDetail";
import Register from "./Register";
import ContactPage from "./contact/ContactPage";

export const appRoutes = [
  route("/", Home),
  route("/rooms", RoomList),
  route("/rooms/:id/payment", RoomsPayment),
  route("/rooms/:id", RoomDetail),
  route("/login", Login),
  route("/admin", Admin),
  route("/adminpage", AdminPage),
  route("/register", Register),

  route("/contact", ContactPage),
];
