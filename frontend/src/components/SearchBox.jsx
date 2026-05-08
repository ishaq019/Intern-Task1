import { useState } from "react";

export default function SearchBox({ setSearch, setPage }) {
  const [text, setText] = useState("");

  const submit = e => {
    e.preventDefault();
    setPage(1);
    setSearch(text.trim());
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Global search name, phone, age, gender, address..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button>Search</button>
      <button type="button" onClick={() => {
        setText("");
        setSearch("");
        setPage(1);
      }}>
        Clear
      </button>
    </form>
  );
}