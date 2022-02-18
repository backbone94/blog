export default function HeaderLoading() {
  return (
    <div
      style={{
        height: 100,
        borderBottom: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );
}
