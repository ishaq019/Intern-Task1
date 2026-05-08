export default function UserTable({ users, page, pages, setPage, edit, remove, addAddr }) {
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length ? users.map(u => (
            <tr key={u._id}>
              <td>{u.userID}</td>
              <td>{u.name}</td>
              <td>{u.age}</td>
              <td>{u.phone}</td>
              <td>{u.gender}</td>
              <td>{u.address || "No address"}</td>
              <td>
                <button onClick={() => edit(u)}>Edit</button>
                <button onClick={() => remove(u._id)}>Delete</button>
                <button onClick={() => addAddr(u)}>
                  {u.address ? "Edit Address" : "Add Address"}
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page} of {pages}</span>

        <button disabled={page === pages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}