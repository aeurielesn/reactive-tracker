import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const hours = 60, days = 24 * hours;

const specs = {
  "Defense": {
    "cannon": {
      "name": "cannon",
      "displayName": "Cannon",
      "levels": [0, 1, 1, 3, 4, 5],
      "gold": [0, 10000, 20000, 50000, 200000, 600000],
      "time": [0, 1, 5, 2 * hours, 8 * hours, 1 * days],
      "availability": [0, 1, 1, 2, 2, 2],
    },
    "archerTower": {
      "name": "archerTower",
      "displayName": "Archer Tower",
      "levels": [0, 0, 1, 3, 4, 5],
      "gold": [0, 12000, 30000, 60000, 250000, 800000],
      "time": [0, 5, 15, 2 * hours, 8 * hours, 1 * days],
      "availability": [0, 0, 1, 1, 2, 2],
    },
    "doubleCannon": {
      "name": "doubleCannon",
      "displayName": "Double Cannon",
      "levels": [0, 0, 1, 3, 4, 5],
      "gold": [0, 20000, 50000, 80000, 300000, 900000],
      "time": [0, 10, 1 * hours, 3 * hours, 12 * hours, 1 * days],
      "availability": [0, 0, 1, 1, 1, 2],
    },
    "firecrackers": {
      "name": "firecrackers",
      "displayName": "Firecrackers",
      "levels": [0, 0, 0, 3, 4, 5],
      "gold": [0, 30000, 80000, 120000, 300000, 800000],
      "time": [0, 15, 2 * hours, 4 * hours, 12 * hours, 1 * days],
      "availability": [0, 0, 0, 1, 1, 2],
    },
    "crusher": {
      "name": "crusher",
      "displayName": "Crusher",
      "levels": [0, 0, 0, 2, 4, 5],
      "gold": [0, 120000, 180000, 220000, 850000, 1200000],
      "time": [0, 2 * hours, 5 * hours, 12 * hours, 1 * days, 2 * days],
      "availability": [0, 0, 0, 1, 1, 1],
    },
    "hiddenTesla": {
      "name": "hiddenTesla",
      "displayName": "Hidden Tesla",
      "levels": [0, 0, 0, 3, 4, 5],
      "gold": [0, 50000, 100000, 150000, 280000, 700000],
      "time": [0, 30, 3 * hours, 5 * hours, 10 * hours, 1 * days],
      "availability": [0, 0, 0, 1, 1, 1],
    },
  },
  "Resource": {
    "clockTower": {
      "name": "clockTower",
      "displayName": "Clock Tower",
      "levels": [0, 0, 0, 0, 4, 5],
      "gold": [0, 150000, 180000, 220000, 300000, 700000],
      "time": [0, 2 * hours, 3 * hours, 4 * hours, 6 * hours, 8 * hours],
      "availability": [0, 0, 0, 0, 1, 1],
    },
    "elixirCollector": {
      "name": "elixirCollector",
      "displayName": "Elixir Collector",
      "levels": [0, 1, 1, 3, 4, 5],
      "gold": [0, 1000, 5000, 10000, 30000, 60000],
      "time": [0, 10, 20, 40, 2 * hours, 5 * hours],
      "availability": [0, 1, 1, 1, 1, 2],
    },
    "goldMine": {
      "name": "goldMine",
      "displayName": "Gold Mine",
      "levels": [0, 1, 1, 3, 4, 5],
      "elixir": [0, 1000, 5000, 10000, 30000, 60000],
      "time": [0, 10, 20, 40, 2 * hours, 5 * hours],
      "availability": [0, 1, 1, 1, 1, 2],
    },
    "elixirStorage": {
      "name": "elixirStorage",
      "displayName": "Elixir Storage",
      "levels": [0, 0, 0, 2, 4, 5],
      "gold": [0, 20000, 80000, 200000, 300000, 600000],
      "time": [0, 30, 1 * hours, 3 * hours, 6 * hours, 8 * hours],
      "availability": [0, 0, 0, 1, 1, 2],
    },
    "goldStorage": {
      "name": "goldStorage",
      "displayName": "Gold Storage",
      "levels": [0, 0, 0, 2, 4, 5],
      "elixir": [0, 20000, 80000, 200000, 300000, 600000],
      "time": [0, 30, 1 * hours, 3 * hours, 6 * hours, 8 * hours],
      "availability": [0, 0, 0, 1, 1, 2],
    },
  },
  "Army": {
    "builderBarracks": {
      "name": "builderBarracks",
      "displayName": "Builder Barracks",
      "levels": [0, 1, 2, 3, 3, 4],
      "elixir": [0, 1000, 4000, 10000, 25000, 100000],
      "time": [0, 0, 1, 10, 30, 3 * hours],
      "availability": [0, 1, 1, 1, 1, 1],
    },
    "armyCamp": {
      "name": "armyCamp",
      "displayName": "Army Camp",
      "levels": [0, 1, 1, 1, 1, 1],
      "elixir": [0, 10000, 0, 0, 0, 0],
      "time": [0, 60, 0, 0, 0, 0],
      "availability": [0, 1, 2, 3, 4, 4],
    },
    "starLaboratory": {
      "name": "starLaboratory",
      "displayName": "Star Laboratory",
      "levels": [0, 1, 2, 3, 4, 5],
      "elixir": [0, 1000, 15000, 50000, 300000, 700000],
      "time": [0, 0, 10, 30, 8 * hours, 12 * hours],
      "availability": [0, 1, 1, 1, 1, 1],
    },
    "battleMachine": {
      "name": "battleMachine",
      "displayName": "Battle Machine",
      "levels": [0, 0, 0, 0, 0, 5],
      "elixir": [0, 900000, 1000000, 1100000, 1200000, 1300000],
      "time": [0, 12 * hours, 12 * hours, 12 * hours, 1 * days, 1 * days],
      "availability": [0, 0, 0, 0, 0, 1],
    }
  },
  "Traps": {
    "pushTrap": {
      "name": "pushTrap",
      "displayName": "Push Trap",
      "levels": [0, 0, 1, 3, 4, 5],
      "gold": [0, 1000, 3000, 10000, 20000, 40000],
      "time": [0, 2, 5, 20, 2 * hours, 4 * hours],
      "availability": [0, 0, 1, 2, 3, 4],
    },
    "springTrap": {
      "name": "springTrap",
      "displayName": "Spring Trap",
      "levels": [0, 0, 0, 1, 2, 2],
      "gold": [0, 10000, 30000],
      "time": [0, 30, 1 * hours],
      "availability": [0, 0, 0, 2, 2, 3],
    },
    "mine": {
      "name": "mine",
      "displayName": "Mine",
      "levels": [0, 0, 0, 3, 4, 5],
      "gold": [0, 5000, 8000, 12000, 25000, 50000],
      "time": [0, 10, 20, 30, 1 * hours, 2 * hours],
      "availability": [0, 0, 0, 2, 3, 4],
    },
  }
};

const troops = {
  "ragedBarbarian0": {
    "name": "ragedBarbarian0",
    "displayName": "Raged Barbarian",
    "levels": [0, 2, 4, 6, 8, 10],
    "elixir": [0, 0, 3500, 6000, 9000, 50000, 100000, 300000, 330000, 700000, 900000],
    "time": [0, 0, 0, 5, 15, 3 * hours, 6 * hours, 1 * days, 1 * days, 2 * days, 2 * days],
  },
  "sneakyArcher0": {
    "name": "sneakyArcher0",
    "displayName": "Sneaky Archer",
    "levels": [0, 2, 4, 6, 8, 10],
    "elixir": [0, 0, 5000, 8000, 12000, 60000, 120000, 320000, 350000, 800000, 1000000],
    "time": [0, 0, 3, 10, 30, 4 * hours, 6 * hours, 1 * days, 1 * days, 2 * days, 2 * days],
  },
  "betaMinion0": {
    "name": "betaMinion0",
    "displayName": "Beta Minion",
    "levels": [0, 0, 2, 4, 6, 8],
    "elixir": [0, 0, 50000, 80000, 120000, 250000, 280000, 320000, 360000],
    "time": [0, 0, 1 * hours, 3 * hours, 5 * hours, 12 * hours, 12 * hours, 1 * days, 1 * days],
  },
  "boxerGiant0": {
    "name": "boxerGiant0",
    "displayName": "Boxer Giant",
    "levels": [0, 1, 2, 4, 8, 10],
    "elixir": [0, 0, 20000, 40000, 60000, 300000, 320000, 340000, 380000, 1000000, 1200000],
    "time": [0, 0, 30, 1 * hours, 2 * hours, 12 * hours, 12 * hours, 1 * days, 2 * days, 2 * days, 3 * days],
  }
};

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
    const townHallLevel = this.props.village.townHall ? this.props.village.townHall : 0;
    const buildingAvailability = buildingSpec.availability[townHallLevel];
    const buildingMaxAvailability = buildingSpec.availability[buildingSpec.availability.length - 1];

    let buildings = []
    for (let i = 0; i < buildingMaxAvailability; ++i) {
      const buildingSpecName = buildingSpec.name + i;
      const buildingLevel = this.props.village[buildingSpecName] ? this.props.village[buildingSpecName] : 0;
      const buildingDisplayName = (buildingMaxAvailability > 1) ? buildingSpec.displayName + " #" + (i + 1) : buildingSpec.displayName;
      const buildingMaxLevel = buildingSpec.levels[townHallLevel];

      let disabled = true;
      let lock = <span role="img" aria-label="locked">&#x1f512;</span>;
      let levels = null;

      console.log(buildingSpecName, buildingAvailability);
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
    const townHallLevel = this.props.village.townHall ? this.props.village.townHall : 1;
    const starLaboratoryLevel = this.props.village.starLaboratory0 ? this.props.village.starLaboratory0 : 0;
    const starLaboratoryMaxLevel = this.props.starLaboratorySpec.levels[townHallLevel];
    const troopDisplayName = troopSpec.displayName;
    const troopMaxLevel = troopSpec.levels[Math.min(starLaboratoryLevel, starLaboratoryMaxLevel)];

    let lock = null;
    let disabled = false;
    let levels = <span>({troopLevel}/{troopMaxLevel})</span>;
    if(troopMaxLevel === 0) {
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

class TownHall extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const level = e.target.value;
    if (level >= 1 && level <= 5) {
      this.props.onLevelChange("townHall", +level);
    }
  }

  render() {
    const level = this.props.level;
    return (
      <label>
        Town Hall:
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
  const legend = props.legend;
  const specNames = Object.keys(props.troops);
  const listItems = specNames.map((specName) =>
    <div key={specName}>
      <Troop
        troopSpec={props.troops[specName]}
        starLaboratorySpec={props.starLaboratorySpec}
        village={props.village}
        onLevelChange={props.onLevelChange} />
    </div>
  );
  return (
    <fieldset>
      <legend>{legend}</legend>
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
  const townHallLevel = props.village.townHall ? +props.village.townHall : 0;

  let buildingsElixir = 0, buildingsGold = 0, buildingsTime = 0, buildingsGems = 0;
  Object.keys(props.buildingSpecs).forEach((buildingSection) =>
    Object.keys(props.buildingSpecs[buildingSection]).forEach(function(buildingName) {
      const buildingSpec = props.buildingSpecs[buildingSection][buildingName];
      const buildingAvailability = buildingSpec.availability[townHallLevel];
      // const buildingMaxAvailability = buildingSpec.availability[buildingSpec.availability.length - 1];
      const buildingMaxLevel = +buildingSpec.levels[townHallLevel];
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
              console.log(buildingSpecName, i, formatTime(buildingSpec.time[i]), calculateGems(buildingSpec.time[i]));
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
    const starLaboratoryMaxLevel = props.buildingSpecs.Army.starLaboratory.levels[townHallLevel];
    const troopMaxLevel = +troopSpec.levels[Math.min(starLaboratoryLevel, starLaboratoryMaxLevel)];
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

function getVillage() {
  let village = { townHall: 1 }
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
    // this.state = { townHall: 1 };
    this.state = getVillage();
  }

  handleLevelChange(specName, level) {
    let newState = [];
    newState[specName] = level;
    localStorage.setItem(specName, level);
    this.setState(newState);
  }

  render() {
    const level = this.state.townHall;
    const buildingSections = Object.keys(specs).map((buildingSection) =>
      <BuildingList key={buildingSection}
        legend={buildingSection}
        buildings={specs[buildingSection]}
        village={this.state}
        onLevelChange={this.handleLevelChange} />
    );
    return (
      <div>
        <fieldset>
          <TownHall
            level={level}
            onLevelChange={this.handleLevelChange} />
        </fieldset>
        {buildingSections}
        <TroopList
          legend="Troops"
          troops={troops}
          starLaboratorySpec={specs.Army.starLaboratory}
          village={this.state}
          onLevelChange={this.handleLevelChange} />
        <Costs
          buildingSpecs={specs}
          troopSpecs={troops}
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
          <Tracker/>
        </div>
      </div>
    );
  }
}

export default App;
