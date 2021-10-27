import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePhoneApi } from "../../../api/user";

export default function ChangePhoneForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePhoneApi(user.id, formData.phone, logout);
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar el N° Celular");
      } else {
        setReloadUser(true); //actualizamos el estado del menu del usuario para ver los cambios
        toast.success("N° Celular Actualizado ");
        formik.handleReset();
      }
      setLoading(false);
    },
  });

  return (
    <div className="change-phone-form">
      <h4>
        Cambiar el Numero de Celular <span>(Numero actual: {user.phone})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="phone"
            placeholder="Tu nuevo Numero"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
          <Form.Input
            name="repeatPhone"
            placeholder="Confirma tu nuevo Numero"
            onChange={formik.handleChange}
            value={formik.values.repeatPhone}
            error={formik.errors.repeatPhone}
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
    phone: "",
    repeatPhone: "",
  };
}

function validationSchema() {
  const textPhone = "Los numeros de celular deben ser iguales";
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return {
    phone: Yup.string()
      .matches(phoneRegExp, "El numero de celular no es valido")
      .required(true)
      .oneOf([Yup.ref("repeatPhone")], textPhone),
    repeatPhone: Yup.string()
      .matches(phoneRegExp, "El numero de celular no es valido")
      .required(true)
      .oneOf([Yup.ref("phone")], textPhone),
  };
}
