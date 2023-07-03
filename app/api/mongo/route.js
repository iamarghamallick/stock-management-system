import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://arghamallick:Mp3ZwnY89Y6bhPg9@cluster0.ubx86tf.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    const database = client.db("stock");
    const products = database.collection("inventory");
    
    const query = {  };
    const product = await products.find(query).toArray();
    console.log(product);
    return NextResponse.json({ "argha": 2023, product });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
