import React from "react";
import {Header } from "../../layout";
import { NotificationItem , Head } from "../notification_comp";
import { useState } from "react";
const NotificationPage = () => {
  const [active, setActive] = useState("All");
  return (
    <div className="m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Notifications"} />
      <br />
      <br />
      <div className={`relative flex flex-col rounded-xl bg-white  overflow-hidden pt-5 w-[90%] sm:w-[80%] m-auto select-none  h-screen`}>
        <Head  active={active} setActive={setActive} />
        <div className="overflow-y-scroll">
          {active == 'All' ? Notifications.map((notification , index) => {
            if (index % 2 == 0) {
              return <NotificationItem key={index} data={notification} bg={"bg-[#F5F8FC]"} />;
            } else {
              return <NotificationItem key={index} data={notification} bg={"bg-white"} />;
            }
          } ) :  Notifications.filter(notif => notif.read === false).map((notification , index) => {
            if (notification.read == false) {
              if (index % 2 == 0) {
                return <NotificationItem key={index} data={notification} bg={"bg-[#F5F8FC]"} />;
              } else {
                return <NotificationItem key={index} data={notification} bg={"bg-white"} />;
              }
            }
          } )}
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;





// Testin Data

const Notifications = [{"type":"attachment","string":"Thesis (Tesis)","read":true},
{"type":"absence","string":"Silent World, The (Le monde du silence)","read":true},
{"type":"attachment","string":"The Living Magoroku","read":true},
{"type":"attachment","string":"Mobsters","read":true},
{"type":"absence","string":"Anvil! The Story of Anvil","read":true},
{"type":"attachment","string":"Slither","read":false},
{"type":"attachment","string":"Porco Rosso (Crimson Pig) (Kurenai no buta)","read":false},
{"type":"attachment","string":"Double Solitaire","read":false},
{"type":"attachment","string":"Spencer's Mountain","read":false},
{"type":"attachment","string":"Pit, The","read":false},
{"type":"absence","string":"Players, The (Les infidèles)","read":false},
{"type":"attachment","string":"Lapland Odyssey (Napapiirin sankarit)","read":true},
{"type":"attachment","string":"Temple Grandin","read":false},
{"type":"attachment","string":"Legend of Boggy Creek, The","read":false},
{"type":"attachment","string":"Devil in a Blue Dress","read":true},
{"type":"attachment","string":"Private Function, A","read":true},
{"type":"attachment","string":"Human Factor, The","read":false},
{"type":"absence","string":"Expired","read":true},
{"type":"attachment","string":"Fallen Sparrow, The","read":false},
{"type":"attachment","string":"Beerfest","read":true},
{"type":"absence","string":"Mikey and Nicky","read":false},
{"type":"attachment","string":"Winged Migration (Peuple migrateur, Le)","read":false},
{"type":"absence","string":"Crows Zero (Kurôzu zero)","read":true},
{"type":"absence","string":"Eros","read":false},
{"type":"absence","string":"Toronto Stories","read":false}]