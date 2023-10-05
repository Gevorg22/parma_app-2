import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../redux/types";
import { deleteUser } from "../../redux/userAction";
import { ReactComponent as EditIcon } from "../../icons/Edit.svg";
import { ReactComponent as RemoveIcon } from "../../icons/Remove.svg";
import "./UserList.scss";

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootStore) => state?.users);

  return (
    <>
      {users.length ? (
        <div className="user-list">
          {users?.map((user) => {
            const userDetails = [
              { key: 1, label: "Email:", value: user.email },
              { key: 2, label: "Пол:", value: user.gender },
              { key: 3, label: "Дата рождения:", value: user.birthDate },
              { key: 4, label: "Тип:", value: user.personType },
              { key: 5, label: "Сообщение:", value: user.message || "-" },
            ];

            return (
              <div key={user.id} className="user-list__card">
                <div>
                  <h3 className="user-list__field">
                    {user.firstName} {user.lastName}
                  </h3>
                  {userDetails.map((user) => (
                    <p key={user.key} className="user-list__field">
                      <span>{user.label}</span> {user.value}
                    </p>
                  ))}
                </div>
                <div className="user-list__buttons">
                  <Link to={`/edit/${user.id}`} className="user-list__buttons__edit" aria-label="edit-button">
                    <EditIcon data-testid="edit-icon" />
                  </Link>
                  <span
                    className="user-list__buttons__remove"
                    onClick={() => dispatch(deleteUser(user.id))}
                    data-testid="remove-button">
                    <RemoveIcon data-testid="remove-icon" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>Пользователи отсутствуют</h1>
      )}
    </>
  );
};

export default UserList;
