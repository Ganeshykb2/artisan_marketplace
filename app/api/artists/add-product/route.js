import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Product from "@/models/Product"; // Product model
import { NextResponse } from "next/server";
import Artists from "@/models/Artists";

//Zod schema for product creation
const createProductSchema = z.object({
  category: z.string().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().int().min(0, "Quantity must be a non-negative integer"),
  artist: z.string().min(1, "Artisan ID is required")
});

//handle the POST request
export async function POST(req) {
  try {
    const data = await req.json();
    
    // Zod schema validation
    const result = createProductSchema.safeParse(data);
    
    // Handle validation errors
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }
    
    // Extract validated data
    const {
      category,
      name,
      price,
      description,
      quantity,
      artist
    } = result.data;

    // Connect to the database
    await dbConnect();

    const artistExists = await Artists.findOne({ id: artist });
    if (!artistExists) {
      return NextResponse.json(
        { error: "Artist not found" },
        { status: 404 }
      );
    }
    
    // Create a new product object using the validated data
    const newProduct = new Product({
      category,
      name,
      price,
      description,
      quantity,
      artist
    });
    
    // Save the new product to the database
    await newProduct.save();
    
    // Return success response
    return NextResponse.json(
      { message: "Product added successfully" },
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
