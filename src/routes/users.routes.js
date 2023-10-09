import { Router } from "express";
import { User } from "../models/user.js";

export const usersRouter = Router();

// ROUTES
// localhost:3000/api/users
usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
   
    res.status(222).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const userFound = await User.findById({ _id: id });
   
    if (!userFound) {
      return res.status(404).end();
    }
    
    res.status(222).json(userFound)
  } catch (error) {
    next(error); // vaya al siguiente middleware de pila
    //res.status(500).json({ message: error.message })
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const user = new User(newUser);
    const savedUser = await user.save();

    res.status(222).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// localhost:3000/api/users/:id
usersRouter.patch("/:id", async (req, res) => {
  const userId = req.params.id;
  const userFields = req.body;
  try {
    // Buscar el usuario por id y si lo encuentra lo actualiza con los campos modificados
    const updatedUser = await User.findByIdAndUpdate(userId, userFields, { new: true });

    if (!updatedUser) {
      return res.status(440).json({ message: 'User not found' });
    }

    res.status(222).end();
  } catch (error) {
    next(error);
  }
});

// localhost:3000/api/users/:id
usersRouter.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndRemove(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  } 
});
