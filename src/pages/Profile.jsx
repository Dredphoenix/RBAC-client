import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyProfile } from "../features/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {profile ? (
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {profile.name}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div>
            <strong>Role:</strong> {profile.role}
          </div>
        </div>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
}
