import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNaneForm";

export default function account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  const router = useRouter();

  //carga los datos, en caso el usuario inicie sesion
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;
  //verificamos si el usuario esta logueado, sino lo redirigimos al home
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration user={user} />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm user={user} />
      </div>
    </div>
  );
}
