import { TeacherCard, TeacherProfile } from "./";

function TeachersList({ teachers }) {
  teachers = teachers || [];
  teachers = teachers.filter((teach) => teach !== null || teach !== undefined);
  teachers = teachers.filter((teach) => teach.id !== 9);

  return (
    <div className="flex flex-wrap w-auto gap-1 sm:gap-2 justify-center items-center sm:justify-start">
      {/* {console.log(teachers)} */}
      {teachers.map((teach) => (
        <TeacherCard key={teach.id} data={teach} />
      ))}
    </div>
  );
}

export default TeachersList;
