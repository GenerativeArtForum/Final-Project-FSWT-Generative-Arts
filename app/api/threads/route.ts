import { NextResponse } from "next/server";
import {
  actionGetThreads,
  actionGetThread,
  actionCreateThread,
  actionUpdateThread,
  actionDeleteThread,
} from "@/actions/threads";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const thread = await actionGetThread(id);
      if (thread) {
        return NextResponse.json(thread, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Thread not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching thread", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const threads = await actionGetThreads();
      return NextResponse.json(threads, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching threads", error },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const { title, description, userId, tagIds, status } = await req.json();
    const newThread = await actionCreateThread(
      title,
      description,
      userId,
      tagIds,
      status
    );
    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating thread", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Thread ID is required" },
      { status: 400 }
    );
  }

  try {
    const { title, description, userId, tagIds } = await req.json();
    const updatedThread = await actionUpdateThread(
      id,
      title,
      description,
      userId,
      tagIds
    );
    return NextResponse.json(updatedThread, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating thread", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Thread ID is required" },
      { status: 400 }
    );
  }

  try {
    await actionDeleteThread(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting thread", error },
      { status: 500 }
    );
  }
}
