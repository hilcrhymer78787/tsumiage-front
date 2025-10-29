// TODO
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { usePasswordReset } from "@/data/user/usePasswordReset";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { passwordReset, isLoading, successMsg, error } = usePasswordReset();

  // queryからtokenを取得
  useEffect(() => {
    if (!router.isReady) return;
    const t = router.query.token;
    const e = router.query.email;
    if (typeof t === "string" && typeof e === "string") {
      setToken(t);
      setEmail(e);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await passwordReset({
      email,
      password,
      password_confirmation: passwordConfirmation,
      token,
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">パスワードリセット</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>{email}</div>

        <div>
          <label>新しいパスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>パスワード確認</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? "送信中..." : "リセット"}
        </button>
      </form>

      {successMsg && <p className="text-green-600 mt-4">{successMsg}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
