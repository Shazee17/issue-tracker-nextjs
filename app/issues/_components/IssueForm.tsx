"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { IssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineInfoCircle } from "react-icons/ai";
import SimpleMDE from 'react-simplemde-editor';
import { z } from "zod";

type IssueFormData = z.infer<typeof IssueSchema>;

interface Props {
  issue?: Issue
}

const IssueForm = ({issue}: Props ) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");

  const onSubmit = handleSubmit( async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);

      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data)
      }
      else 
        await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh(); 
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");

    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")} />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} className="hover:cursor-pointer">
          {issue? 'Update Issue' : 'Submit New Issue'} {' '}
           {isSubmitting && <Spinner/>} 
          </Button>
      </form>
    </div>
  );
};

export default IssueForm;
