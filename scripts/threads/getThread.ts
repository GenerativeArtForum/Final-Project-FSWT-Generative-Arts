import { actionGetThread } from "@/actions/threads";

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: bun getThread.ts <id>");
  process.exit(1);
}

const [id] = args;

async function main() {
  try {
    const thread = await actionGetThread(id);
    if (thread) {
      console.log("Thread found:", thread);
    } else {
      console.log("Thread not found");
    }
  } catch (error) {
    console.error("Error fetching thread:", error);
  } finally {
    process.exit(0);
  }
}

main();
