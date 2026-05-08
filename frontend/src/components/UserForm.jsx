import "./UserForm.css";

export default function UserForm({ form, setForm, save, edit }) {
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  return <form onSubmit={save}>
    <h3>{edit ? "Edit User" : "Add New User"}</h3>
    <input id="form-name" name="name" placeholder="Name" value={form.name} onChange={change} required />
    <input id="form-age" name="age" type="number" placeholder="Age" value={form.age} onChange={change} required />
    <input id="form-phone" name="phone" placeholder="Phone" value={form.phone} onChange={change} required />
    <select id="form-gender" name="gender" value={form.gender} onChange={change}>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    <button type="submit" id="form-submit">{edit ? "Update" : "Add"} User</button>
  </form>;
}
