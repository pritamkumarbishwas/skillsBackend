import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      default: "",
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    projectOwner: {
      type: String,
      trim: true,
      default: "",
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Project",
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
