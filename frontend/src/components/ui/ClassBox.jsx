function ClassBox({ theclass = '', color, style , grade = '' }) {
  const boxStyles = {
    backgroundColor: color,
  };
  return (
    <div className={style} style={boxStyles}>
      {grade && (grade == "S" || grade == "LYCEE"
        ? "LYCEE"
        : grade == "M" || grade == "CEM"
        ? "CEM"
        : "PRM")}
        {theclass && ` ${theclass}`}
    </div>
  );
}

export default ClassBox;
