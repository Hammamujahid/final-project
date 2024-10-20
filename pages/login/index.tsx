import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://service.pace-unv.cloud/api/login",
        {
          email,
          password,
        }
      );

      const token = response.data.data.token; // Mengambil token dari respons API
      const expiresAt = response.data.data.expires_at; // Mengambil tanggal kedaluwarsa

      // Periksa apakah token benar-benar ada
      if (token) {
        console.log("Token received:", token);
        localStorage.setItem("token", token);
        localStorage.setItem("expiresAt", expiresAt); // Simpan waktu kedaluwarsa
        router.push("/home");
      } else {
        setError("Login berhasil, tetapi token tidak ditemukan.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login gagal. Periksa kembali email dan password Anda.");
    }
  };

  return (
    <div className="bg-slate-900 w-screen h-screen py-8 flex justify-center">
      <div className="bg-slate-800 w-1/3 rounded-lg">
        <div className="flex items-center justify-center py-10">
          <h1 className="text-2xl font-bold">MujahiDaily</h1>
        </div>
        <div className="bg-slate-900 h-0.5"></div>
        <div className="p-6 ">
          <form onSubmit={handleLogin} className="space-y-4 my-6">
            <div>
              <input
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded w-full text-black"
              />
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 rounded w-full text-black"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </form>
          <p>
            Belum punya akun? <Link href="/register"><u>Daftar di sini</u></Link>
          </p>
        </div>
      </div>
    </div>
  );
}
