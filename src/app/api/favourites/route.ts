import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { favourites: [], authenticated: false },
      { status: 401 },
    );
  }

  const { data: favouriteRows, error: favouritesError } = await supabase
    .from("favourites")
    .select("property_id")
    .eq("user_id", user.id);

  if (favouritesError) {
    return NextResponse.json(
      { error: favouritesError.message },
      { status: 500 },
    );
  }

  const propertyIds = (favouriteRows ?? []).map(
    (item) => item.property_id,
  );

  if (propertyIds.length === 0) {
    return NextResponse.json({
      favourites: [],
      authenticated: true,
    });
  }

  const { data: properties, error: propertiesError } = await supabase
    .from("properties")
    .select("*")
    .in("id", propertyIds);

  if (propertiesError) {
    return NextResponse.json(
      { error: propertiesError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    favourites: properties ?? [],
    authenticated: true,
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      {
        error: "Please sign in to save favourites.",
        authenticated: false,
      },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);

  const propertyId =
    typeof body?.propertyId === "number"
      ? body.propertyId
      : Number(body?.propertyId);

  const slug =
    typeof body?.slug === "string"
      ? body.slug.trim()
      : "";

  let resolvedPropertyId = propertyId;

  // If slug is provided, always resolve the real Supabase property ID.
  if (slug) {
    const { data: property, error: propertyError } = await supabase
      .from("properties")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (propertyError) {
      return NextResponse.json(
        { error: propertyError.message },
        { status: 500 },
      );
    }

    if (!property) {
      return NextResponse.json(
        { error: "Property not found." },
        { status: 404 },
      );
    }

    resolvedPropertyId = property.id;
  }

  if (!Number.isInteger(resolvedPropertyId) || resolvedPropertyId <= 0) {
    return NextResponse.json(
      { error: "Valid property ID or slug is required." },
      { status: 400 },
    );
  }

  const { data: existing, error: existingError } = await supabase
    .from("favourites")
    .select("id")
    .eq("user_id", user.id)
    .eq("property_id", resolvedPropertyId)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json(
      { error: existingError.message },
      { status: 500 },
    );
  }

  if (existing) {
    const { error: deleteError } = await supabase
      .from("favourites")
      .delete()
      .eq("id", existing.id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json(
        { error: deleteError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      favourite: false,
      propertyId: resolvedPropertyId,
    });
  }

  const { error: insertError } = await supabase
    .from("favourites")
    .insert({
      user_id: user.id,
      property_id: resolvedPropertyId,
    });

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({
    favourite: true,
    propertyId: resolvedPropertyId,
  });
}