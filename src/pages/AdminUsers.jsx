import { useEffect,useState} from "react";
import api from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/api/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.response?.data));
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
