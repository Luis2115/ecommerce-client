import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNaneForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePhoneForm from "../components/Account/ChangePhoneForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm/ChangePasswordForm";
import Seo from "../components/Seo";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
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
      <Seo
        title={`Información Usuario: ${user.name}`}
        description="Pagina para realizar cambios en la informacion del usuario"
      />
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser} //mandamos el estado cuando haya cambios en el menu del usuario
      />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuración</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser} //lo volemos a mandar hasta el formulario donde lo requerimos
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePhoneForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
}
