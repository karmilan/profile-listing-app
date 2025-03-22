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

  // -----------loading handling------------
  if (loading)
    return (
      <div className="grid w-full h-full md:h-screen place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          className="w-12 h-12 text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    );

  // ---------------Error handling----------------
  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );

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
