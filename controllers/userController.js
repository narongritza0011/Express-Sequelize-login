const User = require("../models/User");
const bcrypt = require('bcrypt');


const UserController = {
  // Implement other controller functions for CRUD operations

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //getUserById
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  //createUser
  createUser: async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        await User.create({ username, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
      }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username } = req.body;

      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's attributes
      user.username = username;
     

      // Save the updated user
      await user.save();

      // Return the updated user in the response
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Find the user by ID
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Delete the user
      await user.destroy();

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = UserController;
