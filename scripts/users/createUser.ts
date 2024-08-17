import { createUserAction } from "@/actions/users";

const args = process.argv.slice(2);

if (args.length != 1) {
  console.log("Usage: bun createUser.ts <clerk_id>");
  process.exit(1);
}

const [clerk_id] = args;

async function main() {
  try {
    const user = await createUserAction(clerk_id);
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    process.exit(0);
  }
}

main();
