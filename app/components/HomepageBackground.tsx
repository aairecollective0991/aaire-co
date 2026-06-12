export default function HomepageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-25 z-0">
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 139px,
              rgba(201,169,110,0.5) 139px,
              rgba(201,169,110,0.5) 140px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 139px,
              rgba(201,169,110,0.5) 139px,
              rgba(201,169,110,0.5) 140px
            )
          `,
        }}
      />
    </div>
  );
}
