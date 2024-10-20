import { ReactNode, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FaHome, FaSignOutAlt, FaUserAlt, FaBell } from "react-icons/fa";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token tidak ditemukan saat logout.");
      return;
    }

    try {
      await axios.post(
        "https://service.pace-unv.cloud/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Logout berhasil");

      // Hapus token dari localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("expiresAt"); // Hapus juga waktu kedaluwarsa
      router.push("/login"); // Arahkan ke halaman login
    } catch (err) {
      console.error("Error during logout:", err);
      setError("Gagal melakukan logout. Silakan coba lagi nanti.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-screen h-screen flex">
      <div className="w-25 bg-slate-800 px-8 flex flex-col justify-center space-y-20">
        <button
          onClick={() => router.push("/home")}
          className="bg-slate-900 p-2 rounded-lg flex justify-center"
        >
          <FaHome className="size-9" />
        </button>
        <button
          onClick={() => router.push("/notification")}
          className="bg-slate-900 p-2 rounded-lg flex justify-center"
        >
          <FaBell className="size-9" />
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="bg-slate-900 p-2 rounded-lg flex justify-center"
        >
          <FaUserAlt className="size-9" />
        </button>
        <button onClick={handleLogout} className="bg-red-500 p-2 rounded-lg flex justify-center">
          <FaSignOutAlt className="size-9" />
        </button>
      </div>
      <div className="w-full p-4 bg-slate-900 overflow-auto">{children}</div>
    </div>
  );
}
