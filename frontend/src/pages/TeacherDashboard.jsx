import {useState} from "react";
import api from "../api/axios";
export default function TeacherDashboard(){
 const [title,setTitle]=useState("");
 return <div>
  <h2>Create Quiz</h2>
  <input onChange={e=>setTitle(e.target.value)} />
  <button onClick={()=>api.post("/teacher/quizzes",{title})}>Create</button>
 </div>;
}
