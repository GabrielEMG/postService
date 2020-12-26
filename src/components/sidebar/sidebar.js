const Sidebar = (props) => {
  return (
    <div
      style={{
        position: "sticky",
        height: "100vh",
        left: 0,
        top: 0,
        width: `${props.width}px`,
        ...props.style,
        backgroundColor: "#283747",
        color: "#F3F3F3",
      }}
    >
      {props.children}
    </div>
  );
};

export default Sidebar;
