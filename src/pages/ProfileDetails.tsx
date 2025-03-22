import { useLocation } from "react-router";
import ViewProfileCard from "../components/ViewProfileCard";

const ProfileDetails = () => {
  const location = useLocation();
  console.log(location.state);

  return (
    <div>
      <ViewProfileCard {...location.state} />
    </div>
  );
};

export default ProfileDetails;
