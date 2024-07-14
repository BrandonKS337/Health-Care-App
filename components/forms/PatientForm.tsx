"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomerFormField from "../ui/CustomFormField";
import { Form } from "../ui/form";

export enum FormFieldType { //enums in TS allow you to define a set of named constants. Makes easier to document intent.
  INPUT = "input",
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  Select = 'select',
  SKELETON = ' skeleton'

}

const formSchema = z.object({
  username: z.string().min(2, {
    //sets validation for username so that users receive error if trying to enter anything less than 2 characters
    message: "Username must be at least 2 characters.", //this being set is the error message if .min param is not met
  }),
});

const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    //This is being passed to the CustomFormField
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-[700]">Schedule your first appointment</p>
        </section>

        <CustomerFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="JohnDoe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
