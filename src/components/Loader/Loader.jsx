import "./loader.css"
export function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        height: "100vh",
      }}
    >
      <div className="spinner" />
    </div>
  );
}
