import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Artists from "@/models/Artists";
import Events from "@/models/Events";
import { NextResponse } from "next/server";

// Zod schema for event creation
const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  eventtype: z.array(z.enum(["conference", "workshop", "webinar", "meetup", "seminar"])),
  Dateofevent: z.string(),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Event description is required"),
  artist: z.string().min(1, "Artist ID is required"),
  // The participants field will default to an empty array
  participants: z.array(
    z.object({
      participantId: z.string(),
      type: z.enum(["artisan", "customer"]),
    })
  ).optional().default([]),
});

export async function POST(req) {
  try {
    const data = await req.json();

    // Zod schema validation
    const result = createEventSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const {
      name,
      eventtype,
      Dateofevent,
      location,
      description,
      artist,
      participants, // New participants field
    } = result.data;

    // Connect to the database
    await dbConnect();

    // Check if the artist exists in the database
    const artistExists = await Artists.findOne({ id: artist });
    if (!artistExists) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    // Create the new event
    const newEvent = new Events({
      name,
      eventtype,
      Dateofevent,
      location,
      description,
      artist,
      participants, // Assign participants (defaults to an empty array)
    });

    // Save the new event to the database
    await newEvent.save();

    // Return a success response
    return NextResponse.json(
      { message: "Event created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// {
//   "name": "Artisan Conference 2024",
//   "eventtype": ["conference", "workshop"],
//   "Dateofevent": "2024-12-15",
//   "location": "New York, NY",
//   "description": "A conference for artisans to showcase their work and attend workshops.",
//   "artist": "d20c23b5-2183-4a99-bf73-fd2b69098e5b",
//   "participants": [ // can leave empty OPTIONAL
//     {
//       "participantId": "d20c23b5-2183-4a99-bf73-fd2b69098e5b",
//       "type": "artisan" 
//     }
//   ]
// }