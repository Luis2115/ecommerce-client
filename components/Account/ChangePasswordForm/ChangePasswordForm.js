import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, FormField } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { udpdatePasswordApi } from "../../../api/user";

export default function ChangePasswordForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await udpdatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response) {
        toast.error("Error al Cambiar la contraseña");
      } else {
        toast.success("Contraseña cambiada correctamente");
        logout();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-password-form">
      <h4>Cambiar tu Contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Nueva Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Confirma tu Nueva Contraseña"
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  const textPass = "Las contraseñas no coinciden";
  return {
    password: Yup.string(true)
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], textPass),
    repeatPassword: Yup.string(true)
      .required(true)
      .oneOf([Yup.ref("password")], textPass),
  };
}
