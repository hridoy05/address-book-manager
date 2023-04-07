import Contact from "../models/contact.model.js";

const createContact = async (req, res) => {
  const { name, mobile_number } = req.body;
  try {
    // Check for duplicate mobile number
    const existingContact = await Contact.findOne({ mobile_number });
    if (existingContact) {
      return res
        .status(400)
        .json({ error: "Duplicate mobile number not allowed" });
    }
    const contact = new Contact({ name, mobile_number });
    await contact.save();
    res.status(201).json({ message: "Contact added successfully", contact });
  } catch (error) {
    res.status(500).json({ error: "Failed to add contact" });
  }
};

const readContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findByIdAndDelete({ _id: id });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, mobile_number } = req.body;
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id },
      { name, mobile_number },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact" });
  }
};

export { createContact, readContacts, removeContact, updateContact };
