import { ThreeCircles } from "react-loader-spinner";

function Loader() {
  return (
    <div className="absolute mediappv__centering right-0 m-2">
      <ThreeCircles
        visible={true}
        height="30"
        width="30"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
