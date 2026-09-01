import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("favourites")
      .select("property_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Get favourites error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      favourites: data ?? [],
    });
  } catch (error) {
    console.error("Favourites GET error:", error);

    return NextResponse.json(
      { error: "Failed to load favourites" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const propertyId = Number(body.propertyId);

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        favourite: false,
      });
    }

    const { error } = await supabase
      .from("favourites")
      .insert({
        user_id: user.id,
        property_id: propertyId,
      });

    if (error) {
      console.error("Add favourite error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      favourite: true,
    });
  } catch (error) {
    console.error("Favourites POST error:", error);

    return NextResponse.json(
      { error: "Failed to update favourite" },
      { status: 500 }
    );
  }
}