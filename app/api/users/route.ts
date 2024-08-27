import { NextResponse } from "next/server";
import {
  getUsersAction,
  getUserAction,
  getUserByClerkIdAction,
  createUserAction,
} from "@/actions/users";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const clerkId = searchParams.get("clerk_id");

  if (id) {
    try {
      const user = await getUserAction(id);
      if (user) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching user", error },
        { status: 500 }
      );
    }
  } else if (clerkId) {
    try {
      const user = await getUserByClerkIdAction(clerkId);
      if (user) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching user by Clerk ID", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const users = await getUsersAction();
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching users", error },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const { clerk_id } = await req.json();
    const newUser = await createUserAction(clerk_id);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
