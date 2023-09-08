import { connectDB } from "../../../utils/mongodbConnection";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
      return NextResponse.json({ message: "User already exist" }, { status: 403 });
  }

  try {
    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTOJS_SECRET!
    ).toString();

    // await User.create({ name, email, password: hashedPassword })

    const savedUser = new User({ name: name, email, password: hashedPassword })
    await savedUser.save()

    return NextResponse.json(
      { message: "Saved successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error occured" }, { status: 500 });
  }
}
