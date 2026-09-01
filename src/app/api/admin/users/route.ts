import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Check environment variables
    if (!supabaseUrl) {
      console.error("Missing NEXT_PUBLIC_SUPABASE_URL");

      return NextResponse.json(
        {
          error: "Missing NEXT_PUBLIC_SUPABASE_URL",
        },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      console.error("Missing SUPABASE_SERVICE_ROLE_KEY");

      return NextResponse.json(
        {
          error: "Missing SUPABASE_SERVICE_ROLE_KEY",
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------
    // 1. GET AUTH USERS
    // --------------------------------

    const {
      data: authData,
      error: authError,
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (authError) {
      console.error("Supabase Auth Users Error:", authError);

      return NextResponse.json(
        {
          error: authError.message,
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // 2. GET PROFILES
    // --------------------------------

    const {
      data: profiles,
      error: profilesError,
    } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name, phone");

    if (profilesError) {
      console.error("Supabase Profiles Error:", profilesError);

      return NextResponse.json(
        {
          error: profilesError.message,
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // 3. CREATE PROFILE MAP
    // --------------------------------

    const profileMap = new Map<
      string,
      {
        id: string;
        full_name: string | null;
        phone: string | null;
      }
    >();

    for (const profile of profiles ?? []) {
      profileMap.set(profile.id, profile);
    }

    // --------------------------------
    // 4. FORMAT USERS
    // --------------------------------

    const users = authData.users.map((user) => {
      const profile = profileMap.get(user.id);

      const name =
        profile?.full_name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Unknown User";

      const phone =
        profile?.phone ||
        user.phone ||
        "";

      return {
        id: user.id,

        name,

        email: user.email ?? "",

        phone,

        joined: user.created_at,

        lastSignIn: user.last_sign_in_at ?? null,

        status: user.banned_until
          ? "Inactive"
          : "Active",

        emailConfirmed: Boolean(
          user.email_confirmed_at
        ),

        favourites: 0,

        enquiries: 0,
      };
    });

    // --------------------------------
    // 5. RESPONSE
    // --------------------------------

    return NextResponse.json(
      {
        users,
        total: users.length,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("ADMIN USERS API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load users",
      },
      { status: 500 }
    );
  }
}