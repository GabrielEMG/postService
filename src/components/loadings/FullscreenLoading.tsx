import Loader from "react-loader-spinner";

type Props = {
  height: number;
  width: number;
};

const FullscreenLoading: React.FC<Props> = (props): JSX.Element => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader
        type="TailSpin"
        color="#3C1874"
        width={props.width}
        height={props.height}
      />
    </div>
  );
};

export default FullscreenLoading;
