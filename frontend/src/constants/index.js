import {
  Student,
  Teacher,
  User,
  Class,
  Calendar,
  Studentselected,
  Teacherselected,
  Userslected,
  Calendarslected,
  Classselected,
  bells,
  bellsselected,
  Absence,
  Absenceg,
  Chat, 
  ChatSelected
} from "../assets";

export const Adminlist = [
  {
    title: "Students",
    theLink: "/students",
    svg: Student,
    svgSelected: Studentselected,
    key: 0,
  },
  {
    title: "Teachers",
    theLink: "/teachers",
    svg: Teacher,
    svgSelected: Teacherselected,
    key: 1,
  },
  {
    title: "Classes",
    theLink: "/classes",
    svg: Class,
    svgSelected: Classselected,
    key: 2,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 3,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 4,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 5,
  },

];

export const Studentlist = [
  {
    title: "Classes",
    theLink: "/classes", //to be changed
    svg: Class,
    svgSelected: Classselected,
    key: 0,
  },
  {
    title: "Notifications",
    theLink: "/notifications",
    svg: bells,
    svgSelected: bellsselected,
    key: 1,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 2,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 3,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 4,
  },
];
export const Teacherlist = [
  {
    title: "Classes",
    theLink: "/classes/teacher",
    svg: Class,
    svgSelected: Classselected,
    key: 0,
  },
  {
    title: "Notifications",
    theLink: "/notifications",
    svg: bells,
    svgSelected: bellsselected,
    key: 1,
  },
  {
    title: "Events",
    theLink: "/events",
    svg: Calendar,
    svgSelected: Calendarslected,
    key: 2,
  },
  {
    title: "Chat",
    theLink: "/chat",
    svg: Chat,
    svgSelected: ChatSelected,
    key: 3,
  },
  {
    title: "Profile",
    theLink: "/profile",
    svg: User,
    svgSelected: Userslected,
    key: 4,
  }
];

export const grades = ["LYCEE", "CEM", "PRIMAIRE"];

// i made this function to compare two objects , if you have a better a aproche to achive that please let me know
export function compareObjects(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function findEventById(eventsArray, eventId) {
  for (const event of eventsArray) {
    if (event.id === eventId) {
      return event;
    }
  }
  return null; // Event with specified ID not found
}

//important to avoid the error of undefined data or empty data dont remove it !!
export const EmptyTeacher = {
  id: 0, //i will change this to a string .
  firstName: "",
  lastName: "",
  gendre: "",
  module: "Math",
  location: "",
  phone: "",
  email: "",
  placeOfBirth: "",
  dateOfBirth: "",
  password: "",
  info: "",
  classes: [],
  pfp: "",
};

export const amptyEvent = {
  id: "",
  title: "",
  date: "",
  start: "",
  description: "",
  end: "",
  votes: false,
  votersListYes: [],
  votersListNo: [],
};

export const amptyUser = {
  id: "",
  type: "",
  firstName: "",
  lastName: "",
  gendre: "",
  phone: "",
  email: "",
  password: "",
  info: "",
  pfp: "",
};

export const emptyStudent = {
  id: "",
  firstName: "",
  lastName: "",
  contact: "",
  parentName: "",
  grade: "",
  class: "",
  email: "",
  gender: "M",
  grade: "PRM",
  password: "",
  pfp: "",
};

export const emptyClass = {
  id: "",
  grade: "",
  level: "", //or an int , kifkif
  number: "", //or an int , kifkif
};

//#########################################Testing Data########################################

//#############################################################################################
//#############################################################################################
//#############################################################################################
// the following constants are for the testing purposes

//contain general data for a user (student or teacher or admin)
export const aUser = {
  id: "4RF5EY5C789",
  type: "admin",
  firstName: "Susumu",
  lastName: "Nakoshi",
  phone: "0733403067",
  email: "admin@example.com",
  gender: "male",
  password: "adminadmin123",
  info: "some infos about that i think its useless , ndmt 3la nhar li golt fih njib client.",
  pfp: "https://i.pinimg.com/564x/0b/c0/7f/0bc07fd1cbe349f63fd79104a88c2abc.jpg",
};

// i use this when i need only one teacher
export const teacherData = {
  id: 12345,
  firstName: "Kanye",
  lastName: "West",
  gendre: "male",
  modules: "Music",
  location: "New York, NY, USA",
  phone: "0658693596",
  email: "kanye@estin.dz",
  placeOfBirth: "Annaba",
  dateOfBirth: "2004-07-29",
  password: "123456789",
  info: "Am kanye West and I am a professional music teacher with 10 years of experience. I have worked in many music studios and I have produced many albums. I am a very patient and understanding person. I love to teach and share my knowledge with others. I am very passionate about music and I am always looking for new songs to try. I am very excited to be a part of this community and I am looking forward to meeting all of you",
  classes: ["2cp9", "1cp8", "2cs3"],
  pfp: "https://www.billboard.com/wp-content/uploads/2024/03/kanye-west-yeezy-2015-billboard-1548.jpg?w=942&h=623&crop=1",
};

//for testing one event
export const eventData = {
  id: "1QTMC01FF97",
  title: "Absence",
  date: "2024-04-24",
  start: "08:00 AM",
  description: "Kanye West will be absent today.",
  votes: false,
  votersListYes: [],
  votersListNo: [],
  end: "",
};

export const levelsLyceeData = [
  [
    { id: "1", grade: "LYCEE", level: 1, number: "1" },
    { id: "4azez", grade: "LYCEE", level: 1, number: "2" },
    { id: "7azer", grade: "LYCEE", level: 1, number: "3" },
    { id: "2azrr", grade: "LYCEE", level: 1, number: "4" },
  ],
  [
    { id: "6bjlm", grade: "LYCEE", level: 2, number: "1" },
    { id: "4ampl", grade: "LYCEE", level: 2, number: "2" },
    { id: "7nmlk", grade: "LYCEE", level: 2, number: "3" },
  ],
  [
    { id: "6azrr", grade: "LYCEE", level: 3, number: "1" },
    { id: "4vmln", grade: "LYCEE", level: 3, number: "2" },
    { id: "7flls", grade: "LYCEE", level: 3, number: "3" },
    { id: "2dhbc", grade: "LYCEE", level: 3, number: "4" },
    { id: "7cjhg", grade: "LYCEE", level: 3, number: "5" },
  ],
];

export const levelsCemData = [
  [
    { id: "azeazrv", grade: "CEM", level: 1, number: "1" },
    { id: "4dsqfdg", grade: "CEM", level: 1, number: "2" },
    { id: "cvbcvb7", grade: "CEM", level: 1, number: "3" },
    { id: "xvcxgf2", grade: "CEM", level: 1, number: "4" },
  ],
  [
    { id: "srgthf6", grade: "CEM", level: 2, number: "1" },
    { id: "retfds4", grade: "CEM", level: 2, number: "2" },
    { id: "cvbvts7", grade: "CEM", level: 2, number: "3" },
  ],
  [
    { id: "sfvsrr6", grade: "CEM", level: 3, number: "1" },
    { id: "thxhuk4", grade: "CEM", level: 3, number: "2" },
    { id: "mplong7", grade: "CEM", level: 3, number: "3" },
    { id: "2kfyhnn", grade: "CEM", level: 3, number: "4" },
    { id: "7rfcdex", grade: "CEM", level: 3, number: "5" },
  ],
  [
    { id: "erthjn6", grade: "CEM", level: 4, number: "1" },
    { id: "zzertp4", grade: "CEM", level: 4, number: "2" },
    { id: "7lkmsdv", grade: "CEM", level: 4, number: "3" },
  ],
];

export const levelsPremData = [
  [
    { id: "6klpjm", grade: "PRIMAIRE", level: 1, number: "1" },
    { id: "4nfgjl", grade: "PRIMAIRE", level: 1, number: "2" },
    { id: "7dfpen", grade: "PRIMAIRE", level: 1, number: "3" },
    { id: "2fpsmù", grade: "PRIMAIRE", level: 1, number: "4" },
  ],
  [
    { id: "6acvbf", grade: "PRIMAIRE", level: 2, number: "1" },
    { id: "4apmsk", grade: "PRIMAIRE", level: 2, number: "2" },
    { id: "7admqù", grade: "PRIMAIRE", level: 2, number: "3" },
  ],
  [
    { id: "6azeaz", grade: "PRIMAIRE", level: 3, number: "1" },
    { id: "acvze4", grade: "PRIMAIRE", level: 3, number: "2" },
    { id: "apmlk7", grade: "PRIMAIRE", level: 3, number: "3" },
    { id: "aosmf2", grade: "PRIMAIRE", level: 3, number: "4" },
    { id: "aspmo7", grade: "PRIMAIRE", level: 3, number: "5" },
  ],
  [
    { id: "zmdgd6", grade: "PRIMAIRE", level: 4, number: "1" },
    { id: "4qlkdv", grade: "PRIMAIRE", level: 4, number: "2" },
    { id: "7sqiuh", grade: "PRIMAIRE", level: 4, number: "3" },
  ],
  [
    { id: "6azoj", grade: "PRIMAIRE", level: 5, number: "1" },
    { id: "4zwaz", grade: "PRIMAIRE", level: 5, number: "2" },
    { id: "7llll", grade: "PRIMAIRE", level: 5, number: "3" },
    { id: "2pmol", grade: "PRIMAIRE", level: 5, number: "4" },
  ],
];

//for testing many events
export const events = [
  {
    id: "1QTMC01FF97",
    title: "Absence",
    date: "2024-04-24",
    start: "08:00 AM",
    description: "Kanye West will be absent today.",
    votes: false,
    votersListYes: [],
    votersListNo: [],
    end: "",
  },
  {
    id: "1QLKM01FF97",
    title: "Debate Tournament",
    date: "2022-10-05",
    start: "2:00 PM",
    description:
      "Witness the clash of ideas and rhetoric as students engage in a heated debate competition.",
    votes: true,
    votersListYes: [],
    votersListNo: [],
    end: "",
  },
  {
    id: "1QKMC01F486",
    title: "Science Fair",
    date: "2022-10-01",
    start: "10:00 AM",
    description:
      "Students showcase their innovative science projects and compete for top prizes.",
    votes: false,
    votersListYes: [],
    votersListNo: [],
    end: "",
  },
  {
    id: "1QKMDMLF97",
    title: "Book Fair",
    date: "2022-10-10",
    start: "9:00 AM",
    description:
      "Explore a wide range of books and encourage a love for reading at this annual book fair.",
    votes: false,
    votersListYes: [],
    votersListNo: [],
    end: "3:00 PM",
  },
  {
    id: "QNHMC01FF97",
    title: "Talent Show",
    date: "2022-10-15",
    start: "3:00 PM",
    description:
      "Celebrate the diverse talents of students as they perform on stage in this entertaining showcase.",
    votes: true,
    votersListYes: [],
    votersListNo: [],
    end: "",
  },
  {
    id: "1QKMGFDF97",
    title: "Career Day",
    date: "2022-10-20",
    start: "11:00 AM",
    description:
      "Professionals from various industries share their experiences and insights to help students explore future career paths.",
    votes: true,
    votersListYes: [],
    votersListNo: [],
    end: "2:00 PM",
  },
];
