import React from 'react'
import SelectComp from '../SelectComp'
const Listheadmd = ({attchType , setAttchType}) => {

  const hoverannimation = 'hover:text-primarypurp before:absolute before:w-[0px] before:h-[5px] before:bg-primarypurp relative hover:before:w-full before:bottom-[-25px] before:left-0 before:transition-all before:ease-in-out'
  return (
    <div className="  bg-white border-b-[3px] rounded-t-xl px-[26px] *:text-[18px] *:font-[600] *:text-black *:font-poppins ">
      <div className='sm:hidden'>
        {/* AGHBA HAJA 9ADR TCHOFHA */}
        <SelectComp nbr={attchType == 'Cours' ? 0 : 1} onChange={setAttchType}  options={['Cours' , 'Devoir' , 'Epreuves' , 'Evaluation Continue ']} name={'AttachementTypes'} style={'placeholder:text-textgray text-primarypurp w-[120px]  border-none text-[20px] font-kumbhfont font-[700] rounded-lg mb-5 outline-none'} />

      </div>
      
      <div className="hidden sm:flex sm:justify-between sm:items-center h-[75px] *:cursor-pointer">
        <div onClick={()=> {setAttchType('Cours')}} className={`${attchType == 'Cours' ? "text-primarypurp  before:absolute before:h-[5px] before:w-full before:bottom-[-25px] before:left-0 transition-all  ease-in-out before:bg-primarypurp relative " : hoverannimation}`}>Cours</div>
        <div onClick={()=> {setAttchType('Devoir')}} className={`${attchType == 'Devoir' ? "text-primarypurp  transition-all  ease-in-out before:absolute before:h-[5px] before:w-full before:bottom-[-25px] before:left-0 before:bg-primarypurp relative " : hoverannimation}`}>Devoir</div>
        <div onClick={()=> {setAttchType('Epreuves')}} className={`${attchType == 'Epreuves' ? "text-primarypurp  before:absolute before:h-[5px] before:w-full before:bottom-[-25px] transition-all  ease-in-out before:left-0 before:bg-primarypurp relative " : hoverannimation}`}>
          Epreuves
        </div>
        <div onClick={()=> {setAttchType('EvaluationContinue')}} className={`${attchType == 'EvaluationContinue' ? "text-primarypurp  before:absolute before:h-[5px] before:w-full before:bottom-[-25px] transition-all  ease-in-out before:left-0 before:bg-primarypurp relative " : hoverannimation}`}>
          Evaluation Continue
        </div>
      </div>
    </div>
  )
}

export default Listheadmd
