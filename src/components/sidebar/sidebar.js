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
      }}
    >
      {props.children}
    </div>
  );
};

export default Sidebar;
