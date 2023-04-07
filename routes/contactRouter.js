const express = require("express");
const contactRouter = express.Router();

const {
  createContact,
  readContacts,
  removeContact,
  updateContact,
} = require("../controllers/contactController");

categoryRouter.post("/category", createContact);

categoryRouter.get("/categories", readContacts);

categoryRouter.delete("/category/:id", removeContact);

categoryRouter.put("/category/:id", updateContact);

module.exports = categoryRouter;
