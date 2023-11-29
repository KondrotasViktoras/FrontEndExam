import Client from "../models/Client.js";

export async function addNewClient(req, res) {
  const { name, email, registrationDate, registrationTime } = req.body;

  if (!name || !email || !registrationDate || !registrationTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const client = new Client({
      name,
      email,
      registrationDate,
      registrationTime,
    });

    await client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllClients(req, res) {
  try {
    const clients = await Client.find({}, { __v: 0 });

    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getClientById(req, res) {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteClient(req, res) {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "cd" });
    }

    await Client.findByIdAndDelete(id);
    res.status(204).json({ message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateClient(req, res) {
  const { id } = req.params;
  const { name, email, registrationDate, registrationTime } = req.body;

  if (!name || !email || !registrationDate || !registrationTime) {
    return res.status(400).json({ message: "Dont leave empty fields" });
  }

  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.name = name;
    client.email = email;
    client.registrationDate = registrationDate;
    client.registrationTime = registrationTime;

    await client.save();

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
