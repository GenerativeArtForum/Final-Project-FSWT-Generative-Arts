import { actionUpdateThread } from "@/actions/threads";

const args = process.argv.slice(2);

if (args.length < 4) {
  console.log(
    "Usage: bun updateThread.ts <id> <title> <description> <userId> <tagIds>"
  );
  process.exit(1);
}

const [id, title, description, userId, ...tagIds] = args;

async function main() {
  try {
    const thread = await actionUpdateThread(
      id,
      title,
      description,
      userId,
      tagIds
    );
    console.log("Thread updated:", thread);
  } catch (error) {
    console.error("Error updating thread:", error);
  } finally {
    process.exit(0);
  }
}

main();
