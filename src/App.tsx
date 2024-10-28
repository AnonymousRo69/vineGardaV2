import "./App.css";
import { useState } from "react";

function App() {
  let [Input, setInput] = useState("");
  let [Database, setDatabase] = useState<string[]>([]);
  let [Found, setFound] = useState<null | boolean>(null);
  // let [Alive, setAlive] = useState<null | boolean>(null);

  async function GetDatabase() {
    try {
      let response = await fetch(
        "https://bazadedatepd.up.railway.app/database"
      );
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        setDatabase(data); // Update the state with the parsed data
        console.log(`Response Status: ${response.status}`); // Log the data for debugging
      }
    } catch (error) {}
  }
  // useEffect(() => {
  //   GetDatabase();
  // }, []);
  const checkInputInDatabase = async () => {
    await GetDatabase();
    const isFound = Database.includes(Input.toLowerCase()); // Check if input exists in database
    setFound(isFound);
    console.log(isFound);
  };
  return (
    <div className="card">
      <h1 className="title">Vine Garda?</h1>
      <input
        type="text"
        name="numar"
        id="numar"
        placeholder="Cauta un Numar"
        value={Input}
        onChange={(event) => {
          setInput(event.target.value);
        }}
      />
      <button
        onClick={() => {
          checkInputInDatabase();
          setTimeout(() => {
            setFound(null);
          }, 1500);
        }}
      >
        Cauta
      </button>
      {Found != null ? (
        Found === true ? (
          <div>E Gabor</div>
        ) : (
          <div>Nu e Gabor</div>
        )
      ) : (
        <div>Introdu un Numar de Imatriculare</div>
      )}
    </div>
  );
}

export default App;
