import { Schema, model } from "mongoose";

interface IBeer {
  beerStyle: string;
  minTemp: number;
  maxTemp: number;
}

const beerSchema: Schema = new Schema(
  {
    beerStyle: {
      type: String,
      required: true,
      unique: true,
    },
    minTemp: {
      type: Number,
      required: true,
    },
    maxTemp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Beer = model<IBeer>("Beer", beerSchema);

export { Beer, IBeer };
