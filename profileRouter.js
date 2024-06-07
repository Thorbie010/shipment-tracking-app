const express = require('express');
const router = express.Router();
const { User } = require('../models');
const fs = require('fs');
const path = require('path');

// Route to handle edit profile requests
router.put('/api/profile', async (req, res) => {
  try {
    // Extract updated user profile data from request body
    const { firstName, lastName } = req.body;
    const photo = req.file; // Assuming photo is received as a file upload

    // Find the user by ID (assuming you have authentication and user ID available)
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's profile data
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;

    // Handle photo upload
    if (photo) {
      const uniqueFileName = `${Date.now()}-${photo.originalname}`;
      const uploadPath = path.join(__dirname, '../uploads/', uniqueFileName);
      
      // Save the photo to the local file system
      fs.writeFileSync(uploadPath, photo.buffer);

      // Store the filename (or file path) in the database
      user.photoname = uniqueFileName;
    }

    // Save changes to the database
    await user.save();

    // Return updated user profile
    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating profile' });
  }
});

module.exports = router;
