import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export async function GET() {
  try {
    const supabase = getAdminClient();

    const {
      data: {
        users,
      },
      error: authError,
    } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (authError) {
      console.error("Admin users error:", authError.message);

      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    /*
      Yaha currently first/admin user ko settings
      ke liye use kar rahe hain.

      Baad me proper admin-role check laga sakte hain.
    */

    const adminUser = users?.[0];

    if (!adminUser) {
      return NextResponse.json(
        { error: "No admin user found" },
        { status: 404 }
      );
    }

    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select(
          "id, full_name, phone, email, status"
        )
        .eq("id", adminUser.id)
        .maybeSingle();

    if (profileError) {
      console.error(
        "Profile error:",
        profileError.message
      );

      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      admin: {
        id: adminUser.id,
        name:
          profile?.full_name ||
          adminUser.user_metadata?.full_name ||
          adminUser.user_metadata?.name ||
          "NestVille Admin",

        email:
          profile?.email ||
          adminUser.email ||
          "",

        phone:
          profile?.phone ||
          adminUser.phone ||
          "",

        status:
          profile?.status ||
          "Active",
      },
    });
  } catch (error) {
    console.error("Settings GET error:", error);

    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const {
      adminId,
      adminName,
      adminEmail,
      contactPhone,
    } = body;

    if (!adminId) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    /*
      Update profile
    */

    const { error: profileError } =
      await supabase
        .from("profiles")
        .update({
          full_name: adminName,
          phone: contactPhone,
          email: adminEmail,
        })
        .eq("id", adminId);

    if (profileError) {
      console.error(
        "Profile update error:",
        profileError.message
      );

      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    /*
      Update Supabase Auth email / metadata
    */

    const { error: authError } =
      await supabase.auth.admin.updateUserById(
        adminId,
        {
          email: adminEmail,
          user_metadata: {
            full_name: adminName,
          },
        }
      );

    if (authError) {
      console.error(
        "Auth update error:",
        authError.message
      );

      return NextResponse.json(
        { error: authError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Settings PATCH error:", error);

    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}