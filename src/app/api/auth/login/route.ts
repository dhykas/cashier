import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const formData = await req.formData();

    return NextResponse.json({
        data: 'ini data',
        formData: Object.fromEntries(formData)
    });
}