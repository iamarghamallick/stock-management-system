import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");
  const uri = process.env.URI;

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");

    const products = await inventory.aggregate([
      {
        $match: {
          $or: [{ slug: { $regex: query, $options: "i" } }],
        },
      },
    ]).toArray();

    // console.log(products)

    return NextResponse.json({ success: true, products });
  } finally {
    await client.close();
  }
}
