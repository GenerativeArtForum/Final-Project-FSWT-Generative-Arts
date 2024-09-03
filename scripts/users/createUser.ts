import { createUserAction } from "@/actions/users";

const args = process.argv.slice(2);

if (args.length != 3) {
  console.log("Usage: bun createUser.ts <clerk_id>");
  process.exit(1);
}

const [clerk_id, email, username] = args;

async function main() {
  try {
    const user = await createUserAction(clerk_id, email, username);
    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    process.exit(0);
  }
}

main();
