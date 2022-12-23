import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-centered">Amiiboの画像検索</h1>
          <p className="has-text-right">5421071  石川 翼</p>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url.image} className="column is-1">
            <Image src={url.image} />
          </div>
        );
      })}
    </div>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="Super Mario">
              <option value="Super Mario">Super Mario</option>
              <option value="Mario Sports Superstars">Mario Sports Superstars</option>
                <option value="Minecraft">Minecraft</option>
                <option value="Animal Crossing">Animal Crossing</option>
                <option value="Persona">Persona</option>
                <option value="Pokemon">Pokemon</option>
                <option value="Splatoon">Splatoon</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-light">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("Super Mario").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  console.log(urls)
  return (
    <main>
      <section className="section">
        <p className="has-text-centered">このホームページは、日本大学文理学部情報科学科 Webプログラミングの演習課題です。</p>

        <hr></hr>
        <p className="has-text-centered">検索したいamiiboのゲームシリーズを選択してください。</p>
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer(){
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>本ホームページで利用したAmiiboAPIはこちらから確認できます。</p>
        <p>
          <a href="https://www.amiiboapi.com/">Amiibo API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;