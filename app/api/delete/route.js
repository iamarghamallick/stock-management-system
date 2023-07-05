import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    let body = await request.json();
    console.log(body)
    const uri = process.env.URI;

    const client = new MongoClient(uri);

    try {
        const database = client.db("stock");
        const inventory = database.collection("inventory");

        const result = await inventory.deleteOne({ slug: body.slug });
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
        return NextResponse.json({ result, ok: true });
    } finally {
        await client.close();
    }
}