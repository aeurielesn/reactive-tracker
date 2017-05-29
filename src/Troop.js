import React, { Component } from 'react';

class Troop extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const level = e.target.value;
    this.props.onLevelChange(this.props.troopSpec.name, +level);
  }

  render() {
    const troopSpec = this.props.troopSpec;
    const troopSpecName = troopSpec.name;
    const troopLevel = this.props.village[troopSpecName] ? this.props.village[troopSpecName] : 0;
    const builderHallLevel = this.props.village.builderHall ? this.props.village.builderHall : 1;
    const builderBarracksLevel = this.props.village.builderBarracks0 ? this.props.village.builderBarracks0 : 0;
    const builderBarracksMinLevel = troopSpec.builderBarracks;
    const starLaboratoryLevel = this.props.village.starLaboratory0 ? this.props.village.starLaboratory0 : 0;
    const starLaboratoryMaxLevel = this.props.starLaboratorySpec.levels[builderHallLevel];
    const troopDisplayName = troopSpec.displayName;
    const troopMaxLevel = troopSpec.levels[Math.min(starLaboratoryLevel, starLaboratoryMaxLevel)];

    let lock = null;
    let disabled = false;
    let levels = <span>({troopLevel}/{troopMaxLevel})</span>;
    if(troopMaxLevel === 0 || builderBarracksLevel < builderBarracksMinLevel) {
      disabled = true;
      lock = <span role="img" aria-label="locked">&#x1f512;</span>;
      levels = null;
    }

    return (
      <label>
        {troopDisplayName}:
        <input
          value={troopLevel}
          type="number"
          disabled={disabled}
          onChange={this.handleChange} />
        {lock}
        {levels}
      </label>
    );
  }
}

export default Troop;
