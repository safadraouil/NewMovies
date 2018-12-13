import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Moviesinfo.css";

class Moviesinfo extends Component {
  state = {
    data_mv_auth: [],
    data_mv_auth_info: []
  };
  async componentDidMount() {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.id
      }?api_key=9209bb756d7b55053d4c72ffd1f9ecc8&language=en-US`
    );
    let data_auth = await response.json();

    console.log("movies_data_auth", data_auth);
    this.setState({
      data_mv_auth: data_auth,
      data_mv_auth_info: data_auth.production_companies
    });
  }

  render() {
    let movie, i;
    const { movies, id } = this.props;
    const { data_mv_auth, data_mv_auth_info } = this.state;

    console.log("data_mv_authhhhhhhh", data_mv_auth_info);

    /* select movie from movies with the same id(from target value in app.js) */

    movie = movies.filter(item => item.id === +id)[0];
    console.log("movies", movies);
    console.log("movie", movie);
    if (!movie || !movie.id) return <div>...</div>;

    return (
      <div>
        {/*displaing movie information card*/}
        <ul className="ul1">
          <li key={data_mv_auth.id} className="li1">
            <div className="card1">
              <div>
                <img
                  className="img1"
                  src={this.props.picture + data_mv_auth.poster_path}
                  alt={data_mv_auth.title}
                  key={data_mv_auth.id}
                />
              </div>

              <div className="text1">
                <div>
                  <Link to="/">
                    <h2>{data_mv_auth.title}</h2>
                  </Link>
                  <div>Puplish date : {data_mv_auth.release_date}</div>
                </div>
                <br />
                <br />
                <br />
                <div>{data_mv_auth.overview}</div>
                <br />

                <button class="ui circular facebook icon button">
                  <i class="facebook icon" />
                </button>
                <button class="ui circular twitter icon button">
                  <i class="twitter icon" />
                </button>
                <button class="ui circular linkedin icon button">
                  <i class="linkedin icon" />
                </button>
                <button class="ui circular google plus icon button">
                  <i class="google plus icon" />
                </button>

                <div class="ui labeled button" tabindex="0">
                  <div class="ui red button">
                    <i class="heart icon" /> Like
                  </div>
                  <a class="ui basic red left pointing label">1,048</a>
                </div>
                <div class="ui labeled button" tabindex="0">
                  <div class="ui basic blue button">
                    <i class="fork icon" /> Forks
                  </div>
                  <a class="ui basic left pointing blue label">1,048</a>
                </div>
                <br />
              </div>

              <div />
            </div>
          </li>
        </ul>
        {/*displaing production_companies*/}
        {data_mv_auth_info.map(item => (
          <ul className="ul_info1">
            <li
              key={item.id}
              className="li_info1"
              style={{
                background: `url(${this.props.picture +
                  data_mv_auth.backdrop_path})`
              }}
            >
              <div className="card_info1">
                <div>
                  <img
                    className="img_info1"
                    src={this.props.picture + item.logo_path}
                    alt={item.picture}
                    key={item.id}
                  />
                </div>
                <br />
                <div className="text_info1">
                  <h2>{item.name}</h2>
                  <br />

                  <div>origin_country: {item.origin_country}</div>
                  <br />
                </div>

                <div />
              </div>
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

export default Moviesinfo;