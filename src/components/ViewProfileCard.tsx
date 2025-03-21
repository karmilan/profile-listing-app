import { BiMap, BiPhone } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Profile } from "../types/profile";

const ViewProfileCard: React.FC<Profile> = ({
  client_id,
  client_name,
  client_profile_url,
  client_city,
  client_mobile,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center text-blue-600 mb-8 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <BsArrowLeft className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" />
        <span>Back to Profiles</span>
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 rounded overflow-hidden shadow-lg mx-7 md:mx-20 my-auto">
        {/* ---------------------profile Pic---------------------- */}
        <div>
          {" "}
          <img
            className="w-full h-full object-cover"
            src={client_profile_url}
            alt="Sunset in the mountains"
          />
        </div>

        {/* ---------------------profile details---------------------- */}
        <div className="px-6 py-4">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {client_name}
            </h1>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
                <BiPhone className="w-6 h-6 mr-4" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Number</p>
                  <p className="text-lg">{client_mobile}</p>
                </div>
              </div>
            </div>
            {/* ---------------------location---------------------- */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center text-gray-700 hover:text-blue-600 transition-colors p-4 rounded-xl bg-white/50 backdrop-blur-sm shadow-sm">
                <BiMap className="w-6 h-6 mr-4" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-lg">{client_city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfileCard;
