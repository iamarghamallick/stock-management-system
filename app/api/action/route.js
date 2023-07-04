import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
    let { action, slug, initialQuantity } = await request.json();
    const uri = "mongodb+srv://arghamallick:Mp3ZwnY89Y6bhPg9@cluster0.ubx86tf.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    let newQuantity = action === "plus" ? parseInt(initialQuantity) + 1 : parseInt(initialQuantity) - 1;

    try {
        const database = client.db("stock");
        const inventory = database.collection("inventory");
        const filter = { slug: slug };
        const updateDoc = {
            $set: {
                quantity: newQuantity
            },
        };
        const result = await inventory.updateOne(filter, updateDoc, {});
        return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` });
    } finally {
        await client.close();
    }
}
