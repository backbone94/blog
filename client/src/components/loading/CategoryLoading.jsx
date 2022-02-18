export default function CategoryLoading() {
  return (
    <div
      style={{
        height: 700,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
}
