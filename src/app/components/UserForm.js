"use client";

import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { createUser } from "@/app/actions/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Submit button component
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-100 hover:text-blue-700 disabled:bg-slate-500"
        >
            {pending ? <FontAwesomeIcon icon={faSpinner} spinPulse /> : "Add User"}
        </button>
    );
}

export default function Userform() {
  const form = useForm();
  const {register, handlSubmit, formState} = form ;
  const {erros} = formState

   

    return (
        <div className="py-5 px-8 max-w-3xl mx-auto bg-slate-600">
            <form action={handlSubmit(createUser)} className="space-y-7">
                <div>
                    <label htmlFor="name" className="block mb-1">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="border p-2 rounded w-full"
                        autoComplete="on"
                        {...register("name", {
                            required:{value:true, message:"Name is required"}
                        })}
                    />
                    <p className="text-red-400">{erros.name?.message}</p>
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border p-2 rounded w-full"
                        autoComplete="on"
                        {...register("email", {
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email is not valid"
                            }
                        })}
                    />
                </div>

                <SubmitButton />
            </form>
        </div>
    );
}
