import { getUserByClerkIdAction } from "@/actions/users";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.log("Usage: bun getUserByClerkId.ts <clerk_id>");
  process.exit(1);
}

const [clerk_id] = args;

async function main() {
  try {
    const user = await getUserByClerkIdAction(clerk_id);
    console.log("User:", user);
  } catch (error) {
    console.error("Error retrieving user:", error);
  } finally {
    process.exit(0);
  }
}

main();
