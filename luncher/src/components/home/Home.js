import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  getAllSchools,
  // getUserInfo,
  // deleteSchool,
  // addSchool
} from '../../actions';

import { 
  Wrap,
  SchoolForm,
  SchoolName,
  AddSchool
} from '../../styles/index';
import School from '../school/School';

class Home extends Component {
	state = {
		userToken: '',
		schoolname: '',
		donation: '',
		isEditing: false,
    isAdding: false,
    schools: [],
	}

	componentDidMount() {
    let userToken = localStorage.getItem('userToken');
    this.setState({ userToken: userToken });
    this.props.getAllSchools();
		// this.props.getAllSchools(userToken);
    // this.props.getUserInfo(userToken);
	}

	handleChange = e => {
		e.preventDefault();
		this.setState({ [e.target.name] : e.target.value });
	};

	// handleAddSchool = e => {
	// 	e.preventDefault();
	// 	let userToken = localStorage.getItem('userToken');
	// 	let school = { schoolname: this.state.schoolname };
	// 	this.props.addSchool(userToken, school);
	// 	this.props.getAllSchools(userToken);
	// };

	render() {
		return (
			<Wrap>
				{this.state.userToken === null ? (
          this.props.schools.map(school => (
            <School
              key={school.id}
              school={school}
            />
          ))
        ) : (
          <SchoolForm
            name="addSchool"
            onSubmit={e => this.handleAddSchool(e)}>
            <SchoolName
              name="schoolname"
              value={this.state.schoolname}
              required
              onChange={e => this.handleChange(e)}/>
            <AddSchool>Add School</AddSchool>
          </SchoolForm>
        )}
			</Wrap>
		);
	}
}

const mapStateToProps = state => {
  return {
    schools: state.schools,
    getAllSchoolsIsLoading: state.getAllSchoolsIsLoading,
    // user: {
    //   id: state.id,
    //   firstName: state.firstName,
    //   lastName: state.lastName,
    //   username: state.username,
    //   type: state.type,
    //   email: state.email,
    // },
    // username: state.username,
    // schoolAdded: state.schoolAdded,
  };
};

export default connect(
  mapStateToProps,
  {
    getAllSchools,
    // getUserInfo,
    // deleteSchool,
    // addSchool,
  }
)(Home);