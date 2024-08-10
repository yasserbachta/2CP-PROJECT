import { Link } from "react-router-dom";
import { Phone, Email } from "../../assets";
import { SmallButton, TeacherPicture } from "../ui/";

function TeacherCard({ data }) {
  return (
    <Link
      to={`/teachers/profile/${data.id}`}
      className="m-2 text-center font-poppins flex flex-col items-center
                sm:w-[20%] w-[45%] max-w-[150px] h-1/5 rounded-xl shadow-xl bg-white  sm:min-w-[180px] sm:max-w-[200px]
                cursor-pointer  transition ease-in-out delay-50
                hover:-translate-y-1 hover:scale-105 hover:bg-[#E4E5EC] duration-300 p-2"
    >
      <TeacherPicture pfp={data.pfp} size="69px" />
      <h3 className=" text-[#303972] font-bold text-base ">
        {data.firstName + " " + data.lastName}
      </h3>
      <p className="flex text-[14px] text-[#A098AE]">{data.modules}</p>
      <div className="flex justify-evenly w-4/5  m-2 ">
        <SmallButton
          picture={Phone}
          altText="Phone"
          hoverText={data.phone}
          color="#F3F4FF"
          size="35px"
        />
        <SmallButton
          picture={Email}
          altText="Email"
          hoverText={data.email || "No email"}
          color="#4D44B5"
          size="35px"
        />
      </div>
    </Link>
  );
}

export default TeacherCard;
