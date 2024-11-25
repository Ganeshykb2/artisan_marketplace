import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Events from "@/models/Events";
import { NextResponse } from "next/server";

// Zod schema for update event
const updateEventSchema = z.object({
  eventid: z.string().uuid().optional(),
  name: z.string().optional(),
  updatedData: z.object({
    name: z.string().min(1, "Event name is required").optional(),
    eventtype: z.array(z.enum(["conference", "workshop", "webinar", "meetup", "seminar"])).optional(),
    Dateofevent: z.string().optional(),
    location: z.string().min(1, "Location is required").optional(),
    description: z.string().min(1, "Event description is required").optional(),
    artist: z.string().min(1, "Artist ID is required").optional(),
    participants: z.array(z.object({
      participantId: z.string().optional(),
      type: z.enum(["artisan", "customer"]).optional(),
    })).optional()  // Only allow modification to participants if included
  }).refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be updated"
  })
}).refine((data) => data.eventid || data.name, {
  message: "Event ID or Name is required to update an event"
});

export async function PATCH(req) {
  try {
    const data = await req.json();

    // Validate the data using Zod
    const result = updateEventSchema.safeParse(data);

    // Handle validation errors
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    // Extract validated data
    const { eventid, name, updatedData } = result.data;

    // Convert Dateofevent to Date object if it exists
    if (updatedData.Dateofevent) {
      updatedData.Dateofevent = new Date(updatedData.Dateofevent);
    }

    // Connect to the database
    await dbConnect();

    let event;

    if (eventid) {
      // Find the event by eventid
      event = await Events.findOne({ eventid: eventid });
    } else if (name) {
      // Find the event by name
      event = await Events.findOne({ name: name });
    }

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Update the event with the provided data
    Object.keys(updatedData).forEach((key) => {
      // Avoid overwriting the 'participants' field if not explicitly included
      if (key !== "participants") {
        event[key] = updatedData[key];
      } else {
        // Handle updating the participants if passed
        if (updatedData.participants) {
          // Ensure participants are updated properly, i.e., no duplicates based on participantId
          updatedData.participants.forEach((newParticipant) => {
            const participantIndex = event.participants.findIndex(
              (p) => p.participantId === newParticipant.participantId
            );
            if (participantIndex === -1) {
              // Add the participant if not already present
              event.participants.push(newParticipant);
            }
          });
        }
      }
    });

    // Save the updated event to the database
    await event.save();

    // Return success response
    return NextResponse.json({ message: "Event updated successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
