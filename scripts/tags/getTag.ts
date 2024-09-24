import { actionGetTag } from "@/actions/tags";

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: bun getTag.ts <id>");
  process.exit(1);
}

const [id] = args;

async function main() {
  try {
    const tag = await actionGetTag(id);
    if (tag) {
      console.log("Tag found:", tag);
    } else {
      console.log("Tag not found");
    }
  } catch (error) {
    console.error("Error fetching tag:", error);
  } finally {
    process.exit(0);
  }
}

main();
