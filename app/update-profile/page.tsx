// # User Profile
import { getServerSession } from "next-auth";
import ProfileForm from "@/components/ProfileForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import User from "@/models/User";
import { dbConnect } from "@/utils/dbConnects";
import { UserProps } from "@/types/global";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return <p>Please log in to view your profile.</p>;
  }

  await dbConnect(); // Connect to MongoDB
  const user = await User.findOne({ email: session.user.email }) as UserProps | null;

  if (!user) {
    return <p>Error fetching profile.</p>;
  }
  return (
    <div>
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
