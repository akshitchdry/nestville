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
    const property = clean(body.property);
    const location = clean(body.location);
    const message = clean(body.message);
    const preferredDate = clean(body.preferredDate);
    const propertyType = clean(body.propertyType);

    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          error: "Name, email and phone are required.",
        },
        {
          status: 400,
        },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const finalMessage = [
      message,
      preferredDate
        ? `Preferred date: ${preferredDate}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase
      .from("enquiries")
      .insert({
        name,
        email,
        phone,
        property:
          property ||
          propertyType ||
          "General Enquiry",
        location: location || null,
        status: "new",
        message: finalMessage || null,
        ...(user?.id
          ? {
              user_id: user.id,
            }
          : {}),
      });

    if (error) {
      console.error("Enquiry insert error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        error: "Unable to submit enquiry.",
      },
      {
        status: 500,
      },
    );
  }
}