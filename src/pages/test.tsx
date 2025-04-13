import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup
  .object({
    name: yup.string().trim().required("Please enter your name"),
    email: yup
      .string()
      .trim()
      .email("Enter a valid email")
      .required("Please enter your email"),
  })
  .required();

type TSchemaType = yup.InferType<typeof schema>;

const Test = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Test",
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (data: TSchemaType) => {
    alert(data?.name + " " + data?.email);
    console.log(data, "THIS IS DATA");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-600">
          User Info Form
        </h2>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("name")}
              placeholder="Enter name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors?.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              placeholder="Enter email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {errors?.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-amber-500 text-white font-semibold rounded-md hover:bg-amber-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;
