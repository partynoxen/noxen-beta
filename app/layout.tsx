export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        style={{
          background: "red",
          color: "white",
          fontSize: "120px",
          fontWeight: "900",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        LAYOUT WORKS 🔥
      </body>
    </html>
  );
}