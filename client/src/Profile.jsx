import { useEffect, useState } from "react";
import {
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import API from "./api";
import Register from "./Register";

function Profile() {
  const [userId, setUserId] = useState(() =>
    localStorage.getItem("userId")
  );

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    education: {
      degree: "",
      branch: "",
      college: "",
      graduationYear: "",
    },
    experienceLevel: "student",
    skills: "",
    targetRole: "",
    bio: "",
  });

  /*
    Registration completed :-
    Store the new user ID in React state so the Profile page immediately starts working without req.
    a manual refresh.
  */
  const handleRegistered = (user) => {
    if (!user?.id) {
      setError("Registration completed but user ID was not returned.");
      return;
    }

    setUserId(user.id);
    setLoading(true);
    setError("");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      /*
        No user means this is a new visitor :- 
        Show the existing Register page instead of displaying "Please register first."
      */
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get(
          `/profile/${userId}`
        );

        const profileData = response.data.data;

        setProfile(profileData);

        setFormData({
          education: {
            degree:
              profileData.education?.degree || "",
            branch:
              profileData.education?.branch || "",
            college:
              profileData.education?.college || "",
            graduationYear:
              profileData.education?.graduationYear || "",
          },

          experienceLevel:
            profileData.experienceLevel || "student",

          skills:
            profileData.skills?.join(", ") || "",

          targetRole:
            profileData.targetRole || "",

          bio:
            profileData.bio || "",
        });

        setShowForm(false);
        setError("");
      } catch (error) {
        if (error.response?.status === 404) {
          /*
            User exists but hasn't created their
            career profile yet.
          */
          setShowForm(true);
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "degree" ||
      name === "branch" ||
      name === "college" ||
      name === "graduationYear"
    ) {
      setFormData({
        ...formData,

        education: {
          ...formData.education,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const profileData = {
        user: userId,

        education: {
          ...formData.education,

          graduationYear:
            formData.education.graduationYear
              ? Number(
                  formData.education.graduationYear
                )
              : undefined,
        },

        experienceLevel:
          formData.experienceLevel,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        targetRole:
          formData.targetRole,

        bio:
          formData.bio,
      };

      let response;

      if (profile) {
        response = await API.put(
          `/profile/${userId}`,
          profileData
        );
      } else {
        response = await API.post(
          "/profile",
          profileData
        );
      }

      setProfile(response.data.data);
      setShowForm(false);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save profile."
      );
    }
  };

  /*
    New user:
    Show the existing Register page inside Profile.
  */
  if (!userId) {
    return (
      <Register
        onRegistered={handleRegistered}
      />
    );
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <UserRound size={22} />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error && !showForm) {
    return (
      <p className="error-text">
        {error}
      </p>
    );
  }

  /*
    Create / Edit Profile
  */
  if (showForm) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <div>
            <p className="section-eyebrow">
              CAREER PROFILE
            </p>

            <h1>
              {profile
                ? "Edit Your Profile"
                : "Create Your Profile"}
            </h1>

            <p>
              Build your profile to personalize your Career-Compass recommendations.
            </p>
          </div>

          <div className="profile-header-icon">
            <UserRound size={30} />
          </div>
        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >
          {/* Education */}
          <div className="profile-form-section">
            <div className="profile-form-heading">
              <div className="profile-form-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <p className="section-eyebrow">
                  EDUCATION
                </p>

                <h2>Academic Background</h2>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="form-group">
                <label>Degree</label>

                <input
                  type="text"
                  name="degree"
                  placeholder="e.g. B.Tech"
                  value={
                    formData.education.degree
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Branch</label>

                <input
                  type="text"
                  name="branch"
                  placeholder="e.g. Computer Science"
                  value={
                    formData.education.branch
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>College</label>

                <input
                  type="text"
                  name="college"
                  placeholder="Your college"
                  value={
                    formData.education.college
                  }
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Graduation Year
                </label>

                <input
                  type="number"
                  name="graduationYear"
                  placeholder="e.g. 2027"
                  value={
                    formData.education
                      .graduationYear
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Career */}
          <div className="profile-form-section">
            <div className="profile-form-heading">
              <div className="profile-form-icon">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <p className="section-eyebrow">
                  CAREER
                </p>

                <h2>Career Direction</h2>
              </div>
            </div>

            <div className="form-group">
              <label>
                Experience Level
              </label>

              <select
                name="experienceLevel"
                value={
                  formData.experienceLevel
                }
                onChange={handleChange}
              >
                <option value="student">
                  Student
                </option>

                <option value="fresher">
                  Fresher
                </option>

                <option value="entry-level">
                  Entry Level
                </option>

                <option value="experienced">
                  Experienced
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Skills</label>

              <input
                type="text"
                name="skills"
                placeholder="JavaScript, React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
              />

              <p className="muted-text">
                Separate skills with commas.
              </p>
            </div>

            <div className="form-group">
              <label>Target Role</label>

              <input
                type="text"
                name="targetRole"
                placeholder="e.g. Full Stack Developer"
                value={formData.targetRole}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>

              <textarea
                name="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="error-text">
              {error}
            </p>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              <CheckCircle2 size={17} />

              {profile
                ? "Update Profile"
                : "Create Profile"}
            </button>

            {profile && (
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  /*
    Profile Display
  */
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <p className="section-eyebrow">
            CAREER PROFILE
          </p>

          <h1>My Profile</h1>

          <p>
            Your personal and career information
            used by Career-Compass.
          </p>
        </div>

        <div className="profile-header-icon">
          <UserRound size={30} />
        </div>
      </div>

      <div className="profile-grid">
        {/* Career Information */}
        <div className="profile-section profile-highlight">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <BriefcaseBusiness size={19} />
            </div>

            <h2>Career Information</h2>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              EXPERIENCE LEVEL
            </p>

            <p className="profile-value profile-emphasis">
              {profile?.experienceLevel ||
                "Not set"}
            </p>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              TARGET ROLE
            </p>

            <p className="profile-value profile-role">
              {profile?.targetRole ||
                "Not set"}
            </p>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              SKILLS
            </p>

            {profile?.skills?.length ? (
              <div className="profile-skills">
                {profile.skills.map(
                  (skill, index) => (
                    <span
                      className="profile-skill"
                      key={index}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="profile-value">
                No skills added
              </p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="profile-section">
          <div className="profile-section-heading">
            <div className="profile-section-icon">
              <GraduationCap size={19} />
            </div>

            <h2>Education</h2>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              DEGREE
            </p>

            <p className="profile-value">
              {profile?.education?.degree ||
                "Not provided"}
            </p>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              BRANCH
            </p>

            <p className="profile-value">
              {profile?.education?.branch ||
                "Not provided"}
            </p>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              COLLEGE
            </p>

            <p className="profile-value">
              {profile?.education?.college ||
                "Not provided"}
            </p>
          </div>

          <div className="profile-item">
            <p className="profile-label">
              GRADUATION YEAR
            </p>

            <p className="profile-value">
              {profile?.education
                ?.graduationYear ||
                "Not provided"}
            </p>
          </div>
        </div>

        {/* Bio */}
        {profile?.bio && (
          <div className="profile-section profile-bio">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <UserRound size={19} />
              </div>

              <h2>About You</h2>
            </div>

            <p>{profile.bio}</p>
          </div>
        )}
      </div>

      <div className="profile-edit-action">
        <button
          className="primary-button"
          onClick={() =>
            setShowForm(true)
          }
        >
          <Pencil size={17} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;