import {useEffect, useState} from "react";

import {getPokemon, isPokemon} from "./helpers";
import {FormValues, Stats} from "./types";

const initPokemon = await getPokemon();

function App() {
  const [stats, setStats] = useState({
    success: 0,
    errors: 0,
    pokemon: initPokemon,
    isSuccess: false,
  } as Stats);
  const [formValues, setFormValues] = useState({name: ""} as FormValues);
  const [animate, setAnimate] = useState({img: false, error: false});
  const {name, image} = stats.pokemon;

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("stats");

    if (dataFromLocalStorage) {
      setStats(JSON.parse(dataFromLocalStorage));
    }
  }, [setStats]);

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setFormValues({...formValues, [name]: value});
  };

  const handleClick = async () => {
    if (formValues.name === "") return;
    const res = isPokemon(stats.pokemon.name, formValues.name);

    if (!res) {
      setTimeout(() => {
        setAnimate((a) => ({...a, error: true}));
      }, 200);
    }
    setAnimate((a) => ({...a, error: false}));

    setStats({
      ...stats,
      success: res ? stats.success + 1 : stats.success,
      errors: res ? stats.errors : stats.errors + 1,
      isSuccess: res ? true : false,
    });
  };

  const handleNewPokemon = async () => {
    const newPokemon = await getPokemon();

    setStats({
      ...stats,
      pokemon: newPokemon,
      isSuccess: false,
    });
    setFormValues({name: ""});
    setAnimate({img: false, error: false});
  };

  const handleReset = async () => {
    const newPokemon = await getPokemon();

    setStats({
      success: 0,
      errors: 0,
      pokemon: newPokemon,
      isSuccess: false,
    });
    setFormValues({name: ""});
    setAnimate({img: false, error: false});
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimate((a) => ({...a, img: true}));
    }, 300);
    setAnimate((a) => ({...a, img: false}));
  }, [stats.pokemon]);

  return (
    <div className="nes-container with-title is-centered">
      <p className="title">Quíen es este pokemon?</p>
      <section className="icon-list">
        <i className="nes-icon coin is-small" />
        <span> Aciertos:{stats.success}</span>
        <br />
        <i className="nes-icon close is-small" />
        <span> Errores:{stats.errors}</span>
      </section>

      <img
        className={`${stats.isSuccess ? "" : "img-hide"} ${
          animate.img && "animate__animated animate__tada"
        }`}
        src={image}
        width="250px"
      />

      <p>{name}</p>

      <div
        className={`nes-field ${animate.error && "animate__animated animate__flash"}`}
        style={{
          backgroundColor: animate.error ? "red" : "#212529",
          padding: "0.1rem",
        }}
      >
        <input
          autoComplete="off"
          className="nes-input"
          name="name"
          placeholder="..."
          type="text"
          value={`${stats.isSuccess ? "Correcto!!" : formValues.name}`}
          onChange={handleInputChange}
        />
      </div>

      <div style={{marginTop: "10px"}}>
        {!stats.isSuccess ? (
          <button className={`nes-btn is-primary`} type="button" onClick={handleClick}>
            Adivinar
          </button>
        ) : (
          <button className={`nes-btn is-success`} type="button" onClick={handleNewPokemon}>
            Jugar de nuevo
          </button>
        )}
      </div>
      <button className="nes-btn" style={{marginTop: "10px"}} onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
