"use client";
import InputField from "@components/UI/InputField/InputField";
import { Button } from "@mui/material";
import { TestApi } from "@src/api/testApi";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface IPostik {
  title: string;
  body: string;
  userId: number;
  id: number;
}

const TestPage = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await TestApi.getPosts(),
  });

  // with error & retry
  const {} = useQuery({
    queryKey: ["posts", 7],
    queryFn: async () => await TestApi.getError(7),
    retry: 3,
    retryDelay: 2000,
    enabled: false,
  });

  // When this mutation succeeds, invalidate (refetch) any queries with the `posts` query key
  const createMutation = useMutation({
    mutationFn: TestApi.createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: "posts" });
    },
  });

  const onCreatePost = () => {
    createMutation.mutate({ body: "somebody", title: text, userId: 111 });
  };

  // ====================================================================== OPTIMISTIC
  const optimisticCreateMutation = useMutation({
    mutationFn: TestApi.createPost,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["posts"]);

      // Snapshot the previous value
      const prevPosts = queryClient.getQueryData(["posts"]);
      console.log(prevPosts, "prev");

      // Optimistically update to the new value
      queryClient.setQueryData<IPostik[]>(["posts"], (old = []) => {
        console.log(old, "old");
        return [...old, { ...newPost, id: Math.random() }];
      });

      // Return a context object with the snapshotted value
      return { prevPosts };
    },

    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["posts"], context?.prevPosts);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onCreatePostOptimistic = () => {
    optimisticCreateMutation.mutate({ body: "somebody", title: text, userId: 111 });
  };

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div style={{ width: "700px" }}>
      <InputField onChange={(e) => setText(e.target.value)} value={text} />
      <Button onClick={onCreatePostOptimistic}>Create</Button>

      {data?.map((d) => (
        <Link href={`/posts/${d.id}`} key={d.id}>
          <div style={{ border: "1px solid #999", padding: "20px" }}>{d.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default TestPage;
