const Profile = require("../models/Profile");

/*
  Create Profile :-
 Creates a new career profile and stores it in MongoDB.
 */
const createProfile = async (req, res, next) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};


/*
 Get Profile :-
  Retrieves a user's career profile from MongoDB.
 */
const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
/*
 Update Profile :-
 Updates an existing user's career profile.
 */
const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
/*
 * Delete Profile
 * --------------
 * Deletes a user's career profile.
 */
const deleteProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOneAndDelete({
      user: req.params.userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};