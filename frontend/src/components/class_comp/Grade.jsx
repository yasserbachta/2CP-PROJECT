import { Link } from "react-router-dom";
import { LearningBro1, LearningBro2, LearningBro3 } from "../../assets";

function Grade({ grade }) {
  let picture = null;
  let bg = null;
  switch (grade) {
    case "LYCEE":
      picture = LearningBro1;
      bg = "bg-[#4D44B5]";
      break;
    case "CEM":
      picture = LearningBro2;
      bg = "bg-[#FB7D5B]";
      break;
    case "PRIMAIRE":
      picture = LearningBro3;
      bg = "bg-[#FCC43E]";
      break;
    default:
      return null;
  }
  return (
    <Link to={`${grade.toLowerCase()}`} className="flex flex-col items-center">
      <div
        className={`flex flex-col items-center p-2 text-center font-poppins rounded-xl shadow-md cursor-pointer
                md:w-[90%] w-[80%]  
                transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105  duration-300 
                ${bg}`}
      >
        <img src={picture} alt="grade" />
      </div>
      <h3 className=" text-[#303972] font-bold text-[25px]  mt-5">{grade}</h3>
    </Link>
  );
}

export default Grade;
