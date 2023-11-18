
// controllers/badgeController.js
const Badge = require('../models/badgeModel');

const createBadge = (req, res) => {
    const { Name, Goal, Description, Category } = req.body;
    const badge = new Badge({ Name, Goal, Description, Category });
    badge.save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to create badge' });
      });
  };
  
  // Get all badges
const getAllBadges =  (req, res) => {
    Badge.find()
      .then((badges) => {
        res.status(200).json(badges);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to get badges' });
      });
}
  
  // Get a specific badge by ID
const getBadgeById =  (req, res) => {
    const badgeId = req.params.id;
    Badge.findById(badgeId)
      .then((badge) => {
        if (!badge) {
          res.status(404).json({ error: 'Badge not found' });
        } else {
          res.status(200).json(badge);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to get badge' });
      });
}
  
  // Update a badge by ID
const updateBadgeById = (req, res) => {
    const badgeId = req.params.id;
    const { Name, Goal, Description, Category } = req.body;
    Badge.findByIdAndUpdate(badgeId, { Name, Goal, Description, Category })
      .then((badge) => {
        if (!badge) {
          res.status(404).json({ error: 'Badge not found' });
        } else {
          res.status(200).json({ message: 'Badge updated successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to update badge' });
      });
}

const patchBadgeById = async (req, res) => {
  try {
    const documentId = req.params.id;
    const fieldToUpdate  = req.body;

    for (const [key, value] of Object.entries(fieldToUpdate)) {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value);
      fieldToUpdate[decodedKey] = decodedValue;
    }

    console.log('documentId:', documentId);
    console.log('fieldToUpdate:', fieldToUpdate);

    const updatedDocument = await Badge.findByIdAndUpdate(
      documentId, { ...fieldToUpdate },
      { new: true }
    );

    console.log('updatedDocument:', updatedDocument);

    if (!updatedDocument) {
      console.log('Document not found');
      return res.status(404).json({ error: 'Document not found' });
    }

    console.log('Field updated successfully');
    return res.status(200).json({ message: 'Field updated successfully' });
  } catch (error) {
    console.log('Failed to update field');
    return res.status(500).json({ error: 'Failed to update field' });
  }
};
  
  // Delete a badge by ID
const deleteBadgeById = (req, res) => {
    const badgeId = req.params.id;
    Badge.findByIdAndDelete(badgeId)
      .then((badge) => {
        if (!badge) {
          res.status(404).json({ error: 'Badge not found' });
        } else {
          res.status(200).json({ message: 'Badge deleted successfully' });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to delete badge' });
      });
}

module.exports = {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadgeById,
  patchBadgeById,
  deleteBadgeById
};