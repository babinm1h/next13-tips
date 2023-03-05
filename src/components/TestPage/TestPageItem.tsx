"use client";
import InputField from "@components/UI/InputField/InputField";
import { Button } from "@mui/material";
import { TestApi } from "@src/api/testApi";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IPostik } from "./TestPage";

interface IProps {
  slug: number;
}

const TestPageItem = ({ slug }: IProps) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => TestApi.getPost(slug),
    retry: 5,
    retryDelay: 5000,
    onSuccess(data) {
      setText(data.title);
    },
  });

  const updMutation = useMutation({
    mutationFn: TestApi.updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post", data.id] });
    },
  });

  const onUpdate = () => {
    setEdit(false);
    updMutation.mutate({ ...(data as IPostik), title: text });
  };

  // =====================================

  const optimisticUpdMutation = useMutation({
    mutationFn: TestApi.updatePost,
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ["post", updatedPost.id] });

      const prevPost = queryClient.getQueryData(["post", updatedPost.id]);
      console.log(prevPost, "prev");

      queryClient.setQueryData<IPostik>(["post", updatedPost.id], updatedPost);

      return { prevPost, updatedPost };
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["post", context?.updatedPost.id], context?.prevPost);
    },

    onSettled: (updated) => {
      queryClient.invalidateQueries({ queryKey: ["post", updated?.id] });
    },
  });

  const onUpdateOptimistic = () => {
    setEdit(false);
    optimisticUpdMutation.mutate({ ...(data as IPostik), title: text });
  };

  if (isLoading) return <div>React query load</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => setEdit(!edit)}>Edit it</Button>
      <h1>id: {slug}</h1>
      {!edit ? (
        <div className="">{data?.title}</div>
      ) : (
        <div>
          <InputField value={text} onChange={(e) => setText(e.target.value)} />
          <Button onClick={onUpdateOptimistic}>Save</Button>
        </div>
      )}
    </div>
  );
};

export default TestPageItem;
