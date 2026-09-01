import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Get all registered users
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.admin.listUsers();

    if (authError) {
      console.error("Auth users error:", authError);

      return NextResponse.json(
        { error: authError.message },
        { status: 500 },
      );
    }

    const authUsers = authData?.users ?? [];

    if (authUsers.length === 0) {
      return NextResponse.json({
        users: [],
      });
    }

    // Get profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select(
        "id, full_name, email, phone, status, created_at",
      );

    if (profilesError) {
      console.error("Profiles error:", profilesError);
    }

    // Get favourites
    const { data: favourites, error: favouritesError } = await supabase
      .from("favourites")
      .select("user_id");

    if (favouritesError) {
      console.error("Favourites error:", favouritesError);
    }

    // Get enquiries
    const { data: enquiries, error: enquiriesError } = await supabase
      .from("enquiries")
      .select("user_id");

    if (enquiriesError) {
      console.error("Enquiries error:", enquiriesError);
    }

    // Create lookup maps
    const profileMap = new Map(
      (profiles ?? []).map((profile) => [
        profile.id,
        profile,
      ]),
    );

    const favouriteCountMap = new Map<string, number>();

    for (const favourite of favourites ?? []) {
      if (!favourite.user_id) continue;

      const current =
        favouriteCountMap.get(favourite.user_id) ?? 0;

      favouriteCountMap.set(
        favourite.user_id,
        current + 1,
      );
    }

    const enquiryCountMap = new Map<string, number>();

    for (const enquiry of enquiries ?? []) {
      if (!enquiry.user_id) continue;

      const current =
        enquiryCountMap.get(enquiry.user_id) ?? 0;

      enquiryCountMap.set(
        enquiry.user_id,
        current + 1,
      );
    }

    // Final users
    const users = authUsers.map((authUser) => {
      const profile = profileMap.get(authUser.id);

      return {
        id: authUser.id,

        name:
          profile?.full_name ||
          authUser.user_metadata?.full_name ||
          authUser.user_metadata?.name ||
          "Unnamed User",

        email:
          profile?.email ||
          authUser.email ||
          "",

        phone:
          profile?.phone ||
          authUser.phone ||
          "",

        created_at:
          profile?.created_at ||
          authUser.created_at,

        status:
          profile?.status ||
          (authUser.email_confirmed_at
            ? "active"
            : "inactive"),

        favourites_count:
          favouriteCountMap.get(authUser.id) ?? 0,

        enquiries_count:
          enquiryCountMap.get(authUser.id) ?? 0,
      };
    });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("Admin users API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load users",
      },
      {
        status: 500,
      },
    );
  }
}