import mongoose, { Model } from "mongoose";
import { ITag } from "../types";

interface TagModel extends Model<ITag> {
  getAll(): Promise<ITag[]>;
}

const tagSchema = new mongoose.Schema<ITag, TagModel>({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

tagSchema.statics.getAll = function () {
  // Return all tags with the count of tasks associated with each tag
  return Tag.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "tag",
        as: "tasks",
      },
    },
    {
      $project: {
        name: 1,
        icon: 1,
        createdAt: 1,
        count: { $size: "$tasks" },
      },
    },
  ]);
}

tagSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

const Tag = mongoose.model<ITag, TagModel>("Tag", tagSchema);

export default Tag;
