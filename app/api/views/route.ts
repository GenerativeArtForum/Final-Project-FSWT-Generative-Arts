import { NextResponse } from "next/server";
import {
  getViewsAction,
  getViewAction,
  createViewAction,
  deleteViewAction,
} from "@/actions/views";

// GET: Fetch all views or a specific view by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const view = await getViewAction(id);
      if (view) {
        return NextResponse.json(view, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "View not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching view", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const views = await getViewsAction();
      return NextResponse.json(views, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching views", error },
        { status: 500 }
      );
    }
  }
}

// POST: Create a new view
export async function POST(req: Request) {
  try {
    const { threadId } = await req.json();
    const newView = await createViewAction(threadId);
    return NextResponse.json(newView, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating view", error },
      { status: 500 }
    );
  }
}

// DELETE: Delete a view
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "View ID is required" },
      { status: 400 }
    );
  }

  try {
    await deleteViewAction(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting view", error },
      { status: 500 }
    );
  }
}
