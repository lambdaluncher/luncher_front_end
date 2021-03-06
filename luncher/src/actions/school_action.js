import axios from 'axios';


export const GET_ALLSCHOOLS_START = 'GET_ALLSCHOOLS_START ';
export const GET_ALLSCHOOLS_SUCCESS = 'GET_ALLSCHOOLS_SUCCESS';
export const GET_ALLSCHOOLS_FAILURE = 'GET_ALLSCHOOLS_FAILURE';

export const GET_SCHOOLDATA_START = 'GET_SCHOOLDATA_START';
export const GET_SCHOOLDATA_SUCCESS = 'GET_SCHOOLDATA_SUCCESS';
export const GET_SCHOOLDATA_FAILURE = 'GET_SCHOOLDATA_FAILURE';

export const GET_DONORVIEW_START = 'GET_DONORVIEW_START';
export const GET_DONORVIEW_SUCCESS = 'GET_DONORVIEW_SUCCESS';
export const GET_DONORVIEW_FAILURE = 'GET_DONORVIEW_FAILURE';

export const GET_DONORVIEWDATA_START = 'GET_DONORVIEWDATA_START';
export const GET_DONORVIEWDATA_SUCCESS = 'GET_DONORVIEWDATA_SUCCESS';
export const GET_DONORVIEWDATA_FAILURE = 'GET_DONORVIEWDATA_FAILURE';

export const DELETE_SCHOOL_START = 'DELETE_SCHOOL_START';
export const DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS';
export const DELETE_SCHOOL_FAILURE = 'DELETE_SCHOOL_FAILURE';

export const ADD_SCHOOL_START = 'ADD_SCHOOL_START';
export const ADD_SCHOOL_SUCCESS = 'ADD_SCHOOL_SUCCESS';
export const ADD_SCHOOL_FAILURE = 'ADD_SCHOOL_FAILURE';

export const SCHOOL_EDIT_START = 'SCHOOL_EDIT_START';
export const SCHOOL_EDIT_SUCCESS = 'SCHOOL_EDIT_SUCCESS';
export const SCHOOL_EDIT_FAILURE = 'SCHOOL_EDIT_FAILURE';

export const getDonorSchools = () => dispatch => {
	dispatch({ type: GET_DONORVIEW_START });

	axios
		.get(`https://api.lambda-luncher.com/donorView`)
		.then(res => dispatch({ type: GET_DONORVIEW_SUCCESS, payload: res }))
		.catch(err => dispatch({ type: GET_DONORVIEW_FAILURE, payload: err }));
};

export const getDonorSchoolsData = id => dispatch => {
	dispatch({ type: GET_DONORVIEWDATA_START });
  
  axios
    .get(`https://api.lambda-luncher.com/donorView/${id}`)
		.then(res => dispatch({ type: GET_DONORVIEWDATA_SUCCESS, payload: res.data[0] }))
		.catch(err => dispatch({ type: GET_DONORVIEWDATA_FAILURE, payload: err }));
};

export const getAllSchools = (userToken) => dispatch => {
	dispatch({ type: GET_ALLSCHOOLS_START });
	axios({
		method: 'get',
		url: `https://api.lambda-luncher.com/schools`,
		headers: { Authorization: userToken }
	})
	.then(res => dispatch({ type: GET_ALLSCHOOLS_SUCCESS, payload: res }))
	.catch(err => dispatch({ type: GET_ALLSCHOOLS_FAILURE, payload: err }));
};

export const getSchoolData = id => dispatch => {
	dispatch({ type: GET_SCHOOLDATA_START });
  
  axios
    .get(`https://api.lambda-luncher.com/schools/${id}`)
		.then(res => dispatch({ type: GET_SCHOOLDATA_SUCCESS, payload: res.data }))
		.catch(err => dispatch({ type: GET_SCHOOLDATA_FAILURE, payload: err }));
};

export const addSchool = (userToken, school) => dispatch => {
	dispatch({ type: ADD_SCHOOL_START });
	axios({
		method: 'post',
		url: `https://api.lambda-luncher.com/schools`,
		headers: { Authorization: userToken },
		data: {
      schoolName: school.schoolName,
			fundsRequested: school.fundsRequested,
			schoolAddress: school.schoolAddress
    },
	})
		.then(res => {
			dispatch({ type: ADD_SCHOOL_SUCCESS, payload: res.data });
			dispatch({ type: GET_ALLSCHOOLS_START });
			axios({
				method: 'get',
				url: `https://api.lambda-luncher.com/schools`,
			})
				.then(res => dispatch({ type: GET_ALLSCHOOLS_SUCCESS, payload: res }))
				.catch(err => dispatch({ type: GET_ALLSCHOOLS_FAILURE, payload: err }));
		})
		.catch(err => dispatch({ type: ADD_SCHOOL_FAILURE, payload: err }));
};

export const deleteSchool = (userToken, schoolID) => dispatch => {
	dispatch({ type: DELETE_SCHOOL_START });
	axios({
		method: 'delete',
		url: `https://api.lambda-luncher.com/schools/${schoolID}`,
		headers: { Authorization: userToken }
	})
		.then(res => {
			dispatch({ type: DELETE_SCHOOL_SUCCESS, payload: res });
			dispatch({ type: GET_ALLSCHOOLS_START });
			axios({
				method: 'get',
				url: `https://api.lambda-luncher.com/schools`,
			})
				.then(res => dispatch({ type: GET_ALLSCHOOLS_SUCCESS, payload: res }))
				.catch(err => dispatch({ type: GET_ALLSCHOOLS_FAILURE, payload: err }));
		})
		.catch(err => dispatch({ type: DELETE_SCHOOL_FAILURE, payload: err }));
};

export const schoolEdit = (userToken, info, id) => dispatch => {
	dispatch({ type: SCHOOL_EDIT_START });
	axios({
		method: 'put',
		url: `https://api.lambda-luncher.com/schools/${id}`,
		headers: { Authorization: userToken },
		data: {
      schoolName: info.schoolName,
      schoolAddress: info.schoolAddress,
      fundsRequested: info.fundsRequested
    }
	})
		.then(res => {
			dispatch({ type: SCHOOL_EDIT_SUCCESS, payload: res });
			dispatch({ type: GET_SCHOOLDATA_START });
			axios({
				method: 'get',
				url: `https://api.lambda-luncher.com/schools/${id}`,
			})
        .then(res => dispatch({ type: GET_SCHOOLDATA_SUCCESS, payload: res.data }))
        .catch(err => dispatch({ type: GET_SCHOOLDATA_FAILURE, payload: err }));
		})
		.catch(err => dispatch({ type: SCHOOL_EDIT_FAILURE, payload: err }));
};