import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
            redirectTo: "http://localhost:3000/",
            // redirecting back to anything other than homepage will get users stuck in an auth loop because middleware at root
            // will call utils/supabase/middleware.ts which will send users back to /login. Thus creating a loop.
        },
    });

    if (error) {
        return NextResponse.redirect("/auth/error"); // optional
    }

    return NextResponse.redirect(data.url); // Send user to Google
}
