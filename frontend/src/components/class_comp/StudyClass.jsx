import { Link } from "react-router-dom";
import { M1, M2, M3, M4, P1, P2, P3, P4, P5, S1, S2, S3 } from "../../assets";

const gradeConfig = {
  LYCEE: {
    color: "bg-[#4D44B5]",
    levels: {
      1: { picture: S1, position: "top-[15px] right-0" },
      2: { picture: S2, position: "top-[15px] left-0" },
      3: { picture: S3, position: "top-[8px] left-0" },
    },
    titlePrefix: "S",
  },
  CEM: {
    color: "bg-[#FB7D5B]",
    levels: {
      1: { picture: M1, position: "h-full top-[15px] right-0" },
      2: { picture: M2, position: "h-full top-[15px] right-0" },
      3: { picture: M3, position: "top-[0px] right-0" },
      4: { picture: M4, position: "h-full top-[15px] right-[-4px]" },
    },
    titlePrefix: "M",
  },
  PRIMAIRE: {
    color: "bg-[#FCC43E]",
    levels: {
      1: { picture: P1, position: "h-full top-[15px] right-0" },
      2: { picture: P2, position: "h-full top-[15px] right-[-1px]" },
      3: { picture: P3, position: "h-4/5 top-[15px] right-[-4px]" },
      4: { picture: P4, position: "h-full top-[15px] right-0" },
      5: { picture: P5, position: "h-[60%] top-0 right-[-4px]" },
    },
    titlePrefix: "P",
  },
};

function StudyClass({ grade, level, number, classId }) {
  if (!gradeConfig[grade] || !gradeConfig[grade].levels[level]) {
    console.log("Invalid grade or level");
    return null;
  }

  const { color, levels, titlePrefix } = gradeConfig[grade];
  const { picture, position } = levels[level];
  const title = `${level}${titlePrefix}${number}`;

  return (
    <Link
      to={`/classes/${grade.toLowerCase()}/${level}${titlePrefix.toLowerCase()}${number}/${classId}`}
      className={`p-2 flex flex-col justify-center items-center text-center font-poppins rounded-xl shadow-md
                relative overflow-hidden cursor-pointer 
                w-[17%] min-h-[120px] sm:min-w-[170px] min-w-[150px]
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-300 
                bg-opacity-30 ${color}`}
    >
      <img src={picture} alt="grade level" className={`absolute ${position}`} />
      <h3 className="text-[#303972] font-bold text-2xl z-10">{title}</h3>
    </Link>
  );
}

export default StudyClass;
