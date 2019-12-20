import React from 'react';
import { Grid, Form, Table, Label } from 'semantic-ui-react';
import '../style.css';
import { connect } from 'react-redux';
import { getPlanetsData } from '../actions';
import planetLogo from '../assets/planet.jpeg';

class Planets extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchTerm: '',
      planets: [],
      planet: {},
      largestPlanetIndex: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.searchPlanet = this.searchPlanet.bind(this);
    this.onPlanetClick = this.onPlanetClick.bind(this);
  }

  componentDidMount() {
    this.props.getPlanetsData(this.props.url);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fullData.next !== null && this.props.fullData !== prevProps.fullData) {
      this.props.getPlanetsData(this.props.url);
    }
  }

  handleLogout() {
    this.props.history.push("/");
  }

  searchPlanet() {
    if(this.state.searchTerm.length !== 0) {
      let filteredPlanets = this.props.planets.filter(planet => planet.name.startsWith(this.state.searchTerm));
      let highestPopulationPlanet = 0, highestIndex = 0;
      filteredPlanets.forEach((key, index) => {
        if(isNaN(key.population) === false) {
          if(key.population > highestPopulationPlanet) {
            highestPopulationPlanet = key.population;
            highestIndex = index;
          }
        }
      });
      this.setState({ planets: filteredPlanets, largestPlanetIndex: highestIndex });
    } else {
      this.setState({ planets: [], planet: {}, largestPlanetIndex: 0 });
    }
  }

  onPlanetClick(planet) {
    this.setState({ planet });
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value }, this.searchPlanet);
  }

  render() {
    let { planets, planet, largestPlanetIndex } = this.state;
      return (
        <div>
          <Grid>
            <Grid.Column width={4} />
            <Grid.Column width={6}>
              <Form style={{ marginTop: '100px' }} onSubmit={this.onSubmit}>
                <Form.Input
                  inline
                  label="Search for planets"
                  name="search-term"
                  onChange={this.handleChange}
                />
              </Form>
            </Grid.Column>
            <Grid.Column width={6} style={{ marginTop: '100px' }}>
              <Form.Button onClick={this.handleLogout}>Logout!</Form.Button>
            </Grid.Column>
            <Grid.Column width={16} style={{ marginTop: '30px', textAlign: 'center' }}>
              {<ul className="planets">
                {planets && planets.map((planet, index) => (
                  <li key={planet.name} onClick={() => this.onPlanetClick(planet)} style={{backgroundColor: largestPlanetIndex === index ? '#800000c4': 'transparent'}}>
                    <div className="image">
                      <img src={planetLogo} alt="planet" />
                    </div>
                    <div className="overlay">{planet.name}</div>
                  </li>
                ))}
              </ul>}
            </Grid.Column>
            { Object.keys(planet).length > 0 ? <Grid.Column width={16} style={{ margin: '30px', textAlign: 'center' }}>
                  <Table celled>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Rotation Period</Table.HeaderCell>
                        <Table.HeaderCell>Orbital Period</Table.HeaderCell>
                        <Table.HeaderCell>Diameter</Table.HeaderCell>
                        <Table.HeaderCell>Climate</Table.HeaderCell>
                        <Table.HeaderCell>Gravity</Table.HeaderCell>
                        <Table.HeaderCell>Terrain</Table.HeaderCell>
                        <Table.HeaderCell>Surface Water</Table.HeaderCell>
                        <Table.HeaderCell>Population</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>{planet.name}</Label>
                        </Table.Cell>
                        <Table.Cell>{planet.rotation_period}</Table.Cell>
                        <Table.Cell>{planet.orbital_period}</Table.Cell>
                        <Table.Cell>{planet.diameter}</Table.Cell>
                        <Table.Cell>{planet.climate}</Table.Cell>
                        <Table.Cell>{planet.gravity}</Table.Cell>
                        <Table.Cell>{planet.terrain}</Table.Cell>
                        <Table.Cell>{planet.surface_water}</Table.Cell>
                        <Table.Cell>{planet.population}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                </Table>
              </Grid.Column>  : ''   
            }   
          </Grid>
        </div>
      );
  }

}

const mapStateToProps = (state) => {
  return { planets: state.data.planets, url: state.url.url, fullData: state.fullData.dataObject };
};

export default connect(mapStateToProps, { getPlanetsData })(Planets);