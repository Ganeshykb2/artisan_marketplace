import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Events from "@/models/Events";
import { NextResponse } from "next/server";

// Zod schema for delete event
const deleteEventSchema = z.object({
  eventid: z.string().uuid().optional(),
  name: z.string().optional(),
}).refine((data) => data.eventid || data.name, {
  message: "Event ID or Name is required to delete an event",
});

export async function DELETE(req) {
  try {
    const data = await req.json();

    // Validate the data using Zod
    const result = deleteEventSchema.safeParse(data);

    // Handle validation errors
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    // Extract validated data
    const { eventid, name } = result.data;

    // Connect to the database
    await dbConnect();

    let event;

    if (eventid) {
      // Check if the event exists by eventid
      console.log(`Searching for event with eventid: ${eventid}`);
      event = await Events.findOne({ eventid: eventid });
    } else if (name) {
      // Check if the event exists by name
      console.log(`Searching for event with name: ${name}`);
      event = await Events.findOne({ name: name });
    }

    if (!event) {
      console.log(`Event not found with ${eventid ? `eventid: ${eventid}` : `name: ${name}`}`);
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    // Optionally, if you want to clear any participants' associations before deletion
    // If there are participants, you could remove references if needed, for example, by updating the users
    // This step is only necessary if your schema requires updating users or managing associations
    // For this example, we're not doing any specific operations on participants before deletion.

    // Delete the event
    await event.deleteOne();

    // Return success response
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
