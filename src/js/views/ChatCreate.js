import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { withBaseLayout } from "../layouts/Base";
import { addChat } from "../actions/chats";
import { useHistory } from "react-router-dom";

const ChatCreate = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);

  const onSubmit = (data) => {
    dispatch(addChat(data, user.uid)).then((_) => history.push("/home"));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="centered-container-form"
        >
          <div className="header">Create chat now!</div>
          <div className="subheader">Chat with people you know!</div>
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                name="description"
                className="form-control"
                id="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                {...register("image")}
                className="form-control"
                id="image"
                name="image"
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withBaseLayout(ChatCreate, { canGoBack: true });
