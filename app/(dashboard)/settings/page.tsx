//  # User Profile
// "use server"

import MainMenu from "@/components/MainMenu";
// import JobApplicationsChart from "@/components/JobApplicationsChart";
import { getSession } from "@/hooks/useSession";
// import Messages from "@/components/Messages";
// import Notifications from "@/components/Notifications";

const ProfilePage = async () => {

  const sessionData = await getSession();

  if (!sessionData) {
    return <p>Please log in to view your profile.</p>;
  }

  const { user } = sessionData;

  if (!user) {
    return <p>Error fetching profile.</p>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">

      <MainMenu user={user} page='Setting'>        

        <section>


        </section>
      </MainMenu>
    </div>
  );
};

export default ProfilePage;
