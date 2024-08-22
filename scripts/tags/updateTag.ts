import { actionUpdateTag } from "@/actions/tags";

const args = process.argv.slice(2);

if (args.length < 4) {
  console.log("Usage: bun updateTag.ts <id> <name>");
  process.exit(1);
}

const [id, name] = args;

async function main() {
  try {
    const tag = await actionUpdateTag(id, name);
    console.log("Tag updated:", tag);
  } catch (error) {
    console.error("Error updating tag:", error);
  } finally {
    process.exit(0);
  }
}

main();
