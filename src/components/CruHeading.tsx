const CruHeading = ({ children }: { children: string | string[] }) => {
  return (
    <h2 className="font-60 fw-semibold font-line h-color m-b-80">{children}</h2>
  );
};

export default CruHeading;
