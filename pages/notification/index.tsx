import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

type Notification = {
  id: number;
  remark: string;
  read: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  posts: {
    id: number;
    description: string;
    user: {
      id: number;
      name: string;
    };
  };
};

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("Token tidak ditemukan");
        return;
      }

      try {
        const response = await axios.get(
          "https://service.pace-unv.cloud/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data);
        setNotifications(response.data.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Gagal memuat data notifikasi. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Sidebar>
        <div className="flex items-center justify-center h-screen">
          <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      </Sidebar>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Sidebar>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Notifications</h1>
          {notifications.length === 0 ? (
            <p>Tidak ada notifikasi</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`border p-4 rounded`}
                >
                  <p className="font-semibold">{notification.user.name} {notification.remark} your post:</p>
                  <p className="text-gray-600">{notification.posts.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Posted by: {notification.posts.user.name}</p>
                  <p className="text-xs text-gray-400">{new Date(notification.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Sidebar>
    </div>
  );
}
