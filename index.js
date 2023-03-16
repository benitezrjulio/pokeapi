// hacemos la llamada.

const getPokes = async (url) => {
  try {
    const respuesta = await fetch(url);
    const res = await respuesta.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
// despues de crear la funcion 'init' vamos a mapear.
const mapeo = (personajes) => {
  return personajes.map((char) => ({
    nombre: char.name,
    foto: char.sprites.front_default,
    id: char.id,
    tipos: char.types.map((type) => type.type.name).join(" / "),
  }));
};

// vamos a imprimir los pokemons

const pintados = (pintar) => {
  const cart = `
    <div class="cart">

    <div class=cartaName>
      <p>#${pintar.id} </p>
      <h2>${pintar.nombre.toUpperCase()}</h2>
     </div>
    <div class="img">
      <img src= "${pintar.foto}" alt"${pintar.nombre}">
    </div>
    <div class="tipos"> ${pintar.tipos}</div>
    </div>
    `;

  const ol$$ = document.querySelector("#pokedex");
  ol$$.innerHTML += cart;

 };

// creando la funcion de inicio. 'init'
const arryPoke = [];

const inicio = async () => {
  for (let i = 1; i <= 151; i++) {
    const response = await getPokes(`https://pokeapi.co/api/v2/pokemon/${i}`);
    arryPoke.push(response);
  }

  const pokemonPintados = mapeo(arryPoke);

  for (const iterator of pokemonPintados) {
    pintados(iterator);
  }

cogerInput(pokemonPintados);

};

inicio();

const cogerInput = (personajes) => {
  console.log(personajes);
  const input$$ = document.querySelector("input");
  console.log(input$$);

  //le damos evento de escuchar

  input$$.addEventListener("input", () => busqueda(input$$.value, personajes));
};
//le damos filtro

const busqueda = (filtro, personajes) => {
  console.log(personajes);
  let charactersFiltrados = personajes.filter((char) =>
    char.nombre.toLowerCase().includes(filtro)
  );
  // console.log(charactersFiltrados);


  ol$$ = document.querySelector("ol");
  ol$$.innerHTML = "";
  for (const characterrr of charactersFiltrados) {
    pintados(characterrr);
  }
};
