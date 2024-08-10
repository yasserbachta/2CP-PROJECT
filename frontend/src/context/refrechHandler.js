import { create } from "zustand";

// the stupidist thing I have ever wrote , mch 9adr n5amm wlh

const refrechHandler = create((set) => ({
  refStudentList: false,
  setRefStudentList: (val) => set(() => ({ refStudentList: val })),
  refTeacherList: false,
  setRefTeacherList: (val) => set(() => ({ refTeacherList: val })),
  refEventsList: false,
  setRefEventsList: (val) => set(() => ({ refEventsList: val })),
  refClassList: false,
  setRefClassList: (val) => set(() => ({ refClassList: val })),
  refModulesList: false,
  setModulesList: (val) => set(() => ({ refModulesList: val })),
  refCorsesList: false,
  setRefCorsesList: (val) => set(() => ({ refCorsesList: val })),
  refAbsesnceList: false,
  setRefAbsesnceList: (val) => set(() => ({ refAbsesnceList: val })),
  refProfile: false,
  setRefProfile: (val) => set(() => ({ refProfile: val })),
}));

export default refrechHandler;
