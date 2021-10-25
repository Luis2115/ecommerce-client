import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Formik, FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi } from "../../../api/user";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  //hacemos uso del hooks de formit para validar el formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        onCloseModal();
      } else {
        toast.error("El email o la contraseña son incorrectos");
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo Electronico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrar usuario
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Ingresar
          </Button>
          <Button type="button">¿Se te olvidó tu contraseña?</Button>
        </div>
      </div>
    </Form>
  );
}

//validaciones iniciales
function initialValues() {
  return { identifier: "", password: "" };
}

//Validamos que los campos sean requeridos y su correcto tipo
function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
