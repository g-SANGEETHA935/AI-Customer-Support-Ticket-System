export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <button
        onClick={() =>
          window.location.href = "/create-ticket"
        }
      >
        Create Ticket
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}