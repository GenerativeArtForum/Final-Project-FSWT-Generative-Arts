import { actionCreateThread } from "@/actions/threads";

const args = process.argv.slice(2);

if (args.length < 4) {
  console.log(
    "Usage: bun createThread.ts <title> <description> <userId> <tagIds>"
  );
  process.exit(1);
}

const [title, description, userId, ...tagIds] = args;

async function main() {
  try {
    const thread = await actionCreateThread(title, description, userId, tagIds);
    console.log("Thread created:", thread);
  } catch (error) {
    console.error("Error creating thread:", error);
  } finally {
    process.exit(0);
  }
}

main();
