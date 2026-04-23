import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard({ token, logout }) {

  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const headers = {
    headers: { Authorization: token }
  };

  const fetchData = async () => {
    const res = await API.get("/grievances", headers);
    setList(res.data);
  };

  const add = async () => {
    await API.post("/grievances", {
      title,
      description,
      category: "Academic"
    }, headers);

    fetchData();
  };

  const del = async (id) => {
    await API.delete(`/grievances/${id}`, headers);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">

      <h2>Student Grievance Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <div className="card">
        <h3>Add Grievance</h3>

        <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />

        <button onClick={add}>Submit</button>
      </div>

      <div className="card">
        <h3>All Grievances</h3>

        {list.map((item)=>(
          <div key={item._id} className="card">
            <h4>{item.title}</h4>
            <p>{item.description}</p>

            <button onClick={()=>del(item._id)}>Delete</button>
          </div>
        ))}
      </div>

    </div>
  );
}