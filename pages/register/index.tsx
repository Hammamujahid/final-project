import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://service.pace-unv.cloud/api/register",
        {
          name,
          email,
          password,
          dob,
          phone,
          hobby,
        }
      );

      console.log("Registration successful:", response.data);
      // Arahkan ke halaman login setelah registrasi berhasil
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        "Gagal melakukan registrasi. Pastikan semua data terisi dengan benar."
      );
    }
  };

  return (
    <div className="bg-slate-900 w-screen h-screen py-8 flex justify-center">
      <div className="w-1/3 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Registrasi</h1>
        <p>
          Sudah punya akun?{" "}
          <Link href="/login">
            <u>Login di sini</u>
          </Link>
        </p>
      </div>
      <div className="bg-slate-800 w-1/3 rounded-lg overflow-y-auto scrollbar-hidden">
        <div className="flex items-center justify-center py-10">
          <h1 className="text-2xl font-bold">MujahiDaily</h1>
        </div>
        <div className="bg-slate-900 h-0.5"></div>
        <div className="p-6 ">
          <form onSubmit={handleRegister} className="space-y-4 my-6">
            <div>
              <input
                placeholder="Nama"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded w-full text-black"
              />
            </div>
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
            <div>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border p-2 rounded w-full text-black "
              />
            </div>
            <div>
              <input
                placeholder="No Telepon"
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 rounded w-full text-black"
              />
            </div>
            <div>
              <input
                placeholder="Hobi"
                type="text"
                id="hobby"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                className="border p-2 rounded w-full text-black"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Registrasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
