import { POST, GET, PUT, DELETE } from "./method";

// root api url
const API = {
  // auth
  login: (body) => POST("users/login", body),
  register: (body) => POST("users/register", body),
  registerAdmin: (body) => POST("users/registerAdmin", body),
  getUser: () => GET("users/user"),
  getUserId: (id) => GET(`users/${id}`),
  // teams
  loginTeams: (body) => POST("teams/login", body),
  registerTeams: (body) => POST("teams/register", body),
  getTeams: () => GET("teams/team"),
  getAllTeams: () => GET("teams"),
  getTeamsId: (id) => GET(`teams/${id}`),
  getKlasemen: (eventId, status) => GET(`teams/klasemen?EventId=${eventId}&status=${status}`),
  // events
  addEvent: (body) => POST("events/add", body),
  getEvents: () => GET("events"),
  getEventId: (id) => GET(`events/${id}`),
  updateEventId: (id, body) => PUT(`events/${id}`, body),
  deleteEventId: (id) => DELETE(`events/${id}`),
  // gift
  addGift: (body) => POST("gifts/add", body),
  getGifts: () => GET("gifts"),
  getGiftId: (id) => GET(`gifts/${id}`),
  updateGiftId: (id, body) => PUT(`gifts/${id}`, body),
}

export default API;