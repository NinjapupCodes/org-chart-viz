import { useFormContext } from "react-hook-form";

const Controller = () => {
  const { register } = useFormContext();

  return (
    <div className="flex items-center gap-4">
      <input
        className="input"
        placeholder="Search for a team or member"
        {...register("highlight")}
      />
      <div>
        <input
          className="input"
          type="checkbox"
          {...register("horizontalMode")}
        />
        <label className="mx-2" htmlFor="horizontalMode">
          Horizontal layout
        </label>
      </div>
    </div>
  );
};

export default Controller;
