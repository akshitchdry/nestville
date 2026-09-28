import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const propertyTitle = clean(body.propertyTitle);
    const location = clean(body.location);
    const propertyType = clean(body.propertyType);
    const price = clean(body.price);
    const bedrooms = clean(body.bedrooms);
    const area = clean(body.area);
    const description = clean(body.description);

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          error: "Name, email and phone are required.",
        },
        { status: 400 },
      );
    }

    if (!propertyTitle || !location) {
      return NextResponse.json(
        {
          error: "Property title and location are required.",
        },
        { status: 400 },
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          error: "Property description is required.",
        },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const listingMessage = [
      "[PROPERTY LISTING]",
      "",
      `Property Type: ${propertyType || "Not specified"}`,
      `Expected Price: ${price || "Not specified"}`,
      `Bedrooms: ${bedrooms || "Not specified"}`,
      `Area: ${area || "Not specified"}`,
      "",
      "Property Description:",
      description,
    ].join("\n");

    const { error } = await supabase
      .from("enquiries")
      .insert({
        name,
        email,
        phone,
        property: `Property Listing — ${propertyTitle}`,
        location,
        status: "new",
        message: listingMessage,
        ...(user?.id ? { user_id: user.id } : {}),
      });

    if (error) {
      console.error(
        "Property listing insert error:",
        error,
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Property listing submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Property listing API error:",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to submit property listing.",
      },
      { status: 500 },
    );
  }
}