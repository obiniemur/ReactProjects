const SectionTitles = ({title}) => {
  const firstPart = title.split(" ")[0];
  const secondPart = title.split(" ")[1];
  
  return (
    <div className="my-8">
      <h1 className="font-Roboto text-2xl md:text-5xl font-bold text-center">
        <span className="text-red-500">{firstPart}</span> {secondPart}
      </h1>
    </div>
  );
};

export default SectionTitles;
