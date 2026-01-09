import React from "react";

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Post Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-xl font-semibold text-white mb-1">
          Failure #1: My First Startup
        </h2>

        <p className="text-sm text-slate-400 mb-2">
          by Hardik • Startup
        </p>

        <p className="text-slate-200">
          I built my first startup with zero users and zero validation.
          Learned the hard way that ideas mean nothing without execution.
        </p>
      </div>

      {/* Post Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-xl font-semibold text-white mb-1">
          Failure #2: Bad UI Decisions
        </h2>

        <p className="text-sm text-slate-400 mb-2">
          by Anonymous • Design
        </p>

        <p className="text-slate-200">
          I ignored user feedback and focused only on what I liked.
          Result? Nobody used the product.
        </p>
      </div>

      {/* Empty State Example (optional) */}
      <p className="text-center text-gray-400">
        More creative failures coming soon.
      </p>
    </div>
  );
};

export default Home;
