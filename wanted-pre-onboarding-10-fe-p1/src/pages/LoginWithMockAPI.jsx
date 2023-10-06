import React, { useState } from "react";

/* 1일차 완성!! */

const users = [
  {
    username: "blue",
    password: "1234",
    userInfo: { name: "blueStragglr" },
  },
  {
    username: "white",
    password: "1234",
    userInfo: { name: "whiteDwarf" },
  },
];

const _sercret = "1234qwer!@#$";

const login = async (username, password) => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });

  console.log(user);

  // 여기 user는 위에 선언된 const user를 가져오는 것이다
  // 토큰 값을 암호화해서 리턴 -> getUserInfo
  return user
    ? {
        message: "SUCCESS",
        token: JSON.stringify({
          user: user.userInfo,
          secret: _sercret,
        }),
      }
    : null;
};

const getUserInfo = async (token) => {
  // TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.
  const parsedToken = JSON.parse(token);

  if (!parsedToken?.secret || parsedToken.secret !== _sercret) return null;

  const loggedUser = users.find((user) => {
    return user.userInfo.name === parsedToken.user.name;
  });

  return loggedUser ? loggedUser.userInfo : null;
};

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState({ name: "" });

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    // TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);
    // formData.get -> input의 name에 해당하는 value를 가져온다
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username, password);
    const loginRes = await login(username, password);
    if (!loginRes) return;

    const userInfo = await getUserInfo(loginRes.token);
    if (!userInfo) return;

    console.log(loginRes);
    console.log(userInfo);
    setUserInfo(userInfo);

    // for (let [key, value] of formData.entries()) console.log(key, value);
  };

  return (
    <div>
      <h1>Login with Mock API</h1>
      <form onSubmit={loginSubmitHandler}>
        {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
        <label htmlFor="input-id">
          Username:
          <input type="text" id="input-id" name="username" />
        </label>
        <label htmlFor="input-password">
          Password:
          <input type="password" id="input-password" name="password" />
        </label>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
      <div>
        <h2>User info</h2>
        {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default LoginWithMockAPI;
