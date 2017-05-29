import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { buildingsSpecs, troopsSpecs } from './Specs';
import Building from './Building';
import Troop from './Troop';
import BuilderHall from './BuilderHall';

function BuildingList(props) {
  const legend = props.legend;
  const specNames = Object.keys(props.buildings);
  const listItems = specNames.map((specName) =>
    <Building
      key={specName}
      buildingSpec={props.buildings[specName]}
      village={props.village}
      onLevelChange={props.onLevelChange} />
  );
  return (
    <fieldset>
      <legend>{legend}</legend>
      {listItems}
    </fieldset>
  );
}

function TroopList(props) {
  const specNames = Object.keys(props.troopsSpecs);
  const listItems = specNames.map((specName) =>
    <div key={specName}>
      <Troop
        troopSpec={props.troopsSpecs[specName]}
        starLaboratorySpec={props.starLaboratorySpec}
        village={props.village}
        onLevelChange={props.onLevelChange} />
    </div>
  );
  return (
    <fieldset>
      <legend>Troops</legend>
      {listItems}
    </fieldset>
  );
}

function formatTime(time) {
  const days = Math.floor(time / 1440);
  const hours = Math.floor(time / 60) % 24;
  const minutes = time % 60;
  return (days ? days + 'd ' : '') + (hours ? hours + 'h ' : '') + (minutes ? minutes + 'm' : (!days && !hours) ? '0m ' : '');
}

// 60 seconds (1 min) - 1 gem
// 3600 seconds (1 hour) - 50 gems
// 86400 seconds (1 day) - 500 gems
// 604800 seconds (1 week) - ? gems
function calculateGems(time) {
  let days = 24 * 60;
  let ranges = [1, 60, 1 * days, 7 * days];
  let gems = [1, 50, 500, 5000];
  let total = "?";

  if (time === 0) {
    total = 0;
  }
  else if (time <= ranges[0]) {
    total = gems[0];
  }
  else if (time > ranges[ranges.length - 2]) {
    total = Math.round((time - ranges[ranges.length - 2])/((ranges[ranges.length - 1] - ranges[ranges.length - 2])/(gems[gems.length - 1] - gems[gems.length - 2])) + gems[gems.length - 2]);
  }
  else {
    for (let i = 1; i < ranges.length - 1; i++) {
      if (time <= ranges[i]) {
        return Math.round((time - ranges[i - 1])/((ranges[i] - ranges[i - 1])/(gems[i] - gems[i - 1])) + gems[i - 1]);
      }
    }
  }

  return total;
}

function Costs(props) {
  const builderHallLevel = props.village.builderHall ? +props.village.builderHall : 0;

  let buildingsElixir = 0, buildingsGold = 0, buildingsTime = 0, buildingsGems = 0;
  Object.keys(props.buildingsSpecs).forEach((buildingSection) =>
    Object.keys(props.buildingsSpecs[buildingSection]).forEach(function(buildingName) {
      const buildingSpec = props.buildingsSpecs[buildingSection][buildingName];
      const buildingAvailability = buildingSpec.availability[builderHallLevel];
      // const buildingMaxAvailability = buildingSpec.availability[buildingSpec.availability.length - 1];
      const buildingMaxLevel = +buildingSpec.levels[builderHallLevel];
      for (let i = 0; i < buildingAvailability; ++i) {
        const buildingSpecName = buildingName + i;
        const buildingLevel = props.village[buildingSpecName] ? +props.village[buildingSpecName] : 0;
        if(buildingSpec.gold || buildingSpec.elixir || buildingSpec.time) {
          for (let i = buildingLevel + 1; i <= buildingMaxLevel; i += 1) {
            if(buildingSpec.gold) buildingsGold += buildingSpec.gold[i];
            if(buildingSpec.elixir) buildingsElixir += buildingSpec.elixir[i];
            if(buildingSpec.time) {
              buildingsTime += buildingSpec.time[i];
              buildingsGems += calculateGems(buildingSpec.time[i]);
              // console.log(buildingSpecName, i, formatTime(buildingSpec.time[i]), calculateGems(buildingSpec.time[i]));
            }
          }
        }
      }
    })
  );

  let troopsElixir = 0, troopsGold = 0, troopsTime = 0, troopsGems = 0;
  Object.keys(props.troopSpecs).forEach(function(troopSpecName) {
    const troopSpec = props.troopSpecs[troopSpecName];
    const troopLevel = props.village[troopSpecName] ? +props.village[troopSpecName] : 0;
    const starLaboratoryLevel = props.village.starLaboratory0 ? +props.village.starLaboratory0 : 0;
    const starLaboratoryMaxLevel = props.buildingsSpecs.Army.starLaboratory.levels[builderHallLevel];
    const builderBarracksLevel = props.village.builderBarracks0 ? props.village.builderBarracks0 : 0;
    const builderBarracksMinLevel = troopSpec.builderBarracks;
    const troopMaxLevel = +troopSpec.levels[Math.min(starLaboratoryLevel, starLaboratoryMaxLevel)];
    if(builderBarracksLevel >= builderBarracksMinLevel) {
      if(troopSpec.gold || troopSpec.elixir || troopSpec.time) {
        for (let i = troopLevel + 1; i <= troopMaxLevel; i += 1) {
          // if(troopSpec.gold) troopsGold += troopSpec.gold[i];
          if(troopSpec.elixir) troopsElixir += troopSpec.elixir[i];
          if(troopSpec.time) {
            troopsTime += troopSpec.time[i];
            troopsGems += calculateGems(troopSpec.time[i]);
          }
        }
      }
    }
  });

  return (
    <fieldset>
      <legend>Costs</legend>
      <fieldset>
        <legend>Buildings</legend>
        <div>Gold: {buildingsGold}</div>
        <div>Elixir: {buildingsElixir}</div>
        <div>Time: {formatTime(buildingsTime)}</div>
        <div>Gems (Time): {buildingsGems}</div>
      </fieldset>
      <fieldset>
        <legend>Troops</legend>
        <div>Elixir: {troopsElixir}</div>
        <div>Time: {formatTime(troopsTime)}</div>
        <div>Gems (Time): {troopsGems}</div>
      </fieldset>
      <fieldset>
        <legend>Buildings + Troops</legend>
        <div>Gold: {buildingsGold + troopsGold}</div>
        <div>Elixir: {buildingsElixir + troopsElixir}</div>
        <div>Time: {formatTime(buildingsTime + troopsTime)}</div>
        <div>Gems (Time): {buildingsGems + troopsGems}</div>
      </fieldset>
    </fieldset>
  );
}

function applyMigrations() {
  // townHall -> builderHall
  let townHall = localStorage.getItem("townHall")
  if (townHall !== null) {
    localStorage.removeItem("townHall")
    localStorage.setItem("builderHall", townHall)
  }
}

function getVillage() {
  let village = { builderHall: 1 }
  applyMigrations();
  for (let i = 0, len = localStorage.length; i < len; ++i) {
    village[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
  }
  // console.log(village);
  return village;
}

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    // this.state = { builderHall: 1 };
    this.state = getVillage();
  }

  handleLevelChange(specName, level) {
    let newState = [];
    newState[specName] = level;
    localStorage.setItem(specName, level);
    this.setState(newState);
  }

  render() {
    const level = this.state.builderHall;
    const buildingSections = Object.keys(this.props.buildingsSpecs).map((buildingSection) =>
      <BuildingList key={buildingSection}
        legend={buildingSection}
        buildings={this.props.buildingsSpecs[buildingSection]}
        village={this.state}
        onLevelChange={this.handleLevelChange} />
    );
    return (
      <div>
        <fieldset>
          <BuilderHall
            level={level}
            onLevelChange={this.handleLevelChange} />
        </fieldset>
        {buildingSections}
        <TroopList
          troopsSpecs={this.props.troopsSpecs}
          starLaboratorySpec={this.props.buildingsSpecs.Army.starLaboratory}
          village={this.state}
          onLevelChange={this.handleLevelChange} />
        <Costs
          buildingsSpecs={this.props.buildingsSpecs}
          troopSpecs={this.props.troopsSpecs}
          village={this.state} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Reactive Tracker</h2>
          </div>
        </div>
        <div>
          <Tracker
            buildingsSpecs={buildingsSpecs}
            troopsSpecs={troopsSpecs} />
        </div>
      </div>
    );
  }
}

export default App;
