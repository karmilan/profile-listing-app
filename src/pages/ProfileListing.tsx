import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuUsersRound } from "react-icons/lu";
import ProfileCard from "../components/ProfileCard";
import { Profile } from "../types/profile";

const ProfileListing = () => {
  const [profileData, setProfileData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const clearSearchBar = () => {
    setSearchInput("");
  };

  const filteredProfiles = profileData?.filter(
    (profile) =>
      profile.client_name &&
      profile.client_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL);
        console.log("res", res);
        setProfileData(res.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="flex items-center flex-col mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-xl w-20 h-20 items-center justify-center flex">
          <LuUsersRound className="text-white text-5xl" />
        </div>
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          All Profiles
        </div>
      </div>
      {/* ------------search input------------ */}
      <div className="mb-8 flex justify-center items-center relative">
        <input
          type="text"
          placeholder="Search profiles..."
          value={searchInput}
          onChange={handleSearch}
          className="w-full md:w-1/2 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
        <div
          className="absolute right-1 md:right-[26%] cursor-pointer"
          onClick={clearSearchBar}
        >
          <IoIosCloseCircleOutline className="text-3xl text-gray-400" />
        </div>
      </div>

      {/* --------profile cards grid------------ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {searchInput
          ? filteredProfiles &&
            filteredProfiles.map((data) => (
              <div key={data.client_id}>
                <ProfileCard
                  client_id={data.client_id}
                  client_name={data.client_name}
                  client_profile_url={data.client_profile_url}
                  client_city={data.client_city}
                  client_mobile={data.client_mobile}
                />
              </div>
            ))
          : profileData &&
            profileData.map((data) => (
              <div key={data.client_id}>
                <ProfileCard
                  client_id={data.client_id}
                  client_name={data.client_name}
                  client_profile_url={data.client_profile_url}
                  client_city={data.client_city}
                  client_mobile={data.client_mobile}
                />
              </div>
            ))}
      </div>
    </>
  );
};

export default ProfileListing;
