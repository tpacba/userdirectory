import React from 'react';
import EmployeeCard from './components/EmployeeCard';
import Wrapper from './components/Wrapper';
import Title from './components/Title';
import Buttons from './components/Buttons';
import Dropdown from './components/Dropdown'
import API from "./utils/API";

class App extends React.Component {
  state = {
    results: [],
    filterResults: []
  };

  compare_last = (a, b) => {
    if (a.name.last < b.name.last) {
      return -1;
    } else if (a.name.last > b.name.last) {
      return 1;
    } else {
      return 0;
    }
  }

  componentDidMount() {
    API.results()
      .then(response => {
        const results = response.data.results.sort(this.compare_last)
        this.setState({
          results: results
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  sortLastName = {
    forward: () => {
      const forwardResults = this.state.results.sort(this.compare_last);
      this.setState({
        results: forwardResults
      })
    },
    reverse: () => {
      const reverseResults = this.state.results.sort(this.compare_last).reverse();
      this.setState({
        results: reverseResults
      })
    }
  }

  filterByState = () => {
    let chosen = document.getElementById("inputState").value;
    const filterResults = this.state.results.filter(item => item.location.state === chosen);
    if (filterResults.length === 0) {
      alert("No matches!");
    }
    this.setState({
      filterResults: filterResults
    })
  }

  render() {
    let card;
    if (this.state.filterResults.length > 0) {
      card = <EmployeeCard
      results={this.state.filterResults}
      />
    } else {
      card = <EmployeeCard
      results={this.state.results}
      />
    }

    return (
      <Wrapper>
        <Buttons
          sortLastName={this.sortLastName}
        />
        <Dropdown 
        filterByState={this.filterByState}/>
        <Title>Employee List</Title>
        {card}
      </Wrapper>
    );
  }
}

export default App;