/**
    * @description      : 
    * @author           : kudakwashe Ellijah
    * @group            : 
    * @created          : 22/07/2025 - 18:23:30
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/07/2025
    * - Author          : kudakwashe Ellijah
    * - Modification    : 
**/
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  gamerTag: z.string().min(1, 'Gamer Tag is required'),
  email: z.string().email('Invalid email address'),
  favouriteGame: z.string().min(1, 'Favourite Game Title is required'),
});

type FormData = z.infer<typeof schema>;

interface RegistrationFormProps {
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.1 } },
  exit: { y: "100vh", opacity: 0 },
};

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const fullName = watch('fullName', '');
  const gamerTag = watch('gamerTag', '');
  const email = watch('email', '');
  const favouriteGame = watch('favouriteGame', '');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg p-6 max-w-md w-full relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            aria-label="Close registration form"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4">Event Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" role="form">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                value={fullName}
                className={`mt-1 block w-full rounded-md border bg-white text-black ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="gamerTag" className="block text-sm font-medium text-gray-700">
                Gamer Tag
              </label>
              <input
                id="gamerTag"
                type="text"
                {...register('gamerTag')}
                value={gamerTag}
                className={`mt-1 block w-full rounded-md border bg-white text-black ${
                  errors.gamerTag ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.gamerTag && (
                <p className="text-red-600 text-sm mt-1">{errors.gamerTag.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                value={email}
                className={`mt-1 block w-full rounded-md border bg-white text-black ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="favouriteGame" className="block text-sm font-medium text-gray-700">
                Favourite Game Title
              </label>
              <input
                id="favouriteGame"
                type="text"
                {...register('favouriteGame')}
                value={favouriteGame}
                className={`mt-1 block w-full rounded-md border bg-white text-black ${
                  errors.favouriteGame ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              />
              {errors.favouriteGame && (
                <p className="text-red-600 text-sm mt-1">{errors.favouriteGame.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

