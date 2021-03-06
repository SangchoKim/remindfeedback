export const initialState = {
  registerdFriends: [],
  addedFriends: [],
  receivedFriends: [],
  blockedFriends: [],
  searchedFriends: "",

  isLoadingFriends: false, // 친구 데이터 로드 중
  isLoadedFriends: false, // 친구 데이터 로드 성공
  LoadedFriendsErrorReason: "", // 친구 데이터 실패 사유

  isAddingFriends: false, // 친구 데이터 추가 중
  isAddedFriends: false, // 친구 데이터 추가 성공
  AddedFriendsErrorReason: "", // 친구 데이터 추가 실패 사유

  Add_Modal_isLoadingFriends: false, // 친구 추가 모달 데이터 로드 중
  Add_Modal_isLoadedFriends: false, // 친구 추가 모달 데이터 로드 성공
  Add_Modal_LoadedFriendsErrorReason: "", // 친구 추가 모달 데이터 로드 실패 사유

  Add_Modal_isSearchingFriends: false, // 친구 추가 모달 데이터 로드 중
  Add_Modal_isSearchedFriends: false, // 친구 추가 모달 데이터 로드 성공
  Add_Modal_SearchdedFriendsErrorReason: "", // 친구 추가 모달 데이터 로드 실패 사유

  RQ_Modal_isLoadingFriends: false, // 친구 요청 모달 데이터 로드 중
  RQ_Modal_isLoadedFriends: false, // 친구 요청 모달 데이터 로드 성공
  RQ_Modal_LoadedFriendsErrorReason: "", // 친구 요청 모달 데이터 로드 실패 사유

  RQ_Modal_isAddingFriends: false, // 친구 요청 모달 업데이트 로드 중
  RQ_Modal_isAddedFriends: false, // 친구 요청 모달 업데이트 로드 성공
  RQ_Modal_AddedFriendsErrorReason: "", // 친구 요청 모달 데이터 업데이트 실패 사유

  isBlockingFriends: false, // 친구 차단 중
  isBlockedFriends: false, // 친구 차단 성공
  BlockedFriendsErrorReason: "", // 친구 차단 실패 사유

  isLoadingBlockedFriends: false, // 친구 차단 목록 로드 중
  isLoadedBlockedFriends: false, // 친구 차단 목록 로드 성공
  LoadedBlockedFriendsErrorReason: "", // 친구 차단 목록 로드 실패 사유

  isUpdatingBlockedFriends: false, // 친구 차단 목록 수정 중
  isUpdatedBlockedFriends: false, // 친구 차단 목록 수정 성공
  UpdatdedBlockedFriendsErrorReason: "" // 친구 차단 목록 수정 실패 사유
};

export const FRIENDS_SEARCH_LOCAL = "FRIENDS_SEARCH_LOCAL"; // 친구 검색 로컬

export const FRIENDS_MAIN_READ_REQUEST = "FRIENDS_MAIN_READ_REQUEST"; // 친구 메인 창 READ 시도 중
export const FRIENDS_MAIN_READ_SUCCESS = "FRIENDS_MAIN_READ_SUCCESS"; // 친구 메인 창 READ 성공
export const FRIENDS_MAIN_READ_FAILURE = "FRIENDS_MAIN_READ_FAILURE"; // 친구 메인 창 READ 실패

export const FRIENDS_MAIN_SEARCH_REQUEST = "FRIENDS_MAIN_SEARCH_REQUEST"; // 친구 메인 창 SEARCH 시도 중
export const FRIENDS_MAIN_SEARCH_SUCCESS = "FRIENDS_MAIN_SEARCH_SUCCESS"; // 친구 메인 창 SEARCH 성공
export const FRIENDS_MAIN_SEARCH_FAILURE = "FRIENDS_MAIN_SEARCH_FAILURE"; // 친구 메인 창 SEARCH 실패

export const FRIENDS_BLOCK_REQUEST = "FRIENDS_BLOCK_REQUEST"; // 친구 차단 시도 중
export const FRIENDS_BLOCK_SUCCESS = "FRIENDS_BLOCK_SUCCESS"; // 친구 차단 성공
export const FRIENDS_BLOCK_FAILURE = "FRIENDS_BLOCK_FAILURE"; // 친구 차단 실패

export const FRIENDS_BLOCK_READ_REQUEST = "FRIENDS_BLOCK_READ_REQUEST"; // 친구 차단 목록 READ 시도 중
export const FRIENDS_BLOCK_READ_SUCCESS = "FRIENDS_BLOCK_READ_SUCCESS"; // 친구 차단 목록 READ 성공
export const FRIENDS_BLOCK_READ_FAILURE = "FRIENDS_BLOCK_READ_FAILURE"; // 친구 차단 목록 READ 실패

export const FRIENDS_BLOCK_UPDATE_REQUEST = "FRIENDS_BLOCK_UPDATE_REQUEST"; // 친구 차단 UPDATE 시도 중 (Unblock 요청)
export const FRIENDS_BLOCK_UPDATE_SUCCESS = "FRIENDS_BLOCK_UPDATE_SUCCESS"; // 친구 차단 UPDATE 성공
export const FRIENDS_BLOCK_UPDATE_FAILURE = "FRIENDS_BLOCK_UPDATE_FAILURE"; // 친구 차단 UPDATE 실패

export const FRIENDS_ADD_READ_REQUEST = "FRIENDS_ADD_READ_REQUEST"; // 친구 추가 모달 READ 시도 중
export const FRIENDS_ADD_READ_SUCCESS = "FRIENDS_ADD_READ_SUCCESS"; // 친구 추가 모달 READ 성공
export const FRIENDS_ADD_READ_FAILURE = "FRIENDS_ADD_READ_FAILURE"; // 친구 추가 모달 READ 실패

export const FRIENDS_ADD_SEARCH_REQUEST = "FRIENDS_ADD_SEARCH_REQUEST"; // 친구 추가 모달 SEARCH 시도 중
export const FRIENDS_ADD_SEARCH_SUCCESS = "FRIENDS_ADD_SEARCH_SUCCESS"; // 친구 추가 모달 SEARCH 성공
export const FRIENDS_ADD_SEARCH_FAILURE = "FRIENDS_ADD_SEARCH_FAILURE"; // 친구 추가 모달 SEARCH 실패

export const FRIENDS_ADD_ADD_REQUEST = "FRIENDS_ADD_ADD_REQUEST"; // 친구 추가 모달 친구 ADD 중
export const FRIENDS_ADD_ADD_SUCCESS = "FRIENDS_ADD_ADD_SUCCESS"; // 친구 추가 모달 친구 ADD 성공
export const FRIENDS_ADD_ADD_FAILURE = "FRIENDS_ADD_ADD_FAILURE"; // 친구 추가 모달 친구 ADD 실패

export const FRIENDS_RQ_READ_REQUEST = "FRIENDS_RQ_READ_REQUEST"; // 친구 요청 모달 READ 시도 중
export const FRIENDS_RQ_READ_SUCCESS = "FRIENDS_RQ_READ_SUCCESS"; // 친구 요청 모달 READ 성공
export const FRIENDS_RQ_READ_FAILURE = "FRIENDS_RQ_READ_FAILURE"; // 친구 요청 모달 READ 실패

export const FRIENDS_RQ_ADD_REQUEST = "FRIENDS_RQ_ADD_REQUEST"; // 친구 요청 모달 ADD 시도 중
export const FRIENDS_RQ_ADD_SUCCESS = "FRIENDS_RQ_ADD_SUCCESS"; // 친구 요청 모달 ADD 성공
export const FRIENDS_RQ_ADD_FAILURE = "FRIENDS_RQ_ADD_FAILURE"; // 친구 요청 모달 ADD 실패

export const FRIENDS_PROFILE_READ_REQUEST = "FRIENDS_PROFILE_READ_REQUEST"; // 친구 프로필 모달 READ 시도 중
export const FRIENDS_PROFILE_READ_SUCCESS = "FRIENDS_PROFILE_READ_SUCCESS"; // 친구 프로필 모달 READ 성공
export const FRIENDS_PROFILE_READ_FAILURE = "FRIENDS_PROFILE_READ_FAILURE"; // 친구 프로필 모달 READ 실패

export const FRIENDS_PROFILE_ADD_REQUEST = "FRIENDS_PROFILE_ADD_REQUEST"; // 친구 프로필 모달 사진 ADD 시도 중
export const FRIENDS_PROFILE_ADD_SUCCESS = "FRIENDS_PROFILE_ADD_SUCCESS"; // 친구 프로필 모달 사진 ADD 성공
export const FRIENDS_PROFILE_ADD_FAILURE = "FRIENDS_PROFILE_ADD_FAILURE"; // 친구 프로필 모달 사진 ADD 실패

export const FRIENDS_ARRANGE_DATE = "FRIENDS_ARRANGE_DATE"; // 친구 데이터 정리

export default (state = initialState, action) => {
  switch (action.type) {
    // 친구 메인 창 READ
    case FRIENDS_MAIN_READ_REQUEST:
      return {
        ...state,
        isLoadingFriends: true,
        isLoadedFriends: false
      };
    case FRIENDS_MAIN_READ_SUCCESS:
      return {
        ...state,
        isLoadingFriends: false,
        isLoadedFriends: true,
        registerdFriends: action.data.success
          ? action.data.data
          : state.registerdFriends
        // message:action.data.success?action.data.message:'',
      };
    case FRIENDS_MAIN_READ_FAILURE:
      return {
        ...state,
        isLoadingFriends: false,
        isLoadedFriends: false,
        LoadedFriendsErrorReason: action.error
      };

    // 친구 차단 목록 READ
    case FRIENDS_BLOCK_READ_REQUEST:
      return {
        ...state,
        isLoadingBlockedFriends: true,
        isLoadedBlockedFriends: false
      };
    case FRIENDS_BLOCK_READ_SUCCESS:
      return {
        ...state,
        isLoadingBlockedFriends: false,
        isLoadedBlockedFriends: true,
        blockedFriends: action.data.success
          ? action.data.data
          : state.blockedFriends
      };
    case FRIENDS_BLOCK_READ_FAILURE:
      return {
        ...state,
        isLoadingBlockedFriends: false,
        isLoadedBlockedFriends: false,
        LoadedBlockedFriendsErrorReason: ""
      };

    // 친구 차단 ADD
    case FRIENDS_BLOCK_REQUEST:
      return {
        ...state,
        isBlockingFriends: true,
        isBlockedFriends: false
      };
    case FRIENDS_BLOCK_SUCCESS:
      let blockedFriend = state.registerdFriends;
      if (action.data.success) {
        const index = state.registerdFriends.findIndex(
          (v, i) => v.user_uid === action.data.data.user_uid
        );
        blockedFriend = state.registerdFriends.filter((v, i) => i !== index);
      }
      return {
        ...state,
        isBlockingFriends: false,
        isBlockedFriends: true,
        registerdFriends: blockedFriend
      };

    case FRIENDS_BLOCK_FAILURE:
      return {
        ...state,
        isBlockingFriends: false,
        isBlockedFriends: false,
        BlockedFriendsErrorReason: action.error
      };

    // 친구 차단 목록 Update
    case FRIENDS_BLOCK_UPDATE_REQUEST:
      return {
        ...state,
        isUpdatingBlockedFriends: true,
        isUpdatedBlockedFriends: false
      };
    case FRIENDS_BLOCK_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdatingBlockedFriends: false,
        isUpdatedBlockedFriends: true,
        registerdFriends: action.data.success
          ? [...state.registerdFriends, action.data.data]
          : state.registerdFriends
      };
    case FRIENDS_BLOCK_UPDATE_FAILURE:
      return {
        ...state,
        isUpdatingBlockedFriends: false,
        isUpdatedBlockedFriends: false,
        UpdatdedBlockedFriendsErrorReason: ""
      };

    // 친구 추가 모달 READ
    case FRIENDS_ADD_READ_REQUEST:
      return {
        ...state,
        Add_Modal_isLoadingFriends: true,
        Add_Modal_isLoadedFriends: false
      };
    case FRIENDS_ADD_READ_SUCCESS:
      return {
        ...state,
        Add_Modal_isLoadingFriends: false,
        Add_Modal_isLoadedFriends: true,
        addedFriends: action.data.success
          ? action.data.data
          : state.addedFriends
      };
    case FRIENDS_ADD_READ_FAILURE:
      return {
        ...state,
        Add_Modal_isLoadingFriends: false,
        Add_Modal_isLoadedFriends: false,
        Add_Modal_LoadedFriendsErrorReason: action.error
      };

    // 친구 추가 모달 SEARCH
    case FRIENDS_ADD_SEARCH_REQUEST:
      return {
        ...state,
        Add_Modal_isSearchingFriends: true,
        Add_Modal_isSearchedFriends: false
      };
    case FRIENDS_ADD_SEARCH_SUCCESS:
      return {
        ...state,
        Add_Modal_isSearchingFriends: false,
        Add_Modal_isSearchedFriends: true,
        searchedFriends: action.data.success ? action.data.data : "",
        message: !action.data.success ? action.data.message : ""
      };
    case FRIENDS_ADD_SEARCH_FAILURE:
      return {
        ...state,
        Add_Modal_isSearchingFriends: false,
        Add_Modal_isSearchedFriends: false,
        Add_Modal_SearchdedFriendsErrorReason: action.error
      };

    //친구 추가 모달 친구 ADD
    case FRIENDS_ADD_ADD_REQUEST:
      return {
        ...state,
        isAddingFriends: true,
        isAddedFriends: false
      };
    case FRIENDS_ADD_ADD_SUCCESS:
      return {
        ...state,
        isAddingFriends: false,
        isAddedFriends: true,
        addedFriends: action.data.success
          ? [...state.addedFriends, action.data.data]
          : state.addedFriends,
        message: action.data.message
      };
    case FRIENDS_ADD_ADD_FAILURE:
      return {
        ...state,
        isAddingFriends: false,
        isAddedFriends: false,
        AddedFriendsErrorReason: action.error
      };

    // 친구 요청 모달 READ
    case FRIENDS_RQ_READ_REQUEST:
      return {
        ...state,
        RQ_Modal_isLoadingFriends: true,
        RQ_Modal_isLoadedFriends: false
      };
    case FRIENDS_RQ_READ_SUCCESS:
      return {
        ...state,
        RQ_Modal_isLoadingFriends: false,
        RQ_Modal_isLoadedFriends: true,
        receivedFriends: action.data.success
          ? action.data.data
          : state.receivedFriends
      };
    case FRIENDS_RQ_READ_FAILURE:
      return {
        ...state,
        RQ_Modal_isLoadingFriends: false,
        RQ_Modal_isLoadedFriends: false,
        RQ_Modal_LoadedFriendsErrorReason: action.error
      };

    // 친구 요청 모달 ADD
    case FRIENDS_RQ_ADD_REQUEST:
      return {
        ...state,
        RQ_Modal_isAddingFriends: true,
        RQ_Modal_isAddedFriends: false
      };
    case FRIENDS_RQ_ADD_SUCCESS:
      let updatedFriends = state.receivedFriends;
      let message = "";
      if (action.data.success) {
        const index = state.receivedFriends.findIndex(
          (v, i) => v.user_uid === action.data.data.user_uid
        );
        updatedFriends = state.receivedFriends.filter((v, i) => i !== index);
        message = action.data.message;
      }

      return {
        ...state,
        RQ_Modal_isAddingFriends: false,
        RQ_Modal_isAddedFriends: true,
        receivedFriends: updatedFriends,
        message: message
      };
    case FRIENDS_RQ_ADD_FAILURE:
      return {
        ...state,
        RQ_Modal_isAddingFriends: false,
        RQ_Modal_isAddedFriends: false,
        RQ_Modal_AddedFriendsErrorReason: action.error
      };

    // 친구 프로필 모달 READ
    case FRIENDS_PROFILE_READ_REQUEST:
      return {
        ...state
      };
    case FRIENDS_PROFILE_READ_SUCCESS:
      return {
        ...state
      };
    case FRIENDS_PROFILE_READ_FAILURE:
      return {
        ...state
      };

    // 친구 프로필 모달 ADD
    case FRIENDS_PROFILE_ADD_REQUEST:
      return {
        ...state
      };
    case FRIENDS_PROFILE_ADD_SUCCESS:
      return {
        ...state
      };
    case FRIENDS_PROFILE_ADD_FAILURE:
      return {
        ...state
      };

    case FRIENDS_SEARCH_LOCAL:
      let searchedFriend = state.registerdFriends;
      let messages = "";
      if (action.data) {
        const result = state.registerdFriends.filter(
          (v, i) => v.nickname === action.data
        );
        result.length >= 1
          ? (searchedFriend = result)
          : (messages = "존재하지 않습니다.");
      }

      return {
        ...state,
        registerdFriends: searchedFriend,
        message: messages
      };

    case FRIENDS_ARRANGE_DATE:
      return {
        ...state,
        message: "",
        registerdFriends: [],
        addedFriends: [],
        receivedFriends: [],
        searchedFriends: "",
        blockedFriends: []
      };
    default:
      return state;
  }
};
