import { all, delay, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";
import {
  FRIENDS_MAIN_READ_REQUEST,
  FRIENDS_MAIN_READ_SUCCESS,
  FRIENDS_MAIN_READ_FAILURE,
  FRIENDS_MAIN_SEARCH_REQUEST,
  FRIENDS_MAIN_SEARCH_SUCCESS,
  FRIENDS_MAIN_SEARCH_FAILURE,
  FRIENDS_BLOCK_REQUEST,
  FRIENDS_BLOCK_SUCCESS,
  FRIENDS_BLOCK_FAILURE,
  FRIENDS_BLOCK_READ_REQUEST,
  FRIENDS_BLOCK_READ_SUCCESS,
  FRIENDS_BLOCK_READ_FAILURE,
  FRIENDS_BLOCK_UPDATE_REQUEST,
  FRIENDS_BLOCK_UPDATE_SUCCESS,
  FRIENDS_BLOCK_UPDATE_FAILURE,
  FRIENDS_ADD_READ_REQUEST,
  FRIENDS_ADD_READ_SUCCESS,
  FRIENDS_ADD_READ_FAILURE,
  FRIENDS_ADD_SEARCH_REQUEST,
  FRIENDS_ADD_SEARCH_SUCCESS,
  FRIENDS_ADD_SEARCH_FAILURE,
  FRIENDS_ADD_ADD_REQUEST,
  FRIENDS_ADD_ADD_SUCCESS,
  FRIENDS_ADD_ADD_FAILURE,
  FRIENDS_RQ_READ_REQUEST,
  FRIENDS_RQ_READ_SUCCESS,
  FRIENDS_RQ_READ_FAILURE,
  FRIENDS_RQ_ADD_REQUEST,
  FRIENDS_RQ_ADD_SUCCESS,
  FRIENDS_RQ_ADD_FAILURE,
  FRIENDS_PROFILE_READ_REQUEST,
  FRIENDS_PROFILE_READ_SUCCESS,
  FRIENDS_PROFILE_READ_FAILURE,
  FRIENDS_PROFILE_ADD_REQUEST,
  FRIENDS_PROFILE_ADD_SUCCESS,
  FRIENDS_PROFILE_ADD_FAILURE
} from "../reducers/friends";

// const dev = process.env.NODE_ENV !== "production";
// const prod = process.env.NODE_ENV === "production";

// if (prod) {
//   axios.defaults.baseURL = "https://api.remindfeedback.com/";
// } else if (dev) {
//   axios.defaults.baseURL = "http://localhost:3000";
// }

// 친구 프로필 Add
function friends_Pro_Add_API(data) {
  // return axios.post('/#');
}

function* friends_Pro_Add(action) {
  try {
    yield delay(2000);
    yield call(friends_Pro_Add_API, action.data);
    yield put({
      type: FRIENDS_PROFILE_ADD_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_PROFILE_ADD_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Pro_Add() {
  yield takeLatest(FRIENDS_PROFILE_ADD_REQUEST, friends_Pro_Add);
}

// 친구 프로필 Read
function friends_Pro_Read_API() {
  // return axios.get('/#');
}

function* friends_Pro_Read() {
  try {
    yield delay(2000);
    yield call(friends_Pro_Read_API);
    yield put({
      type: FRIENDS_PROFILE_READ_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_PROFILE_READ_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Pro_Read() {
  yield takeLatest(FRIENDS_PROFILE_READ_REQUEST, friends_Pro_Read);
}

// 친구 요청 모달 Add
function friends_Req_Add_API(data) {
  if (data.check === "accept") {
    return axios.post("/friends", data, {
      withCredentials: true
    });
  } else {
    return axios.patch(`/friends/rejection/${data.friend_id}`, data, {
      withCredentials: true
    });
  }
}

function* friends_Req_Add(action) {
  try {
    const result = yield call(friends_Req_Add_API, action.data);
    console.log(result.data, "친구요청모달 추가");
    yield put({
      type: FRIENDS_RQ_ADD_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_RQ_ADD_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Req_Add() {
  yield takeLatest(FRIENDS_RQ_ADD_REQUEST, friends_Req_Add);
}

// 친구 요청 모달 Read
function friends_Req_Read_API() {
  return axios.get("/friends/reception", {
    withCredentials: true
  });
}

function* friends_Req_Read() {
  try {
    const result = yield call(friends_Req_Read_API);
    console.log(result.data, "친구요청모달Read");
    yield put({
      type: FRIENDS_RQ_READ_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_RQ_READ_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Req_Read() {
  yield takeLatest(FRIENDS_RQ_READ_REQUEST, friends_Req_Read);
}

// 친구 추가 모달 Add
function friends_Add_Add_API(data) {
  return axios.post("/friends", data, {
    withCredentials: true
  });
}

function* friends_Add_Add(action) {
  try {
    const result = yield call(friends_Add_Add_API, action.data);
    yield put({
      type: FRIENDS_ADD_ADD_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_ADD_ADD_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Add_Add() {
  yield takeLatest(FRIENDS_ADD_ADD_REQUEST, friends_Add_Add);
}

// 친구 추가 모달 Search
function friends_Add_Search_API(data) {
  return axios.post("/friends/search", data, {
    withCredentials: true
  });
}

function* friends_Add_Search(action) {
  try {
    const result = yield call(friends_Add_Search_API, action.data);
    console.log(result, "Search");
    yield put({
      type: FRIENDS_ADD_SEARCH_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_ADD_SEARCH_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Add_Search() {
  yield takeLatest(FRIENDS_ADD_SEARCH_REQUEST, friends_Add_Search);
}

// 친구 추가 모달 Read
function friends_Add_Read_API() {
  return axios.get("/friends/transmission", {
    withCredentials: true
  });
}

function* friends_Add_Read() {
  try {
    const result = yield call(friends_Add_Read_API);
    yield put({
      type: FRIENDS_ADD_READ_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_ADD_READ_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Add_Read() {
  yield takeLatest(FRIENDS_ADD_READ_REQUEST, friends_Add_Read);
}

// 친구 차단 목록 READ
function friends_Block_Read_API() {
  return axios.get("/friends/block", {
    withCredentials: true
  });
}

function* friends_Block_Read() {
  try {
    const result = yield call(friends_Block_Read_API);
    console.log(result.data, "friends_Block_Read");
    yield put({
      type: FRIENDS_BLOCK_READ_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_BLOCK_READ_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Block_Read() {
  yield takeLatest(FRIENDS_BLOCK_READ_REQUEST, friends_Block_Read);
}

// 친구 차단 ADD
function friends_Block_API(data) {
  return axios.patch(`/friends/block/${data.friend_id}`, data, {
    withCredentials: true
  });
}

function* friends_Block(action) {
  try {
    const result = yield call(friends_Block_API, action.data);
    console.log(result.data, "friends_Block");
    yield put({
      type: FRIENDS_BLOCK_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_BLOCK_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Block() {
  yield takeLatest(FRIENDS_BLOCK_REQUEST, friends_Block);
}

// 친구 차단 목록 Update
function friends_Block_Update_API(data) {
  return axios.patch(`/friends/unblock/${data.friend_id}`, data, {
    withCredentials: true
  });
}

function* friends_Block_Update(action) {
  try {
    const result = yield call(friends_Block_Update_API, action.data);
    console.log(result.data, "friends_Block_Update");
    yield put({
      type: FRIENDS_BLOCK_UPDATE_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_BLOCK_UPDATE_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Block_Update() {
  yield takeLatest(FRIENDS_BLOCK_UPDATE_REQUEST, friends_Block_Update);
}

// 친구 메인창 Search
function friends_Search_API(data) {
  // return axios.get('/#');
}

function* friends_Search(action) {
  try {
    yield delay(2000);
    yield call(friends_Search_API, action.data);
    yield put({
      type: FRIENDS_MAIN_SEARCH_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_MAIN_SEARCH_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Search() {
  yield takeLatest(FRIENDS_MAIN_SEARCH_REQUEST, friends_Search);
}

// 친구 메인창 Read
function friends_Read_API() {
  return axios.get("/friends", {
    withCredentials: true
  });
}

function* friends_Read() {
  try {
    yield delay(100);
    const result = yield call(friends_Read_API);
    yield put({
      type: FRIENDS_MAIN_READ_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FRIENDS_MAIN_READ_FAILURE,
      error: e
    });
  }
}

function* watchFriends_Read() {
  yield takeLatest(FRIENDS_MAIN_READ_REQUEST, friends_Read);
}

export default function* friendsSaga() {
  yield all([
    fork(watchFriends_Read),
    fork(watchFriends_Search),
    fork(watchFriends_Block),
    fork(watchFriends_Add_Read),
    fork(watchFriends_Add_Search),
    fork(watchFriends_Add_Add),
    fork(watchFriends_Req_Read),
    fork(watchFriends_Req_Add),
    fork(watchFriends_Pro_Read),
    fork(watchFriends_Pro_Add),
    fork(watchFriends_Block_Read),
    fork(watchFriends_Block_Update)
  ]);
}
