import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get favourites
    const { data: favourites, error: favouritesError } =
      await supabase
        .from("favourites")
        .select("id, user_id, property_id, created_at")
        .order("created_at", { ascending: false });

    if (favouritesError) {
      console.error(
        "Favourites fetch error:",
        favouritesError
      );

      return NextResponse.json(
        {
          error: favouritesError.message,
        },
        { status: 500 }
      );
    }

    if (!favourites || favourites.length === 0) {
      return NextResponse.json({
        favourites: [],
        total: 0,
      });
    }

    // Get unique user IDs
    const userIds = [
      ...new Set(
        favourites
          .map((item) => item.user_id)
          .filter(Boolean)
      ),
    ];

    // Get unique property IDs
    const propertyIds = [
      ...new Set(
        favourites
          .map((item) => item.property_id)
          .filter(Boolean)
      ),
    ];

    // Get profiles
    const { data: profiles, error: profilesError } =
      await supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("id", userIds);

    if (profilesError) {
      console.error(
        "Profiles fetch error:",
        profilesError
      );

      return NextResponse.json(
        {
          error: profilesError.message,
        },
        { status: 500 }
      );
    }

    // Get properties
    const { data: properties, error: propertiesError } =
      await supabase
        .from("properties")
        .select(
          "id, title, location, price, slug"
        )
        .in("id", propertyIds);

    if (propertiesError) {
      console.error(
        "Properties fetch error:",
        propertiesError
      );

      return NextResponse.json(
        {
          error: propertiesError.message,
        },
        { status: 500 }
      );
    }

    const profileMap = new Map(
      (profiles ?? []).map((profile) => [
        profile.id,
        profile,
      ])
    );

    const propertyMap = new Map(
      (properties ?? []).map((property) => [
        String(property.id),
        property,
      ])
    );

    const result = favourites.map((favourite) => {
      const profile = profileMap.get(
        favourite.user_id
      );

      const property = propertyMap.get(
        String(favourite.property_id)
      );

      return {
        id: favourite.id,

        userId: favourite.user_id,

        userName:
          profile?.full_name || "Unknown User",

        userEmail:
          profile?.email || "",

        propertyId: favourite.property_id,

        property:
          property?.title || "Unknown Property",

        location:
          property?.location || "",

        price:
          property?.price || "",

        slug:
          property?.slug || "",

        savedAt:
          favourite.created_at,
      };
    });

    return NextResponse.json({
      favourites: result,
      total: result.length,
    });
  } catch (error) {
    console.error(
      "Admin favourites API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load favourites",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const body = await request.json();

    const id = body?.id;

    if (!id) {
      return NextResponse.json(
        {
          error: "Favourite ID is required",
        },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Favourite delete error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Favourite DELETE API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to remove favourite",
      },
      { status: 500 }
    );
  }
}