import { NextRequest, NextResponse } from "next/server";
import { findLongUrl } from "../actions";

export async function GET(
    req: NextRequest,
    { params }: { params: { url: string } }
) {
    const { url } = await params;
    const { data, error } = await findLongUrl(url);
    if (data) {
        return NextResponse.redirect(data?.long_url);
    }
    return NextResponse.json(
        "This URL isn't listed yet. Try creating one first."
    );
}
