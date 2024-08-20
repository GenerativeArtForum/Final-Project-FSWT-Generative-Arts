import { getUsersAction } from "@/actions/users";

async function main() {
  try {
    const users = await getUsersAction();
    console.log("Users:", users);
  } catch (error) {
    console.error("Error retrieving users:", error);
  } finally {
    process.exit(0);
  }
}

main();
