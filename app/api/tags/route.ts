import {
  actionCreateTag,
  actionDeleteTag,
  actionGetTag,
  actionGetTags,
  actionUpdateTag,
} from "@/actions/tags";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const tag = await actionGetTag(id);
      if (tag) {
        return NextResponse.json(tag, { status: 200 });
      } else {
        return NextResponse.json({ message: "Tag not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching tag", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const tags = await actionGetTags();
      return NextResponse.json(tags, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching tags", error },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const newTag = await actionCreateTag(name);
    return NextResponse.json(newTag, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating tag", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Tag ID is required" },
      { status: 400 }
    );
  }

  try {
    const { name } = await req.json();
    const updatedTag = await actionUpdateTag(id, name);
    return NextResponse.json(updatedTag, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating tag", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Tag ID is required" },
      { status: 400 }
    );
  }

  try {
    await actionDeleteTag(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting tag", error },
      { status: 500 }
    );
  }
}
