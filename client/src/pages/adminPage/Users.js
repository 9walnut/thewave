import React, { useEffect, useState } from "react";

import * as S from "../../styles/adminPage/Users.js";
import Card from "../../shared/adminPage/components/Card";
import axios from "axios";
import AdminButtonGrey from "../../components/adminPage/AdminButtonGrey.js";
import DataTable from "../../shared/adminPage/components/DataTable";
import PageNation from "../../shared/PageNation.js";
import PageNationFunc from "../../shared/PageNationFunc.js";

const header = [
  {
    text: "NO.",
    value: "userNumber",
  },
  {
    text: "아이디",
    value: "userId",
  },
  {
    text: "이름",
    value: "userName",
  },
  {
    text: "핸드폰 번호",
    value: "phoneNumber",
  },
  {
    text: "생년월일",
    value: "birthday",
  },
  {
    text: "성별",
    value: "gender",
  },
  {
    text: "주소",
    value: "address",
  },
];
//
const DUMMY = [
  {
    userNumber: 1,
    userId: "che",
    userName: "내이름",
    phoneNumber: "01000000000",
    birthday: "1995-08-11",
    gender: "여",
    address: "서울시 구로구 ",
  },
];

function Users() {
  const [users, setUsers] = useState([]);
  //---axios get
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      console.log("response", response.data);

      const modifiedData = response.data.map((user) => ({
        userNumber: user.userNumber,
        userId: user.userId,
        userName: user.userName,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        gender: user.gender,
        address: user.addresses.map((address) => address.address),
      }));
      setUsers(modifiedData);
      console.log("user 데이터 들어왔나", users);
    } catch (error) {
      console.log("에러", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //---PageNation
  const { currentPage, oneOfPage, currentItems, handlePageClick } =
    PageNationFunc(users);

  //---axios delete
  const [selectedUserNumbers, setSelectedUserNumbers] = useState([]);

  const onSelectionChange = (selectedUserNumber) => {
    setSelectedUserNumbers(selectedUserNumber);
    console.log("onSelectionChange 호출됨:", selectedUserNumber); // 오고있음
  };

  const deleteUsers = async () => {
    console.log("deleteUsers 함수 호출되냐");
    console.log("삭제할 UserNumber:", selectedUserNumbers.selectedUserNumber);

    if (window.confirm("정말 회원을 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete("/api/admin/users", {
          data: { userNumber: selectedUserNumbers.selectedUserNumber },
        });
        console.log("서버 응답 확인", response.data);

        if (response.data.message === "회원 삭제 성공") {
          console.log("유저 삭제 완료");
          await fetchData();
        } else {
          console.error("유저 삭제 실패");
        }
      } catch (error) {
        console.error(
          "에러",
          error.response.status,
          error.response.statusText,
          error.response.data
        );

        console.error("에러", error.response.data);
      }
    }
  };
  return (
    <>
      <Card>
        <h3>회원 관리</h3>
        <ol>
          <li>✅상세조회 없음</li>
        </ol>
        <DataTable
          keySet="usersTb_"
          headers={header}
          items={currentItems}
          onSelectionChange={onSelectionChange}
        />
        <AdminButtonGrey onClick={deleteUsers}>
          선택 회원 삭제하기
        </AdminButtonGrey>
        <PageNation
          total={users.length}
          limit={oneOfPage}
          page={currentPage}
          setPage={handlePageClick}
        />
      </Card>
    </>
  );
}

export default Users;
