/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 24/07/2025 - 10:56:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.1.0
    * - Date            : 31/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : Added zod validation and error messages to RegistrationForm
**/
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type FormData = z.infer<typeof schema>;

interface RegistrationFormProps {
  onClose?: () => void;
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

const schema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  gamerTag: z.string().min(1, "Gamer Tag is required"),
  email: z.string().email("Invalid email address"),
  favouriteGame: z.string().min(1, "Favourite Game Title is required"),
});

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onSubmit, isLoading }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      gamerTag: '',
      email: '',
      favouriteGame: ''
    }
  });

  const internalSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior if no onSubmit prop provided
        console.log("Registering user:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert("Registration successful!");
        reset();
        if (onClose) {
          onClose();
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14 rounded-lg shadow-md hover:shadow-lg transition-shadow relative'>
      <button
        type="button"
        onClick={onClose || (() => window.history.back())}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 hover:bg-opacity-20 transition-colors z-10"
        aria-label="Go back to home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div className='mt-4'>
        <p className='text-blue-600 text-xl font-bold text-center hover:text-blue-700 transition-colors'>
          Event Registration
        </p>
        <p className='text-center text-sm text-gray-700 mt-2'>
          Please fill in the details below
        </p>
      </div>

      <form onSubmit={handleSubmit(internalSubmit)} className="flex flex-col gap-y-5">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400 ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("fullName")}
            disabled={isSubmitting}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Gamer Tag"
            className={`w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400 ${
              errors.gamerTag ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("gamerTag")}
            disabled={isSubmitting}
          />
          {errors.gamerTag && (
            <p className="text-red-500 text-xs mt-1">{errors.gamerTag.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("email")}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Favourite Game Title"
            className={`w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400 ${
              errors.favouriteGame ? 'border-red-500' : 'border-gray-300'
            }`}
            {...register("favouriteGame")}
            disabled={isSubmitting}
          />
          {errors.favouriteGame && (
            <p className="text-red-500 text-xs mt-1">{errors.favouriteGame.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className='w-full h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold transform hover:scale-[1.02] active:scale-[0.98]'
        >
        {isSubmitting ? "Registering..." : "Register"}
        </button>
        {isLoading && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Loading leaderboard data...
          </p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
