import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Events from "@/models/Events";
import { NextResponse } from "next/server";

const joinEventSchema = z.object({
  eventid: z.string().uuid(),
  participantId: z.string(),
  type: z.enum(["artisan", "customer"]),
});

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Request Data:", data); // Log incoming data

    const result = joinEventSchema.safeParse(data);

    if (!result.success) {
      console.log("Validation Errors:", result.error.errors);
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { eventid, participantId, type } = result.data;

    // Connect to the database
    await dbConnect();
    console.log("Connected to the database");

    // Find the event by eventid
    const event = await Events.findOne({ eventid });

    if (!event) {
      console.log(`Event with ID ${eventid} not found.`);
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Check if the participant has already joined the event
    const participantExists = event.participants.some(
      (participant) => participant.participantId === participantId
    );

    if (participantExists) {
      return NextResponse.json(
        { error: `Participant with ID ${participantId} has already joined this event` },
        { status: 400 }
      );
    }

    // Add the new participant to the participants array
    event.participants.push({ participantId, type });

    console.log("Saving updated event:", event); // Log before saving
    await event.save();

    return NextResponse.json(
      { message: "Participant successfully joined the event" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error joining event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
