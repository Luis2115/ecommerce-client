import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { Formik, FormikContext, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function LoginForm(props) {
  const { showRegisterForm } = props;

  //hacemos uso del hooks de formit para validar el formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData);
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
          <Button className="submit" type="submit">
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
