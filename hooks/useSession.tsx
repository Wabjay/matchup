import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { UserProps } from "@/types/global";

/**
 * Retrieves the authenticated user's session and user details from the database.
 * @returns The session and user object if authenticated, otherwise null.
 */
export const getSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) return null;

  // Fetch user from MongoDB
  const user = (await User.findOne({ email: session.user.email }).lean()) as UserProps | null;

  return { session, user };
};

/**
 * A utility function to check if the user is authenticated.
 * @returns The session and user object if authenticated, otherwise throws an error.
 */
export const requireSession = async () => {
  const sessionData = await getSession();

  if (!sessionData || !sessionData.user) {
    throw new Error("Unauthorized: Please log in to access this page.");
  }

  return sessionData;
};
