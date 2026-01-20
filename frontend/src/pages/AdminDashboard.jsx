import {useQuery} from "@tanstack/react-query";
import api from "../api/axios";
export default function AdminDashboard(){
 const {data=[]}=useQuery({queryKey:["users"],queryFn:async()=> (await api.get("/admin/users")).data});
 return <div><h2>Users</h2>{data.map(u=><div key={u.id}>{u.name} - {u.role}</div>)}</div>;
}
