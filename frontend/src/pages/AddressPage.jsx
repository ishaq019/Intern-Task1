import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://localhost:5000/api/addresses";

export default function AddressPage() {
  const nav = useNavigate();
  const { userId, name } = useParams();

  const [address, setAddress] = useState("");
  const [addressId, setAddressId] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const loadAddress = async () => {
      try {
        const res = await fetch(`${API}/user/${userId}`);
        const data = await res.json();

        if (!res.ok) throw Error(data.message);

        if (data) {
          setAddress(data.address);
          setAddressId(data._id);
        }
      } catch (e) {
        setMsg(e.message);
      }
    };

    loadAddress();
  }, [userId]);

  const save = async e => {
    e.preventDefault();

    try {
      const res = await fetch(addressId ? `${API}/${addressId}` : API, {
        method: addressId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressId ? { address } : { userId, address })
      });

      const data = await res.json();
      if (!res.ok) throw Error(data.message);

      nav("/");
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <main>
      <h2>{addressId ? "Edit Address" : "Add Address"}</h2>

      {msg && <p className="err">{msg}</p>}

      <form onSubmit={save}>
        <input value={decodeURIComponent(name)} disabled />

        <input
          placeholder="Unique address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <button>{addressId ? "Update" : "Save"}</button>

        <button type="button" onClick={() => nav("/")}>
          Cancel
        </button>
      </form>
    </main>
  );
}