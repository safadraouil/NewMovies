import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import "./Movies.css";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import ModalFilterList from "./ModalFilterList";
import Modalfavoriteliste from "./Modalfavoriteliste";
import isEqual from "lodash/isEqual";
import moment from "moment";
import _ from "lodash";

class Movies extends Component {
  FORMAT = "YYYY-MM-DD";
  static propTypes = {
    data_mv: PropTypes.array,
    FilterMovies: PropTypes.array,
    handelchange: PropTypes.func,
    search_value: PropTypes.string,
    filters: PropTypes.object,
    showFilter: PropTypes.string,
    show: PropTypes.string
  };

  constructor(props) {
    //call props
    super(props);
    this.state = {
      show: false,
      showFilter: false,
      favorit_movies: [],
      data_mv: this.props.data_mv,
      data_mvFilter: this.props.data_mv,
      clear: false,

      filters: {
        to: "",
        from: "",
        tri: false,
        triDec: false
      }
    };
  }

  // call  children Modalfavoriteliste and switch from icon to show modal
  toggelModal = () => {
    this.setState({ show: !this.state.show });
  };
  // chose date filter from datepicker ===> switch save date in the filters object
  toggelModalFavorit = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  handleClickClear = () => {
    this.setState({ filters: { from: "", to: "" } });
    this.toggelModalFavorit();
  };
  handleChangeFilter(from, to) {
    var { filters } = this.state;
    filters.from = from;
    filters.to = to;
    this.setState({ filters });
  }
  //filter date realise  following input datepicker and call methode where initialise  data_mvFilter in render

  doFilter(item, filters, field) {
    let fieldValue = moment(filters[field]).format(this.FORMAT);
    let relasedata = moment(item.release_date).format(this.FORMAT);
    return field === "from"
      ? fieldValue && relasedata >= fieldValue
      : fieldValue && relasedata <= fieldValue;
  }
  HandelTriMovies = data_mvFilter => {
    /*cr*/
    data_mvFilter = _.orderBy(data_mvFilter, "release_date", ["asc"]);
    return data_mvFilter;
  };

  HandelTriMoviesDec = data_mvFilter => {
    data_mvFilter = _.orderBy(data_mvFilter, "release_date", ["desc"]);
    return data_mvFilter;
  };
  // intialise array movies whene  change data_mv
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.data_mv, nextProps.data_mv)) {
      this.setState({ data_mv: nextProps.data_mv });
    }
    if (!isEqual(this.state.data_mvFilter, nextProps.data_mvFilter)) {
      this.setState({ data_mvFilter: nextProps.data_mvFilter });
    }
  }

  render() {
    const { handelchange, search_value, data_mv } = this.props;
    var { filters, tri, triDec } = this.state;
    var data_mvFilter = data_mv;

    if (data_mvFilter) {
      if (filters.from !== "") {
        data_mvFilter = data_mvFilter.filter(item =>
          this.doFilter(item, filters, "from")
        );
      }

      if (filters.to !== "") {
        data_mvFilter = data_mvFilter.filter(item =>
          this.doFilter(item, filters, "to")
        );
      }
    }
    if (tri === true) {
      data_mvFilter = this.HandelTriMovies(data_mvFilter);
    }
    if (triDec === true) {
      data_mvFilter = this.HandelTriMoviesDec(data_mvFilter);
    }

    return (
      <ul>
        <div className="icon">
          {/****************   show List modal  */}
          <Modalfavoriteliste
            show={this.state.show}
            toggelModal={this.toggelModal}
          />
          {/* button list favorit */}
          {/* sent  "toggelModal" to moviesinfoiconnes to change visibility*/}
          <Icon className="list" onClick={this.toggelModal} />
        </div>
        {/****************   show filter modal  */}
        <div className="filter">
          {/* button filter*/}
          <Icon className="filter icon" onClick={this.toggelModalFavorit} />

          <ModalFilterList
            handleChangeFilter={(Begin, End) =>
              //take result { filter, datefrom }Filter (children) with methode handleChangeFilter send to Filter
              this.handleChangeFilter(Begin, End)
            }
            showFilter={this.state.showFilter}
            toggelModalFavorit={this.toggelModalFavorit}
            handleClickClear={this.handleClickClear}
          />
        </div>
        <div className="tri">
          <Icon
            className="sort numeric up icon"
            onClick={() => this.setState({ tri: true })}
          />
        </div>
        <div className="tri">
          <Icon
            className=" sort numeric down icon"
            onClick={() => this.setState({ triDec: true })}
          />
        </div>

        <div>
          <input
            className="input"
            type="text"
            placeholder="Search.."
            onChange={e => handelchange(e)}
            value={search_value}
          />
        </div>

        {/*display all  movies  or filter movies */}

        {data_mvFilter &&
          data_mvFilter.map(movie => (
            <li key={movie.id}>
              <div className="card">
                <div className="img">
                  {/*link whene click in picture and send id in url*/}
                  <Link to={`/Hello/${movie.id}`}>
                    {/*picture :url ,poster_path : api variable*/}
                    <img
                      src={this.props.picture + movie.poster_path}
                      alt={movie.title}
                      key={movie.id}
                    />
                  </Link>
                </div>
                {/*display title + overiew  */}
                <div className="text">
                  <div>
                    {/* id of current movie */}
                    <Link to={`/Moviesinfo/${movie.id}`}>
                      <h2>{movie.title}</h2>
                      <div>Puplish date : {movie.release_date}</div>
                    </Link>
                  </div>
                  <br />

                  <div>{movie.overview}</div>
                  <div className="button_circular">
                    <button className="ui circular facebook icon button">
                      <i className="facebook icon" />
                    </button>
                    <button className="ui circular twitter icon button">
                      <i className="twitter icon" />
                    </button>
                    <button className="ui circular linkedin icon button">
                      <i className="linkedin icon" />
                    </button>
                    <button className="ui circular google plus icon button">
                      <i className="google plus icon" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    );
  }
}

export default Movies;
