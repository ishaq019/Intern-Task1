import User from "../models/User.js";
import Address from "../models/Address.js";
import Counter from "../models/Counter.js";

const LIMIT = 5;

const escapeRegex = text =>
  text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const nextUserID = async () => {
  const c = await Counter.findByIdAndUpdate(
    "userID",
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `USER_${String(c.seq).padStart(3, "0")}`;
};


export const getUsers = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const search = req.query.search?.trim();

  const regex = search ? new RegExp(escapeRegex(search), "i") : null;

  const searchMatch = regex
    ? {
        $or: [
          { userID: regex },
          { name: regex },
          { phone: regex },
          { gender: regex },
          { address: regex },
          ...(!isNaN(search) ? [{ age: Number(search) }] : [])
        ]
      }
    : {};

  const [result] = await User.aggregate([
    {
      $lookup: {
        from: Address.collection.name,
        localField: "_id",
        foreignField: "user",
        as: "addressData"
      }
    },
    {
      $unwind: {
        path: "$addressData",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        address: { $ifNull: ["$addressData.address", ""] },
        addressId: { $ifNull: ["$addressData._id", ""] }
      }
    },
    {
      $match: searchMatch
    },
    {
      $facet: {
        users: [
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * LIMIT },
          { $limit: LIMIT },
          {
            $project: {
              addressData: 0
            }
          }
        ],
        count: [
          { $count: "total" }
        ]
      }
    }
  ]);

  const users = result.users;
  const total = result.count[0]?.total || 0;

  res.json({
    users,
    total,
    page,
    pages: Math.ceil(total / LIMIT) || 1
  });
};

export const addUser = async (req, res) => {
  const user = await User.create({ ...req.body, userID: await nextUserID() });
  res.status(201).json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await Address.deleteMany({ user: req.params.id });
  res.json({ message: "User deleted" });
};