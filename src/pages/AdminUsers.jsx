 import { useDispatch,useSelector } from "react-redux";
 import { useEffect } from "react";
 import { Link } from "react-router-dom";
 import { fetchUsers,updateUserRole,deleteUser } from "../features/admin/adminSlice";
 import { hasPermission } from "../utils/permissions";


export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const loggedInUser = useSelector((state) => state.auth.user);

  const canUpdate = hasPermission(loggedInUser?.role, "users:update");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (userId, role) => {
    dispatch(updateUserRole({ userId, role }));
  };

  const handleDelete = (userId) => {
    if (confirm("Are you sure?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Admin Users</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              <td>
                {canUpdate ? (
                  <select
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                ) : (
                  <span>{u.role}</span>
                )}
              </td>

              <td>
                <Link to={`/admin/users/${u._id}`}>
                  <button>View</button>
                </Link>

                {hasPermission(loggedInUser?.role, "users:delete") && loggedInUser?._id !== u._id && (
                  <button
                    onClick={() => handleDelete(u._id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}