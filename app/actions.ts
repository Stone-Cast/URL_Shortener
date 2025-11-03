"use server";
import { createHash } from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function findLongUrl(short_url: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("urls")
        .select("long_url")
        .eq("short_url", short_url)
        .single();

    return { data, error };
}

export async function createItem(formData: FormData) {
    const longUrl = formData.get("longUrl") as string;
    const userCode = formData.get("userCode") as string | null;
    const supabase = await createClient();

    const shortCodeCandidate =
        userCode ||
        createHash("md5").update(longUrl).digest("base64url").slice(0, 5);

    const { data, error } = await supabase
        .from("urls")
        .select("long_url, short_url")
        .or(`long_url.eq.${longUrl},short_url.eq.${shortCodeCandidate}`)
        .limit(1)
        .single();

    if (data) {
        if (data.long_url === longUrl) {
            // Same long URL already exists then return existing short_url
            return { longUrlExisted: true, shortUrl: data.short_url };
        } else {
            // Short code collision
            return { shortCodeExisted: true };
        }
    }

    if (!data) {
        const { error } = await supabase
            .from("urls")
            .insert({ long_url: longUrl, short_url: "lol" });
        return { shortUrl: shortCodeCandidate };
    }

    // revalidatePath("/"); // Update UI with fresh data
    // redirect("/"); // Navigate to a different page
}
