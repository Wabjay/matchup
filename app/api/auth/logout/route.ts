import { getSession } from "next-auth/react";

export default async function handler(req: any, res: { clearCookie: (arg0: string) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  const session = await getSession({ req });

  if (session) {
    // Clear the session and log the user out
    await res.clearCookie("next-auth.session-token");
    await res.clearCookie("next-auth.csrf-token");
    await res.clearCookie("next-auth.callback-url");
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
}