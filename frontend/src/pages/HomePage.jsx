import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox.jsx";
import UserForm from "../components/UserForm.jsx";
import UserTable from "../components/UserTable.jsx";

const API = "http://localhost:5000/api/users";
const empty = { name: "", age: "", phone: "", gender: "Male" };

export default function HomePage() {
  const nav = useNavigate();
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");

  const request = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) throw Error(data.message);
    return data;
  };

  const load = async () => {
    const data = await request(`${API}?page=${page}&search=${search}`);
    setUsers(data.users);
    setPages(data.pages);
  };

  useEffect(() => {
    load().catch(e => setMsg(e.message));
  }, [page, search]);

  const save = async e => {
    e.preventDefault();

    try {
      await request(editId ? `${API}/${editId}` : API, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      setForm(empty);
      setEditId("");
      setMsg("");
      await load();
    } catch (e) {
      setMsg(e.message);
    }
  };

  const edit = user => {
    setEditId(user._id);
    setForm({
      name: user.name,
      age: user.age,
      phone: user.phone,
      gender: user.gender
    });
  };

  const remove = async id => {
    try {
      await request(`${API}/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setMsg(e.message);
    }
  };

  const addAddr = user => {
    nav(`/add-address/${user._id}/${encodeURIComponent(user.name)}`);
  };

  return (
    <main>
      <h2>MERN User CRUD</h2>

      {msg && <p className="err">{msg}</p>}

      <UserForm form={form} setForm={setForm} save={save} editId={editId} />

      <SearchBox setSearch={setSearch} setPage={setPage} />

      <UserTable
        users={users}
        page={page}
        pages={pages}
        setPage={setPage}
        edit={edit}
        remove={remove}
        addAddr={addAddr}
      />
    </main>
  );
}