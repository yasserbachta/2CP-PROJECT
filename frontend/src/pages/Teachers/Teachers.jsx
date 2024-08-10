import Header from "../../layout/header";
import { SearchHead } from "../../components/ui";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { TeachersList } from "../../components/teachers_comp";
import { useSearch } from "../../hooks";
import useAuthTokens from "../../context/AuthTokens";
import LLoading from "../../layout/Loading";
import refrechHandler from "../../context/refrechHandler";
import Overlay from "../../components/Overlay";
import useShowModal from "../../hooks/showModal";
import useLoadingT from "../../context/teachersLoading";

function Teachers() {
  const { search } = useSearch();
  const { authTokens } = useAuthTokens();
  const { loading, setLoading } = useLoadingT();
  const [searchedTeachers, setSearchTeachers] = useState([]);
  const { refTeacherList } = refrechHandler();
  const [teachers, setTeachers] = useState([]); // [teachers, setTeachers
  const { showModal } = useShowModal();

  const handleSearch = (search) => {
    // const searchInput = e.trim().toLowerCase();
    const searchTerms = search.split(/\s+/);
    if (search == "") {
      setSearchTeachers(teachers);
      return;
    }
    setSearchTeachers(
      searchedTeachers.filter((teacher) =>
        searchTerms.every((term) =>
          (
            teacher.firstName.toLowerCase() + teacher.lastName.toLowerCase()
          ).includes(term)
        )
      )
    );
  };

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/teachers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      // console.log(response);
      const data = response.data;
      // console.log(data);

      // Renaming the properties
      const renamedData = data.map((item) => {
        const {
          prénom: firstName,
          nom: lastName,
          phone_num: phone,
          teacher_id: id,
          ...rest
        } = item;

        return {
          firstName,
          lastName,
          phone,
          id,
          ...rest,
        };
      });

      setSearchTeachers(renamedData);
      setTeachers(renamedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [refTeacherList]);

  useEffect(() => {
    handleSearch(search);
  }, [search]);

  return (
    <div className="m-[15px]  sm:m-[30px] flex flex-col gap-5 sm:gap-9 ">
      <Header title={"Teachers"} />
      <SearchHead />
      {loading && <LLoading />}
      {!loading && <TeachersList teachers={searchedTeachers} />}
      <div className="sm:hidden">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      {showModal && <Overlay data={""} />}
    </div>
  );
}

export default Teachers;
