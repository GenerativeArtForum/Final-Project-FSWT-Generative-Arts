import { actionCreateTag } from "@/actions/tags";

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage: bun createTag.ts <name>");
  process.exit(1);
}

const [name] = args;

async function main() {
  try {
    const tag = await actionCreateTag(name);
    console.log("Tag created:", tag);
  } catch (error) {
    console.error("Error creating tag:", error);
  } finally {
    process.exit(0);
  }
}

main();
