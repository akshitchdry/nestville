import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          favourites: [],
          properties: [],
          authenticated: false,
        },
        { status: 401 },
      );
    }

    const {
      data: favouriteRows,
      error: favouritesError,
    } = await supabase
      .from("favourites")
      .select("property_id")
      .eq("user_id", user.id);

    if (favouritesError) {
      console.error(
        "Favourite fetch error:",
        favouritesError,
      );

      return NextResponse.json(
        { error: favouritesError.message },
        { status: 500 },
      );
    }

    const propertyIds = (favouriteRows ?? [])
      .map((item) => Number(item.property_id))
      .filter(
        (id) =>
          Number.isInteger(id) && id > 0,
      );

    if (propertyIds.length === 0) {
      return NextResponse.json({
        favourites: [],
        properties: [],
        authenticated: true,
      });
    }

    const {
      data: properties,
      error: propertiesError,
    } = await supabase
      .from("properties")
      .select("*")
      .in("id", propertyIds);

    if (propertiesError) {
      console.error(
        "Favourite properties error:",
        propertiesError,
      );

      return NextResponse.json(
        { error: propertiesError.message },
        { status: 500 },
      );
    }

    const result = properties ?? [];

    return NextResponse.json({
      favourites: result,
      properties: result,
      authenticated: true,
    });
  } catch (error) {
    console.error(
      "Favourite GET error:",
      error,
    );

    return NextResponse.json(
      {
        error: "Unable to load favourites.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Please sign in to save favourites.",
          authenticated: false,
        },
        { status: 401 },
      );
    }

    const body =
      await request.json().catch(() => null);

    const rawPropertyId =
      body?.propertyId;

    const propertyId =
      rawPropertyId !== undefined &&
      rawPropertyId !== null &&
      rawPropertyId !== ""
        ? Number(rawPropertyId)
        : null;

    const slug =
      typeof body?.slug === "string"
        ? body.slug.trim()
        : "";

    let resolvedPropertyId: number | null = propertyId;

    /*
     * If slug is supplied, resolve the
     * actual Supabase property ID.
     */
    if (slug) {
      const {
        data: property,
        error: propertyError,
      } = await supabase
        .from("properties")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (propertyError) {
        console.error(
          "Property resolve error:",
          propertyError,
        );

        return NextResponse.json(
          {
            error:
              propertyError.message,
          },
          { status: 500 },
        );
      }

      if (!property) {
        return NextResponse.json(
          {
            error:
              "Property not found.",
          },
          { status: 404 },
        );
      }

      resolvedPropertyId = Number(
        property.id,
      );
    }
     if (
  typeof resolvedPropertyId !== "number" ||
  !Number.isInteger(resolvedPropertyId) ||
  resolvedPropertyId <= 0
) {
  return NextResponse.json(
    {
      error: "Valid property ID or slug is required.",
    },
    { status: 400 },
  );
}
    
    /*
     * Check whether this property
     * is already saved.
     */
    const {
      data: existing,
      error: existingError,
    } = await supabase
      .from("favourites")
      .select("id")
      .eq("user_id", user.id)
      .eq(
        "property_id",
        resolvedPropertyId,
      )
      .maybeSingle();

    if (existingError) {
      console.error(
        "Existing favourite error:",
        existingError,
      );

      return NextResponse.json(
        {
          error:
            existingError.message,
        },
        { status: 500 },
      );
    }

    /*
     * Already favourite → remove it.
     */
    if (existing) {
      const {
        error: deleteError,
      } = await supabase
        .from("favourites")
        .delete()
        .eq("id", existing.id)
        .eq("user_id", user.id);

      if (deleteError) {
        console.error(
          "Favourite delete error:",
          deleteError,
        );

        return NextResponse.json(
          {
            error:
              deleteError.message,
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        favourite: false,
        propertyId:
          resolvedPropertyId,
      });
    }

    /*
     * Not favourite → add it.
     */
    const {
      error: insertError,
    } = await supabase
      .from("favourites")
      .insert({
        user_id: user.id,
        property_id:
          resolvedPropertyId,
      });

    if (insertError) {
      console.error(
        "Favourite insert error:",
        insertError,
      );

      return NextResponse.json(
        {
          error:
            insertError.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      favourite: true,
      propertyId:
        resolvedPropertyId,
    });
  } catch (error) {
    console.error(
      "Favourite POST error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to update favourite.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
) {
  try {
    const supabase =
      await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error:
            "Please sign in to manage favourites.",
          authenticated: false,
        },
        { status: 401 },
      );
    }

    /*
     * Body is optional.
     *
     * propertyId present:
     * remove one favourite.
     *
     * no propertyId:
     * clear all favourites.
     */
    const body =
      await request
        .json()
        .catch(() => null);

    const rawPropertyId =
      body?.propertyId;

    const hasPropertyId =
      rawPropertyId !== undefined &&
      rawPropertyId !== null &&
      rawPropertyId !== "";

    const propertyId =
      hasPropertyId
        ? Number(rawPropertyId)
        : null;

    if (
      propertyId !== null &&
      (!Number.isInteger(
        propertyId,
      ) ||
        propertyId <= 0)
    ) {
      return NextResponse.json(
        {
          error:
            "Valid property ID is required.",
        },
        { status: 400 },
      );
    }

    let query = supabase
      .from("favourites")
      .delete()
      .eq("user_id", user.id);

    if (propertyId !== null) {
      query = query.eq(
        "property_id",
        propertyId,
      );
    }

    const { error } =
      await query;

    if (error) {
      console.error(
        "Favourite DELETE error:",
        error,
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      cleared:
        propertyId === null,
      propertyId,
    });
  } catch (error) {
    console.error(
      "Favourite DELETE error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to remove favourite.",
      },
      { status: 500 },
    );
  }
}