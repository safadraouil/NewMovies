import React from "react";
import "./Datepiker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import PropTypes from "prop-types";
import { Button, Header, Modal } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

import moment from "moment";

class ModalFilterList extends React.Component {
  static propTypes = {
    target: PropTypes.string,
    dateFormat: PropTypes.string,
    onDayChange: PropTypes.func,
    showFilter: PropTypes.bool,
    handleClickSearch: PropTypes.func,
    toggelModalFavorit: PropTypes.func
  };
  FORMAT = "YYYY-MM-DD";
  constructor(props) {
    super(props);

    this.state = {
      to: undefined,
      from: undefined,
      dateFormat: "",
      target: ""
    };
  }
  // change value of date in datepicker
  handleDayChange(date, target) {
    //change format date
    const dateFormat = moment(date).format(this.FORMAT);
    //this.setState({ target: target, dateFormat: dateFormat });
    this.setState({ [target]: dateFormat });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.target !== nextProps.target) {
      this.setState({ target: nextProps.target });
    }
    if (this.state.dateFormat !== nextProps.dateFormat) {
      this.setState({ dateFormat: nextProps.dateFormat });
    }
  }
  /* call  handleChangeFilter from movies whene on in filter button */
  handleClickSearch() {
    const { Begin, End } = this.state;
    this.props.handleChangeFilter(Begin, End);
    this.props.toggelModalFavorit();
  }

  render() {
    return (
      <Modal
        open={this.props.showFilter}
        onOpen={this.props.toggelModalFavorit}
        onClose={this.props.toggelModalFavorit}
        size="small"
      >
        <Modal.Header>Filter List Movies</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Filter</Header>
            <p>Filter List Movies 2018</p>
          </Modal.Description>
          <div>
            <div>
              {/*if click datepiker from */}
              From: <br />
              <DayPickerInput
                format={this.FORMAT}
                placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
                onDayClick={this.handleDayClick}
                //initialise  onDayChange to sent it to movies(props)
                onDayChange={date => this.handleDayChange(date, "Begin")}
                selectedDays={"from"}
              />
              {/*if click datepiker to*/}
              <br />
              To: <br />
              <DayPickerInput
                format={this.FORMAT}
                placeholder={`${dateFnsFormat(new Date(), this.FORMAT)}`}
                onDayClick={this.handleDayClick}
                onDayChange={date => this.handleDayChange(date, "End")}
                selectedDays={"to"}
              />
            </div>
            <br />

            <Icon
              name="search"
              onClick={() => this.handleClickSearch()}
              className="large "
            />
            <Icon
              name="google wallet"
              onClick={this.props.handleClickClear}
              className="large "
            />
          </div>
        </Modal.Content>
        {/* call toggelModalFavorit from movies(parent) in the props to this child*/}
        <Modal.Actions>
          <Button onClick={this.props.toggelModalFavorit}>close ></Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default ModalFilterList;
