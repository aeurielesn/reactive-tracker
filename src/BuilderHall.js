import React, { Component } from 'react';

class BuilderHall extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const level = e.target.value;
    if (level >= 1 && level <= 5) {
      this.props.onLevelChange("builderHall", +level);
    }
  }

  render() {
    const level = this.props.level;
    return (
      <label>
        Builder Hall:
        <input
          value={level}
          type="number"
          min="1"
          max="5"
          onChange={this.handleChange} />
          ({level}/5)
      </label>
    );
  }
}

export default BuilderHall;
