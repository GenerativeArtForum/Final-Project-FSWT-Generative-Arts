import { NextResponse } from "next/server";
import {
  getVotesAction,
  getVoteAction,
  createVoteAction,
  updateVoteAction,
  deleteVoteAction,
} from "@/actions/votes";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const vote = await getVoteAction(id);
      if (vote) {
        return NextResponse.json(vote, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Vote not found" },
          { status: 404 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching vote", error },
        { status: 500 }
      );
    }
  } else {
    try {
      const votes = await getVotesAction();
      return NextResponse.json(votes, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Error fetching votes", error },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  try {
    const { responseId, userId, value } = await req.json();
    const newVote = await createVoteAction(responseId, userId, value);
    return NextResponse.json(newVote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating vote", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Vote ID is required" },
      { status: 400 }
    );
  }

  try {
    const { value } = await req.json();
    const updatedVote = await updateVoteAction(id, value);
    return NextResponse.json(updatedVote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating vote", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Vote ID is required" },
      { status: 400 }
    );
  }

  try {
    await deleteVoteAction(id);
    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting vote", error },
      { status: 500 }
    );
  }
}
