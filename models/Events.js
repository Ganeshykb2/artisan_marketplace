import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Schema for events
const EventsSchema = new mongoose.Schema({
  eventid: {
    type: String,
    default: uuidv4, // Generates a unique UUID for each event
    required: true,
    unique: true, // Ensures each event has a unique identifier
  },
  name: {
    type: String,
    required: true, // Name of the event, mandatory field
  },
  eventtype: [
    {
      type: String,
      enum: ["conference", "workshop", "webinar", "meetup", "seminar"], // You can specify event types here
    },
  ],
  Dateofevent: {
    type: Date,
    required: true, // Ensures a date is provided
  },
  location: {
    type: String,
    required: true, // Ensures the event has a location
  },
  description: {
    type: String,
    required: true, // Description for the event, mandatory
  },
  artist: { 
    type: String, 
    required: true 
  },
  participants: {
    type: [
      {
        participantId: { type: String, required: true },
        type: { type: String, enum: ["artisan", "customer"], required: true },
      }
    ],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Events || mongoose.model('Events', EventsSchema);
