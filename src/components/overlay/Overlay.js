export default function Overlay({
  children,
  overlayClick,
  overlayId = "overlay",
}) {
  const handleClick = (event) => {
    if (event.target.id === overlayId) {
      overlayClick && overlayClick(true);
    }
  };

  return (
    <div
      id={overlayId}
      className=" bg-overlay fixed inset-0 z-50 backdrop-saturate-[80%] flex flex-col justify-center items-center p-[15px]"
      onMouseDown={handleClick}
    >
      {children}
    </div>
  );
}
