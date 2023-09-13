import React from "react";
import Roles from "../FeatureComponents/Roles";

const RegiserForm = () => {
  const [perks, setPerks] = React.useState([]);

  return (
    <form className="flex flex-col gap-3 overflow-y-auto">
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            First Name
          </span>
        </label>
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered input-primary md:min-w-max w-full"
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Last Name
          </span>
        </label>
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered input-primary md:min-w-max w-full"
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Username
          </span>
        </label>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-primary md:min-w-max w-full"
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Password
          </span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-primary md:min-w-max w-full"
        />
      </div>
      <div>
        <label className="label">
          <span className="text-base label-text font-semibold">
            Email
          </span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered input-primary md:min-w-max w-full"
        />
      </div>
      <div>
        <Roles selected={perks} onChange={setPerks} />
      </div>
    </form>
  );
};

export default RegiserForm;
