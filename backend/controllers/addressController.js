import User from "../models/User.js";
import Address from "../models/Address.js";

export const getAddresses = async (req, res) => {
  res.json(await Address.find().populate("user", "userID name").sort({ createdAt: -1 }));
};

export const getAddressByUser = async (req, res) => {
  const address = await Address.findOne({ user: req.params.userId });
  res.json(address || null);
};

export const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const exists = await Address.findOne({ user: user._id });
    if (exists) return res.status(400).json({ message: "Address already added. Update it instead." });

    const address = await Address.create({
      user: user._id,
      address: req.body.address
    });

    res.status(201).json(address);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "Address already exists" });
    }

    res.status(500).json({ message: e.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id,
      { address: req.body.address },
      { new: true, runValidators: true }
    );

    if (!address) return res.status(404).json({ message: "Address not found" });

    res.json(address);
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "Address already exists" });
    }

    res.status(500).json({ message: e.message });
  }
};