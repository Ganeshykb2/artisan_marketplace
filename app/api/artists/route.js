import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import Artists from "@/models/Artists";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const createArtistSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    businessName: z.string().optional(),
    specialization: z.array(z.string()).default([]),
    DOB: z.string(),
    AboutHimself: z.string().min(1, "About Himself is required"),
    contact: z.object({
      value: z.string().regex(/^[789]\d{9}$/, "Invalid phone number"),
      isVerified: z.boolean().default(false),
    }),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    aadhar: z.string().regex(/^\d{12}$/, "Invalid Aadhar number"), // Aadhar number is a 12-digit number
  });

export async function POST(req){
    try{
    const data = await req.json();
    //zod schema validation
   
    const result = createArtistSchema.safeParse(data);
    //status code for error
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }
    console.log(result)
    if (data.DOB) {
      data.DOB = new Date(data.DOB);
    }    
    const {
        name,
        email,
        password,
        businessName,
        specialization,
        DOB,
        AboutHimself,
        contact,
        address,
        city,
        state,
        pincode,
        aadhar
    }=result.data;

    //connect to database
    await dbConnect();
    const userExists = await Artists.findOne({ "contact.value": contact.value });
    if (userExists){
        return NextResponse.JSON(
            {error:"User already exists"},
            {status:400}
        );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newArtist = new Artists({
        name,
        email,
        password:hashedPassword,
        businessName,
        specialization,
        DOB,
        AboutHimself,
        contact,
        address,
        city,
        state,
        pincode,
        aadhar
    });
    //save new artist to database
    await newArtist.save();
    return NextResponse.json(
        { message: "Artisan account added succesfully"},
        { status: 201 }
      );
    } 
    catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
    }
}