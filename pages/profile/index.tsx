import Sidebar from "@/components/sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

type Profile = {
  id: number;
  email: string;
  dob: string | null;
  phone: number | null;
  hobby: string | null;
  created_at: string;
  updated_at: string;
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("Token tidak ditemukan");
        return;
      }

      try {
        const response = await axios.get(
          "https://service.pace-unv.cloud/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data);
        setProfile(response.data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Gagal memuat data profile. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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

  if (!profile) {
    return <p>Data profile tidak tersedia</p>;
  }

  return (
    <div>
      <Sidebar>
        <div>
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{profile.email}</h2>
            <p className="text-gray-600">{profile.dob || "Tanggal lahir tidak tersedia"}</p>
            <p className="mt-2">{profile.phone || "Nomor telepon tidak tersedia"}</p>
            <p className="mt-2">{profile.hobby || "Hobi tidak tersedia"}</p>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
