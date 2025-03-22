import { useLocation } from "react-router";
import ViewProfileCard from "../components/ViewProfileCard";

const ProfileDetails = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <div>
      {/* {client_id} {client_name} */}
      <ViewProfileCard {...location.state} />
    </div>
  );
};

export default ProfileDetails;
