import "./App.css";
import { useState } from "react";

function App() {
  let [Background, setBackground] = useState("#242424");
  let [Input, setInput] = useState("");
  let [Database, setDatabase] = useState<string[]>([]);
  let [FeedBack, setFeedBack] = useState<string>(
    "Introdu un Numar de Imatriculare"
  );
  let [ShowLogin, setShowLogin] = useState(false);
  let [Password, setPassword] = useState("");
  // let [Alive, setAlive] = useState<null | boolean>(null);

  async function GetDatabase() {
    try {
      let response = await fetch(
        "https://bazadedatepd.up.railway.app/database"
      );
      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        setDatabase(data); // Update the state with the parsed data // Log the data for debugging
      }
    } catch (error) {}
  }
  // useEffect(() => {
  //   GetDatabase();
  // }, []);
  const checkInputInDatabase = async () => {
    if (Input) {
      await GetDatabase();
      const isFound = Database.includes(Input.toLowerCase());
      if (isFound) {
        setFeedBack("Numarul de Imatriculare apartine unui Politist");
      } else {
        setFeedBack("Numarul nu se afla in baza de date");
      }
    }
  };
  const addToDatabase = async () => {
    try {
      let response = await fetch(
        "https://bazadedatepd.up.railway.app/inputdatabase",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numar: Input, token: Password }),
        }
      );
      switch (response.status) {
        case 200:
          setShowLogin(false);
          setFeedBack("Numarul a fost adaugat cu succes");
          setTimeout(() => {
            setFeedBack("Introdu un Numar de Imatriculare");
          }, 2500);
          return;
        case 403:
          setFeedBack("Parola Incorecta");
          setTimeout(() => {
            setFeedBack("Introdu un Numar de Imatriculare");
          }, 2500);
          return;
        case 409:
          setFeedBack("Numarul deja se afla in baza de date");
          setTimeout(() => {
            setFeedBack("Introdu un Numar de Imatriculare");
          }, 2500);
          return;
        case 422:
          setFeedBack("Numarul nu este Valid");
          setTimeout(() => {
            setFeedBack("Introdu un Numar de Imatriculare");
          }, 2500);
          return;
      }
    } catch (error) {}
  };
  return (
    <div>
      {ShowLogin ? (
        <div
          className="login"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <button
            onClick={() => {
              setShowLogin(false);
            }}
          >
            X
          </button>
          <div
            style={{
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1 className="logintitle">Login</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                style={{ width: "80%" }}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="button"
                onClick={() => {
                  addToDatabase();
                }}
              >
                Adauga
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className="card animate"
        style={{ backgroundColor: Background, padding: "20px" }}
      >
        <h1 className="title">Vine Garda?</h1>
        <input
          onAnimationEnd={() => {
            setBackground("");
          }}
          type="text"
          name="numar"
          id="numar"
          placeholder="Cauta un Numar"
          value={Input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <div style={{ margin: "10px" }} className="Buttons">
          <button
            style={{ margin: "10px" }}
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Adauga
          </button>
          <button
            onClick={() => {
              checkInputInDatabase();
              setTimeout(() => {
                setFeedBack("Introdu un Numar de Imatriculare");
              }, 2500);
            }}
          >
            Cauta
          </button>
        </div>
        <div>{FeedBack}</div>
      </div>
    </div>
  );
}

export default App;
