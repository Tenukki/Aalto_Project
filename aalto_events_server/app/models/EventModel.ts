import {
  model, Schema, Model, Types as MTypes
} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const EventSchema: Schema = new Schema({
  id: {
    type: Schema.Types.Mixed,
    unique: false,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
    trim: true,
  },
  desc: {
    type: String,
    required: false,
    trim:true
  },
  location: {
    type: String,
    required: false,
    trim:true
  },
  start: {
    type: String,
    required: false,
    trim:true
  },
  end: {
    type: String,
    required: false,
    trim:true
  },
  image: {
    type: String,
    required: false,
    trim:true
  },
  tags: {
    type: String,
    required: false,
    trim:true
  },
  created: {
    type: String,
    required: false,
    trim:true
  },
  updated: {
    type: String,
    required: false,
    trim:true
  },
});

EventSchema.plugin(uniqueValidator);

EventSchema.set('toJSON', {
  transform: (document: any, returnedObject: { id: any; _id: { toString: () => any; }; __v: any; }) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Event: Model<any> = model('Event', EventSchema);
