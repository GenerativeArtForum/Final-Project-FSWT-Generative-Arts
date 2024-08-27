import { NextResponse } from "next/server";
import {
  getResponsesAction,
  getResponseAction,
  createResponseAction,
  updateResponseAction,
  deleteResponseAction,
} from "@/actions/responses";

// GET: Fetch all responses or a specific response by ID
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const response = await getResponseAction(id);
      if (response) {
        return NextResponse.json(response, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Response not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching response", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const responses = await getResponsesAction();
      return NextResponse.json(responses, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching responses", error },
        { status: 500 }
      );
    }
  }
}

// POST: Create a new response
export async function POST(req: Request) {
  try {
    const { text, threadId, userId } = await req.json();
    const newResponse = await createResponseAction(text, threadId, userId);
    return NextResponse.json(newResponse, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating response", error },
      { status: 500 }
    );
  }
}

// PUT: Update an existing response
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Response ID is required" },
      { status: 400 }
    );
  }

  try {
    const { text } = await req.json();
    const updatedResponse = await updateResponseAction(id, text);
    return NextResponse.json(updatedResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating response", error },
      { status: 500 }
    );
  }
}

// DELETE: Delete a response
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Response ID is required" },
      { status: 400 }
    );
  }

  try {
    await deleteResponseAction(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting response", error },
      { status: 500 }
    );
  }
}
