import express from "express";
const contactRouter = express.Router();

import {
  createContact,
  readContacts,
  removeContact,
  updateContact,
} from "../controllers/contactController.js";

contactRouter.post("/contact", createContact);

contactRouter.get("/contacts", readContacts);

contactRouter.delete("/contact/:id", removeContact);

contactRouter.put("/contact/:id", updateContact);

export default contactRouter;
