import { createClient } from "@supabase/supabase-js";
import { createItem } from "./actions";
import { Database } from "./database.types";

export default async function Page() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.from("urls").select();
    console.log(data, error);
    return (
        <form action={createItem}>
            <label htmlFor="longUrl">Enter the URL you need shortened</label>
            <br />
            <input
                type="text"
                name="longUrl"
                id="longUrl"
                placeholder="Long Url"
                required
            />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}
