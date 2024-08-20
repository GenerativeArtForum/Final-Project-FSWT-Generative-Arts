import { actionDeleteThread } from "@/actions/threads";

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: bun deleteThread.ts <id>");
  process.exit(1);
}

const [id] = args;

async function main() {
  try {
    const thread = await actionDeleteThread(id);
    console.log("Thread deleted:", thread);
  } catch (error) {
    console.error("Error deleting thread:", error);
  } finally {
    process.exit(0);
  }
}

main();
