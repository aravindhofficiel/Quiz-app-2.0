import bcrypt from "bcrypt";
import knex from "../db/knex.js";

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exists = await knex("users").where({ email }).first();
  if (exists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const [id] = await knex("users").insert({
    name,
    email,
    password_hash: hash,
    role,
  });

  res.status(201).json({ id, message: "User created" });
};

export const getUsers = async (req, res) => {
  const users = await knex("users").select("id", "name", "email", "role");
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  await knex("users").where({ id }).del();
  res.json({ message: "User deleted" });
};
