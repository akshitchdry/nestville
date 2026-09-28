import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type FavouriteBody = {
  slug?: unknown;
  propertyId?: unknown;
};

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { data: favourites, error: favouriteError } = await supabase
      .from("favourites")
      .select("property_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (favouriteError) {
      console.error("Get favourites error:", favouriteError);

      return NextResponse.json(
        { error: favouriteError.message },
        { status: 500 },
      );
    }

    const propertyIds = (favourites ?? [])
      .map((item) => Number(item.property_id))
      .filter((id) => Number.isFinite(id));

    if (propertyIds.length === 0) {
      return NextResponse.json({
        favourites: [],
        properties: [],
      });
    }

    const { data: properties, error: propertiesError } = await supabase
      .from("properties")
      .select("*")
      .in("id", propertyIds);

    if (propertiesError) {
      console.error("Favourite properties error:", propertiesError);

      return NextResponse.json(
        { error: propertiesError.message },
        { status: 500 },
      );
    }

    const orderedProperties = propertyIds
      .map((id) =>
        (properties ?? []).find(
          (property) => Number(property.id) === id,
        ),
      )
      .filter(Boolean);

    return NextResponse.json({
      favourites,
      properties: orderedProperties,
    });
  } catch (error) {
    console.error("Favourites GET error:", error);

    return NextResponse.json(
      { error: "Failed to load favourites" },
      { status: 500 },
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
        { status: 401 },
      );
    }

    const body = (await request.json()) as FavouriteBody;

    let propertyId: number | null = null;

    if (
      typeof body.propertyId === "number" ||
      typeof body.propertyId === "string"
    ) {
      const parsed = Number(body.propertyId);

      if (Number.isFinite(parsed) && parsed > 0) {
        propertyId = parsed;
      }
    }

    if (!propertyId && typeof body.slug === "string") {
      const slug = body.slug.trim();

      if (!slug) {
        return NextResponse.json(
          { error: "Property slug is required" },
          { status: 400 },
        );
      }

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (propertyError) {
        console.error("Property lookup error:", propertyError);

        return NextResponse.json(
          { error: propertyError.message },
          { status: 500 },
        );
      }

      if (!property) {
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 },
        );
      }

      propertyId = Number(property.id);
    }

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID or slug is required" },
        { status: 400 },
      );
    }

    const { data: existing, error: existingError } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .maybeSingle();

    if (existingError) {
      console.error("Favourite lookup error:", existingError);

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
        console.error("Remove favourite error:", deleteError);

        return NextResponse.json(
          { error: deleteError.message },
          { status: 500 },
        );
      }

      return NextResponse.json({
        favourite: false,
        propertyId,
      });
    }

    const { error: insertError } = await supabase
      .from("favourites")
      .insert({
        user_id: user.id,
        property_id: propertyId,
      });

    if (insertError) {
      console.error("Add favourite error:", insertError);

      return NextResponse.json(
        { error: insertError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      favourite: true,
      propertyId,
    });
  } catch (error) {
    console.error("Favourites POST error:", error);

    return NextResponse.json(
      { error: "Failed to update favourite" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = (await request.json().catch(() => ({}))) as FavouriteBody;

    if (
      body.propertyId !== undefined ||
      typeof body.slug === "string"
    ) {
      let propertyId: number | null = null;

      if (
        typeof body.propertyId === "number" ||
        typeof body.propertyId === "string"
      ) {
        const parsed = Number(body.propertyId);

        if (Number.isFinite(parsed) && parsed > 0) {
          propertyId = parsed;
        }
      }

      if (!propertyId && typeof body.slug === "string") {
        const { data: property } = await supabase
          .from("properties")
          .select("id")
          .eq("slug", body.slug.trim())
          .maybeSingle();

        if (property) {
          propertyId = Number(property.id);
        }
      }

      if (!propertyId) {
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 },
        );
      }

      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
      });
    }

    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Favourites DELETE error:", error);

    return NextResponse.json(
      { error: "Failed to clear favourites" },
      { status: 500 },
    );
  }
}