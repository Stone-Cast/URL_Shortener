import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
    const supbase = await createClient();
    const { data, error } = await supbase.auth.getUser();

    if (error || !data?.user) {
        return (
            <>
                <button>
                    <a href="/login">Continue With Google</a>
                </button>
            </>
        );
    } else {
        return (
            <>
                <div>Hello {data.user.email}</div>
            </>
        );
    }
}
