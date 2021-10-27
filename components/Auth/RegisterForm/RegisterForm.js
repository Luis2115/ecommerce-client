import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";

export default function RegisterForm(props) {
  const { showLoginForm } = props;

  //Creamos el estado del loading
  const [loading, setLoading] = useState(false);

  //Validando el Formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      //activamos la animacion de carga
      setLoading(true);
      //mandamos los datos a la funcion que hara la comunicacion con la api y captamos el return en response
      const response = await registerApi(formData);

      if (response?.jwt) {
        toast.success("Usuario creado correctamente");
        //mandamos al usuario al formulario de login si logro registrar sus datos
        showLoginForm(true);
      } else {
        toast.error("Error al registrar el usuario, intentelo en unos minutos");
      }
      setLoading(false);
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="phone"
        type="text"
        placeholder="Numero Celular"
        onChange={formik.handleChange}
        error={formik.errors.phone}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de Usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contreña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Iniciar Sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          Registrar
        </Button>
      </div>
    </Form>
  );
}

//Valores iniciales de la validacion
function initialValues() {
  return {
    name: "",
    lastname: "",
    phone: "",
    username: "",
    email: "",
    password: "",
  };
}

//Creando las validaciones
function validationSchema() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const user = "El Nombre de usuario es obligatorio";
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    phone: Yup.string()
      .matches(phoneRegExp, "El numero de celular no es valido")
      .required(true),
    email: Yup.string().email(true).required(true),
    username: Yup.string().required(user),
    password: Yup.string().required(true),
  };
}
