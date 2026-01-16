import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useCategories } from "../store/Categories";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { getProfile, profile, logout } = useAuthStore();
  const { categories, getCategories, createCategories } = useCategories();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getCategories();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    createCategories(title);
    setTitle("");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const styles = {
    page: { maxWidth: 720, margin: "0 auto", padding: 20, fontFamily: "system-ui, Arial" },
    card: {
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: 12,
      padding: 16,
      boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
      marginBottom: 16,
    },
    title: { margin: "0 0 10px", fontSize: 22 },
    label: { fontWeight: 700, marginRight: 8 },
    row: { margin: "6px 0", color: "#222" },
    form: { display: "flex", gap: 10, marginTop: 10 },
    input: {
      flex: 1,
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid #ddd",
      outline: "none",
    },
    btn: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "1px solid #ddd",
      background: "#f5f5f5",
      cursor: "pointer",
    },
    btnPrimary: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "none",
      background: "#1677ff",
      color: "white",
      cursor: "pointer",
    },
    btnDanger: {
      padding: "10px 14px",
      borderRadius: 10,
      border: "none",
      background: "#ff4d4f",
      color: "white",
      cursor: "pointer",
      marginTop: 10,
    },
    list: { marginTop: 12, paddingLeft: 18 },
    li: { padding: "6px 0", borderBottom: "1px solid #f1f1f1" },
    sectionTitle: { margin: "0 0 8px", fontSize: 18 },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Profile</h2>

        {profile ? (
          <div>
            <p style={styles.row}>
              <span style={styles.label}>UserName:</span> {profile.username}
            </p>
            <p style={styles.row}>
              <span style={styles.label}>Email:</span> {profile.email}
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, color: "#666" }}>Loading profile...</p>
        )}
      </div>

      <div style={styles.card}>
        <h2 style={styles.sectionTitle}>Categories</h2>

        <form onSubmit={submit} style={styles.form}>
          <input
            style={styles.input}
            value={title}
            placeholder="New category..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <button style={styles.btnPrimary} type="submit">
            Add
          </button>
        </form>

        <ul style={styles.list}>
          {categories.map((cat) => (
            <li key={cat.id} style={styles.li}>
              {cat.title}
            </li>
          ))}
        </ul>

        <button style={styles.btnDanger} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
