"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function createItem(formData: FormData) {
    const longUrl = formData.get("longUrl") as string;
    console.log(longUrl);
    const supabase = await createClient();
    const { data, error } = await supabase.from("urls").select();
    // .select("short_url").eq("long_url", longUrl).single();

    console.log(data, error);

    // revalidatePath("/"); // Update UI with fresh data
    // redirect("/"); // Navigate to a different page
}
