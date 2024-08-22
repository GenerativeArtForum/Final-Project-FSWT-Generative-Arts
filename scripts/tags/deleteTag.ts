import { actionDeleteTag } from "@/actions/tags";

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: bun deleteTag.ts <id>");
  process.exit(1);
}

const [id] = args;

async function main() {
  try {
    const tag = await actionDeleteTag(id);
    console.log("Tag deleted:", tag);
  } catch (error) {
    console.error("Error deleting tag:", error);
  } finally {
    process.exit(0);
  }
}

main();
