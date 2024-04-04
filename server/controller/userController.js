import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    const saveData = await userData.save();
    res.status(200).json({ msg: "User Created Successfully", data: saveData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      res.status(404).json({ msg: "User data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "User not found" });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (password != userExist.password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "Logged in successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const admin = async (req, res) => {
  try {
    const { email, password, key } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (password != userExist.password) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    if (key != userExist.key) {
      return res.status(401).json({ msg: "Invalid key" });
    } else {
      return res
        .status(200)
        .json({ success: true, msg: "Logged in successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getUser = async (req, res) => {
  try {
    const loggedInUserId = req.User._id;
    getUser;
    console.log("in"); // Assuming you have implemented user authentication and stored user information in req.user
    const userExist = await User.findById(loggedInUserId).select("-password");
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    } else {
      return res.status(200).json(userExist);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const attendClass = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { attendedClass: 1 } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
