import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "@/components/sidebar";

type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  id: number;
  description: string;
  users_id: number;
  created_at: string;
  updated_at: string;
  likes_count: number;
  replies_count: number;
  is_like_post: boolean;
  is_own_post: boolean;
  user: User;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      // Cek apakah token tersedia
      console.log("Token from localStorage:", token);

      if (!token) {
        console.warn("Token tidak ditemukan. Mengarahkan ke halaman login.");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://service.pace-unv.cloud/api/posts?type=all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API response:", response.data);

        setPosts(response.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Gagal memuat postingan. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

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
        <h1 className="text-2xl font-bold mb-4">Dailymu...</h1>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border p-4 rounded">
                <h2 className="text-xl font-semibold">{post.user.name}</h2>
                <p className="text-gray-600">{post.created_at}</p>
                <p className="mt-2">{post.description}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Likes: {post.likes_count}</span>
                  <span>Replies: {post.replies_count}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada postingan yang tersedia.</p>
        )}
      </Sidebar>
    </div>
  );
}
