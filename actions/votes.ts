import {
  getVotes,
  getVote,
  createVote,
  updateVote,
  deleteVote,
} from "@/db/votes";

export async function getVotesAction() {
  return await getVotes();
}

export async function getVoteAction(id: string) {
  return await getVote(id);
}

export async function createVoteAction(
  responseId: string,
  userId: string,
  value: "UP" | "DOWN"
) {
  return await createVote(responseId, userId, value);
}

export async function updateVoteAction(id: string, value: "UP" | "DOWN") {
  return await updateVote(id, value);
}

export async function deleteVoteAction(id: string) {
  return await deleteVote(id);
}
