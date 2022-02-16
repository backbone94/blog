export default function Loading() {
  return (
    <div
      style={{
        height: 720,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
}
