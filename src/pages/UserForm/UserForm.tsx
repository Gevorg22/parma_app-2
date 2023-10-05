import React from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../../redux/userAction";
import { RootStore, User } from "../../redux/types";
import CustomTextarea from "./CustomTextarea/CustomTextarea";
import { ReactComponent as BackIcon } from "../../icons/Back.svg";
import "./UserForm.scss";
import cn from "classnames";

export enum PersonType {
  PhysicalPerson = "Физ. лицо",
  LegalPerson = "Юр. лицо",
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Zа-яА-ЯёЁ0-9]{2,}$/, "Должны быть только буквы, цифры и минимум 2 символа")
    .required("Обязательное поле"),
  lastName: Yup.string()
    .matches(/^[a-zA-Zа-яА-ЯёЁ0-9]{2,}$/, "Должны быть только буквы, цифры и минимум 2 символа")
    .required("Обязательное поле")
    .test("name-check", "Имя и фамилия не могут совпадать", function (value) {
      const { firstName } = this.parent;
      return firstName !== value;
    }),
  email: Yup.string().email("Неверный формат email").required("Обязательное поле"),
  birthDate: Yup.date()
    .required("Обязательное поле")
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "Пользователь должен быть старше 18 лет"),
  message: Yup.string().min(10, "Сообщение должно содержать минимум 10 символов").required("Обязательное поле"),
});

const UserForm: React.FC = () => {
  const { id } = useParams();
  const formId = id ? +id : undefined;

  const navigate = useNavigate();

  const navigateBack = () => navigate("../");

  const dispatch = useDispatch();

  const editUserValues = useSelector((state: RootStore) => state?.users.find((user) => user.id === formId));

  const initialValues: User = editUserValues ?? {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    gender: "Мужской",
    birthDate: "",
    personType: "Физ. лицо",
    message: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: User, actions: FormikHelpers<User>) => {
        if (formId) {
          dispatch(editUser({ ...values, id: formId }));
        } else {
          dispatch(addUser(values));
        }
        actions.setSubmitting(false);
        navigateBack();
      }}
      validateOnChange={false}
      validateOnBlur={false}>
      {({ errors, dirty }) => (
        <Form className="user-form">
          <div className="user-form__header">
            <span onClick={() => navigateBack()}>
              <BackIcon />
            </span>
            <h3>{formId ? "Редактирование пользователя" : "Добавление пользователя"}</h3>
          </div>
          <div className="user-form__field-group">
            <label htmlFor="firstName" className="user-form__label">
              Имя:
            </label>
            <Field
              id="firstName"
              name="firstName"
              placeholder="Введите имя..."
              className={cn("user-form__input", {
                "user-form__input-error": errors.firstName,
              })}
            />
            <ErrorMessage name="firstName" component="span" className="user-form__error" />
          </div>

          <div className="user-form__field-group">
            <label htmlFor="lastName" className="user-form__label">
              Фамилия:
            </label>
            <Field
              id="lastName"
              name="lastName"
              placeholder="Введите фамилию..."
              className={cn("user-form__input", {
                "user-form__input-error": errors.lastName,
              })}
            />
            <ErrorMessage name="lastName" component="span" className="user-form__error" />
          </div>

          <div className="user-form__field-group">
            <label htmlFor="email" className="user-form__label">
              Эл.адрес почты:
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Введите эл.адрес почты..."
              className={cn("user-form__input", {
                "user-form__input-error": errors.email,
              })}
            />
            <ErrorMessage name="email" component="span" className="user-form__error" />
          </div>

          <div className="user-form__field-group">
            <label className="user-form__label">Выберите пол:</label>
            <label>
              <Field type="radio" name="gender" value="Мужской" className="user-form__radio" />
              Мужской
            </label>
            <label>
              <Field type="radio" name="gender" value="Женский" className="user-form__radio" />
              Женский
            </label>
          </div>

          <div className="user-form__field-group">
            <label htmlFor="birthDate" className="user-form__label">
              Дата рождения:
            </label>
            <Field
              id="birthDate"
              name="birthDate"
              type="date"
              className={cn("user-form__input", {
                "user-form__input-error": errors.birthDate,
              })}
            />
            <ErrorMessage name="birthDate" component="span" className="user-form__error" />
          </div>

          <div className="user-form__field-group">
            <label htmlFor="personType" className="user-form__label">
              Выберите тип:
            </label>
            <Field as="select" id="personType" name="personType" className="user-form__select">
              <option value={PersonType.PhysicalPerson}>{PersonType.PhysicalPerson}</option>
              <option value={PersonType.LegalPerson}>{PersonType.LegalPerson}</option>
            </Field>
            <ErrorMessage name="personType" component="span" className="user-form__error" />
          </div>

          <div className="user-form__field-group">
            <CustomTextarea
              label="Сообщение"
              className="user-form__textarea"
              name="message"
              placeholder="Введите сообщение..."
            />
          </div>

          <button type="submit" className="user-form__submit" disabled={!dirty}>
            {formId ? "Обновить" : "Добавить"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
