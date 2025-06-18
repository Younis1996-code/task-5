import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigat = useNavigate();
  return (
    <button
      className="m-b-80 wh-40 d-flex justify-content-center bor-black bg-white align-items-center rounded-circle fs-2 fw-bold font-line"
      onClick={() => navigat("/")}
    >
      &lt;
    </button>
  );
};

export default BackButton;
