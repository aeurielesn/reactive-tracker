import React, { Component } from 'react';

class Building extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(buildingSpecName) {
    return function(e) {
      const level = e.target.value;
      this.props.onLevelChange(buildingSpecName, +level);
    }.bind(this);
  }

  render() {
    const buildingSpec = this.props.buildingSpec;
    const builderHallLevel = this.props.village.builderHall ? this.props.village.builderHall : 0;
    const buildingAvailability = buildingSpec.availability[builderHallLevel];
    const buildingMaxAvailability = buildingSpec.availability[buildingSpec.availability.length - 1];

    let buildings = []
    for (let i = 0; i < buildingMaxAvailability; ++i) {
      const buildingSpecName = buildingSpec.name + i;
      const buildingLevel = this.props.village[buildingSpecName] ? this.props.village[buildingSpecName] : 0;
      const buildingDisplayName = (buildingMaxAvailability > 1) ? buildingSpec.displayName + " #" + (i + 1) : buildingSpec.displayName;
      const buildingMaxLevel = buildingSpec.levels[builderHallLevel];

      let disabled = true;
      let lock = <span role="img" aria-label="locked">&#x1f512;</span>;
      let levels = null;

      // console.log(buildingSpecName, buildingAvailability);
      if(i < buildingAvailability) {
        disabled = false;
        lock = null;
        levels = <span>({buildingLevel}/{buildingMaxLevel})</span>;
      }

      buildings.push((
        <div key={buildingSpecName}>
          <label>
            {buildingDisplayName}:
            <input
              value={buildingLevel}
              type="number"
              disabled={disabled}
              onChange={this.handleChange(buildingSpecName)} />
            {lock}
            {levels}
          </label>
        </div>
      ));
    }

    return (
      <div>
        {buildings}
      </div>
    );
  }
}

export default Building;
