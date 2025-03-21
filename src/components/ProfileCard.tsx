import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Profile } from "../types/profile";

const ProfileCard: React.FC<Profile> = ({
  client_id,
  client_name,
  client_profile_url,
  client_city,
  client_mobile,
}) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-60 object-cover"
        src={client_profile_url}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{client_name}</div>

        <button
          onClick={() =>
            navigate(`/profile`, {
              state: {
                client_id,
                client_name,
                client_profile_url,
                client_city,
                client_mobile,
              },
            })
          }
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
        >
          <span>View Profile</span>
          <BsArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
